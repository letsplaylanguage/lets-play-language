const LANGUAGES = [
  { label: 'Arabic', flag: '🇪🇬', color: '#FF6B5B', share: 38 },
  { label: 'Spanish', flag: '🇪🇸', color: '#4ECDC4', share: 31 },
  { label: 'French', flag: '🇫🇷', color: '#6C5CE7', share: 19 },
  { label: 'Portuguese', flag: '🇧🇷', color: '#FFC93C', share: 12 },
];

const WORDS_OF_MOMENT = ['شكراً · thank you', 'Amigo · friend', 'Jouer · to play', 'Sol · sun', 'كتاب · book'];

const FEED_ACTIONS = [
  'completed a round',
  'kept a 5-day streak alive',
  'unlocked a new pack',
  'got a word right on the first try',
  'started a Spanish lesson',
  'finished an Arabic round',
];

const state = {
  active: 214,
  lessons: 1042,
  streaks: 318,
};

const els = {
  active: document.getElementById('kpi-active'),
  lessons: document.getElementById('kpi-lessons'),
  streaks: document.getElementById('kpi-streaks'),
  word: document.getElementById('kpi-word'),
  langBars: document.getElementById('lang-bars'),
  feedList: document.getElementById('feed-list'),
  lastUpdated: document.getElementById('last-updated'),
};

function renderLangBars() {
  els.langBars.innerHTML = '';
  LANGUAGES.forEach((lang) => {
    const row = document.createElement('div');
    row.className = 'lang-bar-row';
    row.innerHTML = `
      <span>${lang.flag} ${lang.label}</span>
      <div class="lang-bar-track"><div class="lang-bar-fill" style="width:${lang.share}%; background:${lang.color}"></div></div>
      <span>${lang.share}%</span>
    `;
    els.langBars.appendChild(row);
  });
}

function pushFeedItem() {
  const action = FEED_ACTIONS[Math.floor(Math.random() * FEED_ACTIONS.length)];
  const lang = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
  const li = document.createElement('li');
  li.className = 'feed-item';
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  li.innerHTML = `<span>${lang.flag} A learner ${action}</span><span class="feed-time">${time}</span>`;
  els.feedList.prepend(li);
  while (els.feedList.children.length > 12) {
    els.feedList.removeChild(els.feedList.lastChild);
  }
}

function generateTick() {
  // Staged/simulated values — swap this function for a real data fetch to go live.
  state.active = Math.max(40, state.active + Math.round((Math.random() - 0.45) * 12));
  state.lessons += Math.round(Math.random() * 6);
  state.streaks += Math.random() > 0.6 ? 1 : 0;

  LANGUAGES.forEach((lang) => {
    lang.share = Math.max(5, Math.min(50, lang.share + Math.round((Math.random() - 0.5) * 4)));
  });

  render();
  if (Math.random() > 0.35) pushFeedItem();
}

function render() {
  els.active.textContent = state.active.toLocaleString();
  els.lessons.textContent = state.lessons.toLocaleString();
  els.streaks.textContent = state.streaks.toLocaleString();
  els.word.textContent = WORDS_OF_MOMENT[Math.floor(Date.now() / 8000) % WORDS_OF_MOMENT.length];
  renderLangBars();
  els.lastUpdated.textContent = `updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
}

render();
for (let i = 0; i < 4; i++) pushFeedItem();
setInterval(generateTick, 3000);
