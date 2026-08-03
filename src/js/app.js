(() => {
  'use strict';

  const DESIGN_W = 375, DESIGN_H = 812;

  const screen = document.getElementById('screen');
  const img = document.getElementById('screenImage');
  const layer = document.getElementById('interactionLayer');
  const hint = document.getElementById('hint');

  function setHint(text) {
    const st = states[stateIndex];
    if (st && st.noHint) return;
    hint.textContent = text;
  }
  const dragPiece = document.getElementById('dragPiece');
  const dragPieceImg = document.getElementById('dragPieceImage');
  const ctrlLabel = document.getElementById('ctrl-label');
  const screenNumber = document.getElementById('screenNumber');
  const skipBtn = document.getElementById('ctrl-skip');
  const backBtn = document.getElementById('ctrl-back');
  const restartBtn = document.getElementById('ctrl-restart');
  const dashboardBtn = document.getElementById('ctrl-dashboard');
  const dashboardPanel = document.getElementById('dashboardPanel');
  const dashboardCloseBtn = document.getElementById('dashboardClose');
  const dashboardFrame = document.getElementById('dashboardFrame');
  const matchLine = document.getElementById('matchLine');
  const lineLayer = document.getElementById('lineLayer');

  // Standard CONTINUE button position — identical across every real exported
  // screen in this design system (confirmed by inspecting the source SVGs).
  const CONTINUE_RECT = [16, 710, 360, 766];

  // NOTE ON ASSETS: screens marked svg: true below are rendered directly from
  // the real XD-exported SVGs (assets/screens_svg/) — correct, non-mirrored
  // Arabic text, confirmed against the original design file. Screens marked
  // svg: false use the earlier placeholder PNG set (assets/screens/), which
  // is the only place we have isolated draggable block/trace-gesture art;
  // those still carry the mirrored-text issue and are flagged as a known
  // limitation in the README until real isolated assets are available.
  const FULL_TAP_RECT = [0, 0, 375, 812];
  const ONBOARD_BACK_RECT = [14, 92, 60, 145];
  const ONBOARD_CONTINUE_RECT = [16, 709, 360, 780];

  const states = [
    { id: 'login1', svg: true, type: 'signin', noHint: true },
    {
      id: 'onboard1', svg: false, type: 'onboard-choice', noHint: true,
      options: [
        { rect: [35, 272, 182, 393], label: 'Get ready for future trips' },
        { rect: [193, 272, 340, 393], label: 'Establish connections' },
        { rect: [35, 406, 182, 527], label: 'Enhance my educational journey' },
        { rect: [193, 406, 340, 527], label: 'Advance my career' },
        { rect: [35, 540, 182, 662], label: 'Other' },
      ],
    },
    {
      id: 'onboard2', svg: false, type: 'onboard-choice', noHint: true,
      options: [
        { rect: [37, 272, 339, 327], label: 'Beginner in Arabic' },
        { rect: [37, 341, 339, 394], label: 'I know a few words' },
        { rect: [37, 410, 339, 463], label: 'I can hold conversations' },
        { rect: [37, 478, 339, 530], label: 'Intermediate or higher' },
      ],
    },
    {
      id: 'onboard3', svg: false, type: 'onboard-choice', noHint: true,
      options: [
        { rect: [37, 272, 339, 327], label: '10 minutes per day' },
        { rect: [37, 341, 339, 394], label: '15 minutes per day' },
        { rect: [37, 410, 339, 463], label: '20 minutes per day' },
        { rect: [37, 478, 339, 530], label: '25 minutes per day' },
      ],
    },
    {
      id: 'onboard4', svg: false, type: 'onboard-choice', noHint: true,
      options: [
        { rect: [37, 272, 339, 327], label: 'Levantine Arabic' },
        { rect: [37, 341, 339, 394], label: 'Egyptian Arabic' },
        { rect: [37, 410, 339, 463], label: 'Gulf Arabic' },
        { rect: [37, 478, 339, 530], label: 'Modern Standard Arabic' },
      ],
    },
    { id: 'screen6_launching', svg: true, type: 'tap', rect: CONTINUE_RECT, noHint: true },
    {
      id: 'onboard5', svg: false, type: 'onboard-choice', noHint: true,
      options: [
        { rect: [36, 272, 340, 381], label: 'Confident conversations' },
        { rect: [36, 393, 340, 501], label: 'Expand vocabulary' },
        { rect: [36, 513, 340, 621], label: 'Consistent learning routine' },
      ],
    },
    {
      id: 'onboard6', svg: false, type: 'onboard-choice', noHint: true,
      options: [
        { rect: [36, 272, 340, 381], label: 'Start from scratch' },
        { rect: [36, 400, 340, 510], label: 'Find my starting place' },
      ],
    },
    {
      id: 'screen9_course_map', svg: true, type: 'scroll', scrollHeight: 1932,
      noHint: true,
      hotspots: [
        { rect: [288, 215, 344, 263], label: 'Start the Alef lesson' },
      ],
    },
    { id: 'intro', svg: true, type: 'tap', rect: CONTINUE_RECT },
    { id: 'lesson1', svg: true, type: 'tap', rect: CONTINUE_RECT },
    { id: 'instruction_build', svg: true, type: 'tap', rect: [8, 708, 367, 785] },
    { id: 'build', svg: false, type: 'build', noHint: true },
    { id: 'build_success', svg: false, type: 'tap', rect: [10, 100, 365, 700] },
    { id: 'screen13_alef', svg: true, type: 'tap', rect: CONTINUE_RECT },
    { id: 'screen14_alef_blocks', svg: true, type: 'tap', rect: CONTINUE_RECT },
    { id: 'screen15_9', svg: true, type: 'tap', rect: CONTINUE_RECT },
    { id: 'screen16_10', svg: true, type: 'tap', rect: [8, 708, 367, 785] },
    { id: 'trace', svg: false, type: 'trace', noHint: true },
    { id: 'screen19_15', svg: true, type: 'tap', rect: CONTINUE_RECT },
    {
      id: 'screen19_listen_choose', svg: true, type: 'choice', rect: CONTINUE_RECT,
      noHint: true, noShake: true,
      audio: { rect: [108, 235, 201, 329], text: 'أَلِف', lang: 'ar-SA' },
      options: [
        { rect: [34, 399, 180, 624], correct: true },   // أ — accepted
        { rect: [195, 399, 341, 624], correct: false }, // ج — rejected
      ],
    },
    {
      id: 'quiz_truefalse', svg: true, type: 'choice', rect: CONTINUE_RECT, noHint: true,
      options: [
        { rect: [30, 548, 182, 597], correct: false },   // True (wrong — ب is not Alif)
        { rect: [196, 548, 345, 597], correct: true },   // False (correct)
      ],
    },
    {
      id: 'screen21_repeat_father', svg: true, type: 'tap', rect: CONTINUE_RECT,
      noHint: true,
      audio: { rect: [200, 450, 247, 498], text: 'أَب', lang: 'ar-SA', rate: 0.72 },
      gate: { rect: [143, 535, 232, 624] },
    },
    {
      id: 'screen22_audio_choices', svg: true, type: 'choice', rect: CONTINUE_RECT,
      noHint: true, noShake: true,
      audios: [
        { rect: [59, 484, 98, 523], text: 'أَب', lang: 'ar-SA' },
        { rect: [167, 484, 206, 523], text: 'أَسَد', lang: 'ar-SA' },
        { rect: [275, 484, 314, 523], text: 'حِصَان', lang: 'ar-SA' },
      ],
      options: [
        { rect: [32, 462, 129, 582], correct: true },   // Leftmost: أب
        { rect: [140, 462, 236, 582], correct: false }, // Middle: أسد
        { rect: [248, 462, 344, 582], correct: false }, // Rightmost: حصان
      ],
    },
    {
      id: 'screen23_repeat_heard_left_correct', svg: true, type: 'choice', rect: CONTINUE_RECT,
      noHint: true, noShake: true,
      audios: [
        { rect: [108, 254, 198, 349], text: 'أَب', lang: 'ar-SA', rate: 0.74 },
        { rect: [212, 269, 266, 333], text: 'أَب', lang: 'ar-SA', rate: 0.45 },
      ],
      options: [
        { rect: [32, 413, 178, 568], correct: true },   // Left: أب
        { rect: [195, 413, 341, 568], correct: false }, // Right: أسد
      ],
    },
    {
      id: 'screen24_picture_choice_right_correct', svg: true, type: 'choice', rect: CONTINUE_RECT,
      noHint: true, noShake: true,
      audio: { rect: [156, 369, 218, 432], text: 'أَب', lang: 'ar-SA', rate: 0.72 },
      options: [
        { rect: [34, 463, 183, 620], correct: false }, // Left: lion
        { rect: [190, 463, 340, 620], correct: true }, // Right: father
      ],
    },
    { id: 'screen22_22', svg: true, type: 'tap', rect: CONTINUE_RECT },
    {
      id: 'screen26_repeat_lion', svg: true, type: 'tap', rect: CONTINUE_RECT,
      noHint: true,
      audio: { rect: [200, 450, 247, 498], text: 'أَسَد', lang: 'ar-SA', rate: 0.72 },
      gate: { rect: [143, 535, 232, 624] },
    },
    { id: 'screen27_great_job', svg: true, type: 'tap', rect: CONTINUE_RECT },
    { id: 'screen28_level_up', svg: true, type: 'tap', rect: CONTINUE_RECT },
  ];

  const buildFrames = ['build13_base'];
  const traceFrames = ['trace0', 'trace1', 'trace2', 'trace3', 'trace4', 'trace5', 'trace6', 'trace7'];

  const buildMoves = [
    {
      id: 'orange', piece: 'build13_orange',
      src: [258, 410, 30, 158], target: [172, 410, 30, 158], radius: 76,
    },
    {
      id: 'pink-lower-left', piece: 'build13_pink_left',
      src: [78, 186.5, 30, 37.5], target: [142, 360, 30, 37.5], radius: 58,
    },
    {
      id: 'pink-lower-right', piece: 'build13_pink_center',
      src: [142, 212.5, 30, 37.5], target: [171, 360, 30, 37.5], radius: 58,
    },
    {
      id: 'pink-middle-left', piece: 'build13_pink_center',
      src: [238, 186.5, 30, 37.5], target: [142, 329, 30, 37.5], radius: 58,
    },
    {
      id: 'pink-top-right', piece: 'build13_pink_right',
      src: [238, 248.5, 30, 37.5], target: [171, 297, 30, 37.5], radius: 58,
    },
  ];

  let stateIndex = 0;
  let buildStep = 0;
  let traceStep = 0;
  let drag = null;
  let traceGesture = null;

  function pngSrc(name) { return `assets/screens/${name}.png`; }
  function svgSrc(name) { return `assets/screens_svg/${name}.svg`; }

  function currentImageSrc() {
    const st = states[stateIndex];
    if (st.type === 'build') return pngSrc(buildFrames[Math.min(buildStep, buildFrames.length - 1)]);
    if (st.type === 'trace') return pngSrc(traceFrames[Math.min(traceStep, traceFrames.length - 1)]);
    return st.svg ? svgSrc(st.id) : pngSrc(st.id);
  }

  let voicesReady = false;
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener('voiceschanged', () => { voicesReady = true; });
  }

  function speak(text, lang, rate) {
    try {
      if (!('speechSynthesis' in window)) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || 'ar-SA';
      u.rate = typeof rate === 'number' ? rate : 1;
      const voices = speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('ar'));
      if (match) u.voice = match;
      // Cancelling and speaking in the same tick can silently drop the new
      // utterance in some browsers — separate them onto the next tick.
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
        setTimeout(() => speechSynthesis.speak(u), 60);
      } else {
        speechSynthesis.speak(u);
      }
    } catch (e) { /* speech not available — silently no-op */ }
  }

  function clearLayer() {
    screen.classList.remove('build13-complete');
    layer.replaceChildren();
    dragPiece.hidden = true;
    dragPiece.classList.remove('generic');
    dragPieceImg.style.display = '';
    matchLine.setAttribute('visibility', 'hidden');
    lineLayer.style.visibility = 'hidden';
    hint.textContent = '';
    drag = null;
    traceGesture = null;
  }

  function pct(designPx, axis) { return (designPx / (axis === 'x' ? DESIGN_W : DESIGN_H)) * 100; }

  function placeByDesignRect(el, x1, y1, x2, y2) {
    el.style.left = pct(x1, 'x') + '%';
    el.style.top = pct(y1, 'y') + '%';
    el.style.width = pct(x2 - x1, 'x') + '%';
    el.style.height = pct(y2 - y1, 'y') + '%';
  }

  function placeByCustomHeightRect(el, rect, designHeight) {
    const [x1, y1, x2, y2] = rect;
    el.style.left = (x1 / DESIGN_W * 100) + '%';
    el.style.top = (y1 / designHeight * 100) + '%';
    el.style.width = ((x2 - x1) / DESIGN_W * 100) + '%';
    el.style.height = ((y2 - y1) / designHeight * 100) + '%';
  }

  function hotspot(rect, onActivate, extraClass) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hotspot' + (extraClass ? ' ' + extraClass : '');
    placeByDesignRect(b, ...rect);
    b.addEventListener('click', onActivate);
    layer.appendChild(b);
    return b;
  }

  function render() {
    clearLayer();
    const st = states[stateIndex];
    if (!st) return;
    const isScrollable = st.type === 'scroll';
    screen.classList.toggle('scroll-mode', isScrollable);
    img.classList.toggle('scroll-img', isScrollable);
    layer.classList.toggle('scroll-layer', isScrollable);

    if (isScrollable) {
      layer.style.aspectRatio = `${DESIGN_W} / ${st.scrollHeight}`;
      screen.scrollTop = 0;
    } else {
      layer.style.removeProperty('aspect-ratio');
      screen.scrollTop = 0;
    }

    img.style.visibility = 'visible';
    img.src = currentImageSrc();
    ctrlLabel.textContent = `${stateIndex + 1} / ${states.length}`;
    screenNumber.textContent = String(stateIndex + 1).padStart(2, '0');

    let gateUnlocked = st.type === 'tap' && !st.gate; // plain tap screens need no unlock

    if (st.type === 'tap' || st.type === 'choice' || st.type === 'match-line') {
      const continueBtn = hotspot(st.rect, () => {
        if (!gateUnlocked) {
          setHint(st.type === 'choice'
            ? 'Choose an answer first.'
            : st.type === 'match-line'
              ? 'Drag a line from the picture to the matching word first.'
              : 'Tap the mic to record your answer first.');
          return;
        }
        advance();
      });
      if (st.gate) {
        setHint('Tap the mic, then Continue.');
        const gateBtn = hotspot(st.gate.rect, () => {}, 'audio-hotspot');
        gateBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          gateUnlocked = true;
          gateBtn.classList.add('playing');
          setHint('Got it — tap Continue.');
        });
      }
    }

    if (st.type === 'build') setupBuild();
    else if (st.type === 'scroll') setupScrollableScreen(st);
    else if (st.type === 'signin') setupSignin();
    else if (st.type === 'onboard-choice') setupOnboardingChoice(st);
    else if (st.type === 'trace') setupTrace();
    else if (st.type === 'choice') setupChoice(st, () => { gateUnlocked = true; });
    else if (st.type === 'match-line') setupMatchLine(st, () => { gateUnlocked = true; });

    if (st.audio) {
      const playAudio = (e) => {
        if (e) e.stopPropagation();
        btn.classList.add('playing');
        speak(st.audio.text, st.audio.lang, st.audio.rate);
        setTimeout(() => btn.classList.remove('playing'), 400);
      };
      const btn = hotspot(st.audio.rect, playAudio, 'audio-hotspot');
    }

    if (st.audios) {
      st.audios.forEach((audio) => {
        const btn = hotspot(audio.rect, (e) => {
          e.stopPropagation();
          btn.classList.add('playing');
          speak(audio.text, audio.lang, audio.rate);
          setTimeout(() => btn.classList.remove('playing'), 400);
        }, 'audio-hotspot');
        btn.setAttribute('aria-label', `Play ${audio.text}`);
      });
    }
  }

  function setupSignin() {
    function mkInput(type, label, placeholder, rect) {
      const input = document.createElement('input');
      input.type = type;
      input.className = 'login-text-input';
      input.placeholder = placeholder;
      input.setAttribute('aria-label', label);
      input.autocomplete = type === 'password' ? 'current-password' : 'email';
      input.spellcheck = false;
      placeByDesignRect(input, ...rect);
      input.addEventListener('input', () => input.classList.remove('invalid'));
      layer.appendChild(input);
      return input;
    }

    const email = mkInput('email', 'Email address', 'Email address', [63, 309, 347, 353]);
    const password = mkInput('password', 'Password', 'Password', [63, 373, 347, 417]);

    const remember = hotspot([27, 433, 163, 471], (event) => {
      event.stopPropagation();
      const pressed = remember.getAttribute('aria-pressed') === 'true';
      remember.setAttribute('aria-pressed', String(!pressed));
      indicator.classList.toggle('unchecked', pressed);
    }, 'login-remember');
    remember.setAttribute('aria-label', 'Remember me');
    remember.setAttribute('aria-pressed', 'true');

    const indicator = document.createElement('span');
    indicator.className = 'login-remember-indicator';
    placeByDesignRect(indicator, 27, 437, 48, 458);
    layer.appendChild(indicator);

    function selectAndAdvance(button, action, validateFields) {
      button.classList.add('selected');

      if (validateFields) {
        const emailValid = email.value.trim().length > 0;
        const passwordValid = password.value.length > 0;
        email.classList.toggle('invalid', !emailValid);
        password.classList.toggle('invalid', !passwordValid);

        if (!emailValid || !passwordValid) {
          button.classList.remove('selected');
          (emailValid ? password : email).focus();
          return;
        }
      }

      screen.dispatchEvent(new CustomEvent('screen-complete', {
        bubbles: true,
        detail: {
          action,
          email: email.value.trim(),
          remember: remember.getAttribute('aria-pressed') === 'true',
        },
      }));

      setTimeout(advance, 180);
    }

    function actionButton(rect, label, action, validateFields = false) {
      const button = hotspot(rect, (event) => {
        event.stopPropagation();
        selectAndAdvance(button, action, validateFields);
      }, 'login-action');
      button.setAttribute('aria-label', label);
      return button;
    }

    const signIn = actionButton([66, 490, 310, 541], 'Sign in', 'sign-in', true);
    actionButton([66, 546, 310, 597], 'Login with Facebook', 'facebook');
    actionButton([151, 679, 186, 714], 'Login with Twitter', 'twitter');
    actionButton([189, 679, 224, 714], 'Login with Google', 'google');
    actionButton([196, 435, 344, 470], 'Forgot your password', 'forgot-password');
    actionButton([166, 718, 283, 753], 'Sign up', 'sign-up');

    [email, password].forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          selectAndAdvance(signIn, 'sign-in', true);
        }
      });
    });
  }

  function setupScrollableScreen(st) {
    if (!Array.isArray(st.hotspots)) return;

    st.hotspots.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'hotspot scroll-hotspot';
      button.setAttribute('aria-label', item.label || 'Open lesson');
      placeByCustomHeightRect(button, item.rect, st.scrollHeight);
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        button.classList.add('selected');
        setTimeout(advance, 180);
      });
      layer.appendChild(button);
    });
  }

  function setupOnboardingChoice(st) {
    const isMulti = st.id === 'onboard5';
    const selected = new Set();
    let locked = false;

    const back = hotspot(ONBOARD_BACK_RECT, (e) => {
      e.stopPropagation();
      goBack();
    }, 'link-hotspot');
    back.setAttribute('aria-label', 'Back');

    const buttons = [];
    st.options.forEach((opt, idx) => {
      const btn = hotspot(opt.rect, (e) => {
        e.stopPropagation();
        if (locked) return;
        if (isMulti) {
          if (selected.has(idx)) {
            selected.delete(idx);
            btn.classList.remove('onboard-selected');
            btn.setAttribute('aria-pressed', 'false');
          } else {
            selected.add(idx);
            btn.classList.add('onboard-selected');
            btn.setAttribute('aria-pressed', 'true');
          }
          setHint(selected.size ? 'Select as many as you like, then tap Continue.' : 'Select one or more goals, then tap Continue.');
        } else {
          locked = true;
          btn.classList.add('onboard-selected');
          btn.setAttribute('aria-pressed', 'true');
          btn.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(0.985)' }, { transform: 'scale(1)' }],
            { duration: 220, easing: 'ease-out' }
          );
          setTimeout(advance, 320);
        }
      }, 'onboard-option');
      btn.setAttribute('aria-label', opt.label);
      btn.setAttribute('aria-pressed', 'false');
    });

    if (isMulti) {
      const cta = hotspot(ONBOARD_CONTINUE_RECT, (e) => {
        e.stopPropagation();
        if (!selected.size) {
          setHint('Choose at least one option first.');
          return;
        }
        advance();
      }, 'signin-btn');
      cta.setAttribute('aria-label', 'Continue');
      setHint('Select one or more goals, then tap Continue.');
    }
  }

  function setupChoice(st, onCorrect) {
    setHint('Choose the correct answer.');
    let currentHighlight = null;

    function showHighlight(rect, kind) {
      if (currentHighlight) currentHighlight.remove();
      const box = document.createElement('div');
      box.className = 'choice-highlight ' + kind;
      placeByDesignRect(box, ...rect);
      layer.appendChild(box);
      currentHighlight = box;
    }

    st.options.forEach((opt) => {
      const btn = hotspot(opt.rect, (e) => {
        e.stopPropagation();
        if (opt.correct) {
          onCorrect();
          showHighlight(opt.rect, 'correct');
          setHint('Correct! Tap Continue.');
        } else {
          showHighlight(opt.rect, 'wrong');
          setHint('Not quite — try the other option.');
          if (!st.noShake) {
            btn.animate(
              [{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
              { duration: 220 }
            );
          }
        }
      });
    });
  }

  function setupMatchLine(st, onCorrect) {
    let placed = false;
    const [ax, ay] = st.drag.anchor;
    const source = hotspot([ax - 40, ay - 40, ax + 40, ay + 40], () => {});
    source.style.cursor = 'grab';
    setHint('Drag from the picture to the word it matches.');

    function setLine(x2, y2) {
      lineLayer.style.visibility = 'visible';
      matchLine.setAttribute('x1', ax);
      matchLine.setAttribute('y1', ay);
      matchLine.setAttribute('x2', x2);
      matchLine.setAttribute('y2', y2);
      matchLine.setAttribute('visibility', 'visible');
    }

    source.addEventListener('pointerdown', (e) => {
      if (placed) return;
      e.preventDefault();
      source.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId };
      const p = logicalPoint(e);
      setLine(p.x, p.y);
    });
    source.addEventListener('pointermove', (e) => {
      if (!drag || drag.id !== e.pointerId || placed) return;
      const p = logicalPoint(e);
      setLine(p.x, p.y);
    });
    source.addEventListener('pointerup', (e) => {
      if (!drag || drag.id !== e.pointerId || placed) return;
      const p = logicalPoint(e);
      drag = null;
      const target = st.targets.find((t) => p.x >= t.rect[0] && p.x <= t.rect[2] && p.y >= t.rect[1] && p.y <= t.rect[3]);
      if (target && target.correct) {
        placed = true;
        matchLine.setAttribute('visibility', 'hidden'); // the real "done" screen already bakes the line in
        lineLayer.style.visibility = 'hidden';
        if (st.doneAsset) img.src = svgSrc(st.doneAsset);
        onCorrect();
        setHint('Correct! Tap Continue.');
      } else if (target) {
        matchLine.setAttribute('visibility', 'hidden');
    lineLayer.style.visibility = 'hidden';
        setHint('Not quite — try the other card.');
        source.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
          { duration: 220 }
        );
      } else {
        matchLine.setAttribute('visibility', 'hidden');
    lineLayer.style.visibility = 'hidden';
        setHint('Drag all the way onto one of the two cards.');
      }
    });
    source.addEventListener('pointercancel', () => { drag = null; matchLine.setAttribute('visibility', 'hidden'); lineLayer.style.visibility = 'hidden'; });
  }

  function advance() {
    if (stateIndex < states.length - 1) {
      stateIndex++;
      buildStep = 0;
      traceStep = 0;
      render();
    } else {
      hint.textContent = "That's the full Level 1 loop — restart to play it again.";
    }
  }

  function skip() {
    if (inSplash) { skipSplash(); return; }
    const st = states[stateIndex];
    if (st.type === 'build' && buildStep < buildMoves.length) { placeBlockForCurrentBuild(); return; }
    if (st.type === 'trace' && traceStep < traceFrames.length - 1) { traceStep++; render(); return; }
    advance();
  }

  function goBack() {
    if (inSplash) return;
    if (stateIndex > 0) {
      stateIndex--;
      buildStep = 0;
      traceStep = 0;
      render();
    }
  }

  skipBtn.addEventListener('click', skip);
  backBtn.addEventListener('click', goBack);
  restartBtn.addEventListener('click', () => {
    clearTimeout(splashTimer);
    stateIndex = 0;
    buildStep = 0;
    traceStep = 0;
    playSplash();
  });


  function setDashboardOpen(open) {
    if (!dashboardPanel || !dashboardBtn) return;

    dashboardPanel.hidden = !open;
    dashboardBtn.setAttribute('aria-expanded', String(open));
    dashboardBtn.textContent = open ? 'hide dashboard' : 'dashboard';

    if (open && dashboardFrame && !dashboardFrame.getAttribute('src')) {
      dashboardFrame.setAttribute('src', dashboardFrame.dataset.src);
    }
  }

  dashboardBtn?.addEventListener('click', () => {
    setDashboardOpen(dashboardPanel.hidden);
  });

  dashboardCloseBtn?.addEventListener('click', () => {
    setDashboardOpen(false);
    dashboardBtn?.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dashboardPanel && !dashboardPanel.hidden) {
      setDashboardOpen(false);
      dashboardBtn?.focus();
    }
  });

  function logicalPoint(evt) {
    const r = screen.getBoundingClientRect();
    return {
      x: (evt.clientX - r.left) * DESIGN_W / r.width,
      y: (evt.clientY - r.top) * DESIGN_H / r.height,
    };
  }

  let placeBlockForCurrentBuild = () => {};

  function setupBuild() {
    setHint('Drag any loose block into its matching outline.');

    const moves = buildMoves.map((move) => ({
      ...move,
      placed: false,
      placedAt: 0,
      element: null,
      currentX: move.src[0] + move.src[2] / 2,
      currentY: move.src[1] + move.src[3] / 2,
    }));

    let gesture = null;
    let completed = false;

    // Use the exact three selector boxes from the approved SVG as a vector
    // overlay. Only the selector strip is visible; the board, targets and all
    // drag-and-drop behavior remain unchanged.
    const topBoxes = document.createElement('img');
    topBoxes.className = 'build13-top-boxes';
    topBoxes.src = svgSrc('build13_top_boxes');
    topBoxes.alt = '';
    topBoxes.draggable = false;
    layer.appendChild(topBoxes);

    const dropGuide = document.createElement('div');
    dropGuide.className = 'build13-drop-guide';
    layer.appendChild(dropGuide);

    const touchHalo = document.createElement('div');
    touchHalo.className = 'build13-touch-halo';
    layer.appendChild(touchHalo);

    function centerOf(rect) {
      return { x: rect[0] + rect[2] / 2, y: rect[1] + rect[3] / 2 };
    }

    function positionRect(el, rect) {
      placeByDesignRect(el, rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3]);
    }

    function setPieceCenter(move, x, y, animate) {
      move.currentX = x;
      move.currentY = y;
      move.element.classList.toggle('snapping', Boolean(animate));
      move.element.style.left = pct(x - move.src[2] / 2, 'x') + '%';
      move.element.style.top = pct(y - move.src[3] / 2, 'y') + '%';
    }

    function showGuide(move) {
      const pad = move.id === 'orange' ? 7 : 8;
      positionRect(dropGuide, [
        move.target[0] - pad,
        move.target[1] - pad,
        move.target[2] + pad * 2,
        move.target[3] + pad * 2,
      ]);
      dropGuide.classList.add('visible');
    }

    function hideGuide() {
      dropGuide.classList.remove('visible');
    }

    function returnToSource(move) {
      const source = centerOf(move.src);
      setPieceCenter(move, source.x, source.y, true);
      setTimeout(() => {
        if (move.element && !move.placed) move.element.classList.remove('snapping');
      }, 235);
    }

    function finishIfComplete() {
      if (completed || !moves.every((move) => move.placed)) return;
      completed = true;
      buildStep = buildMoves.length;
      screen.classList.add('build13-complete');
      setHint('Awesome — you completed the letter!');
      setTimeout(advance, 360);
    }

    function snapToTarget(move) {
      if (move.placed || completed) return;
      move.placed = true;
      move.placedAt = performance.now();
      const target = centerOf(move.target);
      move.element.classList.remove('dragging');
      move.element.classList.add('snapping');
      setPieceCenter(move, target.x, target.y, true);
      setTimeout(() => {
        move.element.classList.remove('snapping');
        move.element.classList.add('placed');
        finishIfComplete();
      }, 230);
    }

    function endGesture(move) {
      gesture = null;
      move.element.classList.remove('dragging');
      touchHalo.classList.remove('visible');
      hideGuide();
    }

    function createPiece(move) {
      const piece = document.createElement('button');
      piece.type = 'button';
      piece.className = 'build13-piece';
      piece.setAttribute('aria-label', `Draggable block: ${move.id}`);
      piece.innerHTML = `<img src="assets/pieces/${move.piece}.png" draggable="false" alt="">`;
      move.element = piece;
      positionRect(piece, move.src);
      layer.appendChild(piece);

      piece.addEventListener('pointerdown', (event) => {
        if (move.placed || completed || gesture) return;
        event.preventDefault();
        piece.setPointerCapture(event.pointerId);
        const point = logicalPoint(event);
        gesture = {
          id: event.pointerId,
          move,
          offsetX: point.x - move.currentX,
          offsetY: point.y - move.currentY,
        };
        piece.classList.remove('snapping');
        piece.classList.add('dragging');
        showGuide(move);
        touchHalo.style.left = pct(point.x, 'x') + '%';
        touchHalo.style.top = pct(point.y, 'y') + '%';
        touchHalo.classList.add('visible');
      });

      piece.addEventListener('pointermove', (event) => {
        if (!gesture || gesture.id !== event.pointerId || gesture.move !== move) return;
        event.preventDefault();
        const point = logicalPoint(event);
        const halfW = move.src[2] / 2;
        const halfH = move.src[3] / 2;
        const x = Math.max(halfW, Math.min(DESIGN_W - halfW, point.x - gesture.offsetX));
        const y = Math.max(halfH, Math.min(DESIGN_H - halfH, point.y - gesture.offsetY));
        setPieceCenter(move, x, y, false);
        touchHalo.style.left = pct(point.x, 'x') + '%';
        touchHalo.style.top = pct(point.y, 'y') + '%';
      });

      piece.addEventListener('pointerup', (event) => {
        if (!gesture || gesture.id !== event.pointerId || gesture.move !== move) return;
        event.preventDefault();
        const target = centerOf(move.target);
        const distance = Math.hypot(move.currentX - target.x, move.currentY - target.y);
        endGesture(move);
        if (distance <= move.radius) snapToTarget(move);
        else returnToSource(move);
      });

      piece.addEventListener('pointercancel', (event) => {
        if (!gesture || gesture.id !== event.pointerId || gesture.move !== move) return;
        endGesture(move);
        returnToSource(move);
      });

      piece.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !move.placed && !completed) {
          event.preventDefault();
          snapToTarget(move);
        }
      });
    }

    moves.forEach(createPiece);

    // The demo Skip control places one remaining piece at a time.
    placeBlockForCurrentBuild = () => {
      const next = moves.find((move) => !move.placed);
      if (next) snapToTarget(next);
    };
  }

  function setupTrace() {
    if (traceStep >= traceFrames.length - 1) { advance(); return; }
    const zone = document.createElement('div');
    zone.className = 'trace-zone';
    placeByDesignRect(zone, 90, 200, 260, 600);
    layer.appendChild(zone);
    setHint(traceStep < 3
      ? 'Press and drag downward, following the guide.'
      : 'Press and follow the curved stroke.');

    zone.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      zone.setPointerCapture(e.pointerId);
      zone.classList.add('active');
      const p = logicalPoint(e);
      traceGesture = { id: e.pointerId, last: p, distance: 0, minX: p.x, maxX: p.x, minY: p.y, maxY: p.y };
    });

    zone.addEventListener('pointermove', (e) => {
      if (!traceGesture || traceGesture.id !== e.pointerId) return;
      const p = logicalPoint(e);
      traceGesture.distance += Math.hypot(p.x - traceGesture.last.x, p.y - traceGesture.last.y);
      traceGesture.last = p;
      traceGesture.minX = Math.min(traceGesture.minX, p.x);
      traceGesture.maxX = Math.max(traceGesture.maxX, p.x);
      traceGesture.minY = Math.min(traceGesture.minY, p.y);
      traceGesture.maxY = Math.max(traceGesture.maxY, p.y);
    });

    zone.addEventListener('pointerup', (e) => {
      if (!traceGesture || traceGesture.id !== e.pointerId) return;
      zone.classList.remove('active');
      const g = traceGesture;
      traceGesture = null;
      const vertical = (g.maxY - g.minY) > 34;
      const curved = (g.maxX - g.minX) > 20 || g.distance > 60;
      const ok = traceStep < 3 ? vertical : curved;
      if (ok) {
        traceStep++;
        if (traceStep >= traceFrames.length - 1) {
          img.src = pngSrc('trace7');
          setTimeout(advance, 750);
        } else {
          render();
        }
      } else {
        setHint('Keep the press held down while you follow the full stroke.');
      }
    });

    zone.addEventListener('pointercancel', () => { zone.classList.remove('active'); traceGesture = null; });
  }

  const splashFrames = ['splash1', 'splash2', 'splash3', 'splash4', 'splash5'];
  let inSplash = true;
  let splashTimer = null;

  function playSplash() {
    inSplash = true;
    let i = 0;
    hint.textContent = '';
    ctrlLabel.textContent = 'Loading…';
    function showFrame() {
      img.src = `assets/splash/${splashFrames[i]}.png`;
      const delay = i === 0 ? 700 : 400;
      i++;
      if (i < splashFrames.length) {
        splashTimer = setTimeout(showFrame, delay);
      } else {
        splashTimer = setTimeout(finishSplash, delay);
      }
    }
    showFrame();
  }

  function finishSplash() {
    inSplash = false;
    render();
  }

  function skipSplash() {
    clearTimeout(splashTimer);
    finishSplash();
  }

  img.addEventListener('error', () => { hint.textContent = 'This screen image failed to load — try Skip.'; });

  const requestedScreen = Number(new URLSearchParams(window.location.search).get('screen'));
  if (Number.isInteger(requestedScreen) && requestedScreen >= 1 && requestedScreen <= states.length) {
    inSplash = false;
    stateIndex = requestedScreen - 1;
    render();
  } else {
    playSplash();
  }
})();
