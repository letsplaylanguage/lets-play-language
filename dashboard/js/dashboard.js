const LANGUAGE_DETAILS = {
  ar: { label: 'Arabic', flag: '🇪🇬', color: '#FF6B5B' },
  es: { label: 'Spanish', flag: '🇪🇸', color: '#4ECDC4' },
  fr: { label: 'French', flag: '🇫🇷', color: '#6C5CE7' },
  pt: { label: 'Portuguese', flag: '🇧🇷', color: '#FFC93C' },
};

const EVENT_LABELS = {
  session_started: 'started a learning session',
  screen_viewed: 'opened a learning screen',
  screen_completed: 'completed a screen',
  answer_selected: 'selected an answer',
  lesson_completed: 'completed Level 1',
};

const els = {
  active: document.getElementById('kpi-active'),
  lessons: document.getElementById('kpi-lessons'),
  events: document.getElementById('kpi-streaks'),
  latest: document.getElementById('kpi-word'),
  langBars: document.getElementById('lang-bars'),
  feedList: document.getElementById('feed-list'),
  lastUpdated: document.getElementById('last-updated'),
  connectionStatus: document.getElementById('connection-status'),
  pulseDot: document.getElementById('pulse-dot'),
};

let events = [];
let realtimeChannel = null;

function startOfTodayIso() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start.toISOString();
}

function languageInfo(code) {
  return LANGUAGE_DETAILS[code] || {
    label: String(code || 'Unknown').toUpperCase(),
    flag: '🌐',
    color: '#4ECDC4',
  };
}

function setConnection(status, message) {
  els.connectionStatus.textContent = message;
  els.connectionStatus.dataset.status = status;
  els.pulseDot.dataset.status = status;
}

function formatTime(value) {
  const date = new Date(value);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function renderLanguageBars() {
  const counts = new Map();

  events.forEach((event) => {
    counts.set(event.language, (counts.get(event.language) || 0) + 1);
  });

  const total = Math.max(1, events.length);
  const rows = Array.from(counts.entries())
    .map(([code, count]) => ({
      code,
      count,
      share: Math.round((count / total) * 100),
      ...languageInfo(code),
    }))
    .sort((a, b) => b.count - a.count);

  els.langBars.replaceChildren();

  if (!rows.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No persisted events yet. Open the prototype to create one.';
    els.langBars.appendChild(empty);
    return;
  }

  rows.forEach((lang) => {
    const row = document.createElement('div');
    row.className = 'lang-bar-row';
    row.innerHTML = `
      <span>${lang.flag} ${lang.label}</span>
      <div class="lang-bar-track">
        <div class="lang-bar-fill" style="width:${lang.share}%; background:${lang.color}"></div>
      </div>
      <span>${lang.share}%</span>
    `;
    els.langBars.appendChild(row);
  });
}

function feedText(event) {
  const action = EVENT_LABELS[event.event_type] || event.event_type;
  const screen = Number.isInteger(event.screen_number)
    ? ` · screen ${event.screen_number}`
    : '';
  const info = languageInfo(event.language);
  return `${info.flag} A learner ${action}${screen}`;
}

function renderFeed() {
  els.feedList.replaceChildren();

  if (!events.length) {
    const li = document.createElement('li');
    li.className = 'feed-item empty-feed';
    li.textContent = 'Waiting for the first real app event…';
    els.feedList.appendChild(li);
    return;
  }

  events.slice(0, 20).forEach((event) => {
    const li = document.createElement('li');
    li.className = 'feed-item';
    li.innerHTML = `
      <span>${feedText(event)}</span>
      <span class="feed-time">${formatTime(event.created_at)}</span>
    `;
    els.feedList.appendChild(li);
  });
}

function render() {
  const now = Date.now();
  const activeCutoff = now - 15 * 60 * 1000;

  const activeSessions = new Set(
    events
      .filter((event) => new Date(event.created_at).getTime() >= activeCutoff)
      .map((event) => event.anonymous_session_id)
  );

  const completedScreens = events.filter(
    (event) => event.event_type === 'screen_completed'
  ).length;

  const latest = events[0];

  els.active.textContent = activeSessions.size.toLocaleString();
  els.lessons.textContent = completedScreens.toLocaleString();
  els.events.textContent = events.length.toLocaleString();
  els.latest.textContent = latest
    ? (EVENT_LABELS[latest.event_type] || latest.event_type)
    : 'Waiting for data';

  renderLanguageBars();
  renderFeed();

  els.lastUpdated.textContent = latest
    ? `last real event ${formatTime(latest.created_at)}`
    : 'no persisted events yet';
}

function mergeEvent(event) {
  if (!event || event.id == null) return;
  const existingIndex = events.findIndex((item) => item.id === event.id);

  if (existingIndex >= 0) {
    events[existingIndex] = event;
  } else {
    events.unshift(event);
  }

  events.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  events = events.slice(0, 1000);
  render();
}

async function loadEvents(client) {
  const { data, error } = await client
    .from('learning_events')
    .select('id, created_at, anonymous_session_id, event_type, screen_number, language, metadata')
    .gte('created_at', startOfTodayIso())
    .order('created_at', { ascending: false })
    .limit(1000);

  if (error) throw error;

  events = Array.isArray(data) ? data : [];
  render();
}

function subscribe(client) {
  realtimeChannel = client
    .channel('lets-play-public-dashboard')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'learning_events',
      },
      (payload) => mergeEvent(payload.new)
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        setConnection('connected', 'Live · connected');
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        setConnection('error', 'Live · reconnecting');
      } else if (status === 'CLOSED') {
        setConnection('error', 'Live · disconnected');
      } else {
        setConnection('connecting', 'Live · connecting');
      }
    });
}

async function start() {
  const config = window.LETS_PLAY_SUPABASE;

  if (!config || !window.supabase || typeof window.supabase.createClient !== 'function') {
    setConnection('error', 'Configuration missing');
    els.lastUpdated.textContent = 'Supabase client could not start';
    return;
  }

  const client = window.supabase.createClient(config.url, config.publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  setConnection('connecting', 'Live · connecting');

  try {
    await loadEvents(client);
    subscribe(client);
  } catch (error) {
    console.error(error);
    setConnection('error', 'Live · query failed');
    els.lastUpdated.textContent = error.message || 'Could not load events';
  }

  window.setInterval(() => {
    loadEvents(client).catch((error) => {
      console.warn('Dashboard refresh failed:', error);
    });
  }, 30000);
}

render();
start();
