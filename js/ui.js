/* === UI Controller === */
const UI = {
  screens: {},
  typewriterTimer: null,
  typewriterResolve: null,
  fullText: '',

  init() {
    this.screens = {
      gate: document.getElementById('screen-gate'),
      title: document.getElementById('screen-title'),
      hub: document.getElementById('screen-hub'),
      vn: document.getElementById('screen-vn'),
      ending: document.getElementById('screen-ending'),
    };
    // Check for saved game
    if (SaveSystem.hasSave()) {
      document.getElementById('btn-continue').style.display = '';
    }
    // Enter key on gate inputs
    document.getElementById('gate-answer').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') game.verifyGate();
    });
  },

  showScreen(name) {
    Object.values(this.screens).forEach(s => s.classList.remove('active'));
    this.screens[name].classList.add('active');
  },

  // === Hub Updates ===
  updateHub(state) {
    document.getElementById('day-num').textContent = state.day;
    document.getElementById('income-display').textContent = state.monthlyIncome.toLocaleString();
    document.getElementById('stat-stamina').textContent = state.stamina;
    document.getElementById('stat-money').textContent = state.money.toLocaleString();
    document.getElementById('stat-charm').textContent = state.charm;
    document.getElementById('stat-insight').textContent = state.insight;
    document.getElementById('stat-status').textContent = state.status;

    // Rotary club lock
    const rotary = document.getElementById('action-rotary');
    if (state.insight >= 60 && state.monthlyIncome >= 80000) {
      rotary.classList.remove('locked');
    } else {
      rotary.classList.add('locked');
    }

    // Date button lock
    const dateBtn = document.getElementById('action-date');
    const hasMetAnyone = Object.values(state.metChars).some(v => v);
    if (hasMetAnyone) {
      dateBtn.classList.remove('locked');
    } else {
      dateBtn.classList.add('locked');
    }

    // Replay button in hub
    const replayHub = document.getElementById('btn-replay-hub');
    if (state.completedEndings && state.completedEndings.length > 0) {
      replayHub.style.display = '';
    } else {
      replayHub.style.display = 'none';
    }

    // Affection bars
    this.updateAffectionBar(state);
  },

  updateAffectionBar(state) {
    const bar = document.getElementById('affection-bar');
    bar.innerHTML = '';
    const chars = [
      { key: 'kaoru', name: '小薰', cls: 'kaoru' },
      { key: 'amy', name: 'Amy', cls: 'amy' },
      { key: 'yuki', name: 'Yuki', cls: 'yuki' },
      { key: 'rebecca', name: 'Rebecca', cls: 'rebecca' },
    ];
    chars.forEach(c => {
      if (!state.metChars[c.key]) return;
      const aff = state.affection[c.key];
      const unlocked = SaveSystem.isUnlocked(c.key);
      const item = document.createElement('div');
      item.className = `aff-item ${c.cls}`;
      if (unlocked) {
        item.innerHTML = `${c.name} <div class="aff-bar-inner"><div class="aff-bar-fill" style="width:${aff}%"></div></div> ${aff}`;
      } else {
        item.innerHTML = `${c.name} 🔒`;
        item.style.opacity = '0.5';
      }
      bar.appendChild(item);
    });
  },

  // === Action Result Popup ===
  showResultPopup(title, lines) {
    document.getElementById('popup-title').textContent = title;
    const body = document.getElementById('popup-body');
    body.innerHTML = '';
    lines.forEach(l => {
      const div = document.createElement('div');
      div.className = 'result-line ' + (l.type || '');
      div.textContent = l.text;
      body.appendChild(div);
    });
    document.getElementById('popup-result').style.display = '';
  },

  closePopup() {
    document.getElementById('popup-result').style.display = 'none';
  },

  // === VN (Visual Novel) Mode ===
  showCG(imagePath) {
    const cgEl = document.getElementById('vn-cg');
    // Check if image exists by trying to load
    const img = new Image();
    img.onload = () => {
      cgEl.style.backgroundImage = `url('${imagePath}')`;
      cgEl.style.backgroundColor = '#111';
      cgEl.classList.add('show');
    };
    img.onerror = () => {
      // Placeholder for missing images
      const charName = imagePath.includes('kaoru') ? 'kaoru' :
                       imagePath.includes('amy') ? 'amy' :
                       imagePath.includes('yuki') ? 'yuki' : 'rebecca';
      const gradients = {
        kaoru: 'linear-gradient(135deg, #2d1a2e, #4a1942, #2d1a2e)',
        amy: 'linear-gradient(135deg, #1a1a2e, #1a2d4a, #1a1a2e)',
        yuki: 'linear-gradient(135deg, #1e1a2e, #2d1a4a, #1e1a2e)',
        rebecca: 'linear-gradient(135deg, #2e1a1a, #4a1a1a, #2e1a1a)',
      };
      cgEl.style.backgroundImage = gradients[charName] || gradients.kaoru;
      cgEl.classList.add('show');
    };
    img.src = imagePath;
  },

  hideCG() {
    document.getElementById('vn-cg').classList.remove('show');
  },

  setDialogueName(name) {
    const el = document.getElementById('vn-name');
    el.textContent = name || '';
    if (name) {
      const char = Object.values(StoryData.characters).find(c => c.name === name);
      el.style.color = char ? char.color : '#ffb0d0';
    }
  },

  typewriteText(text) {
    return new Promise(resolve => {
      const el = document.getElementById('vn-text');
      el.textContent = '';
      this.fullText = text;
      this.typewriterResolve = resolve;
      let i = 0;
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = setInterval(() => {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
        } else {
          clearInterval(this.typewriterTimer);
          this.typewriterTimer = null;
          resolve();
        }
      }, 30);
    });
  },

  skipTypewriter() {
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
      document.getElementById('vn-text').textContent = this.fullText;
      if (this.typewriterResolve) this.typewriterResolve();
    }
  },

  showChoices(choices, state) {
    const container = document.getElementById('vn-choices');
    const hint = document.getElementById('vn-hint');
    container.innerHTML = '';
    hint.style.display = 'none';

    return new Promise(resolve => {
      choices.forEach((c, idx) => {
        const btn = document.createElement('button');
        btn.className = 'vn-choice-btn';
        let locked = false;
        if (c.require) {
          for (const [k, v] of Object.entries(c.require)) {
            if ((state[k] || 0) < v) { locked = true; break; }
          }
        }
        if (locked) {
          btn.classList.add('locked');
          const reqText = Object.entries(c.require).map(([k,v]) => {
            const names = { charm: '魅力', insight: '見識', status: '地位' };
            return `${names[k] || k}≥${v}`;
          }).join(' ');
          btn.innerHTML = `${c.text} <span class="choice-req">(需${reqText})</span>`;
        } else {
          btn.textContent = c.text;
          btn.onclick = () => {
            container.innerHTML = '';
            hint.style.display = '';
            resolve(idx);
          };
        }
        container.appendChild(btn);
      });
    });
  },

  showHint(show) {
    document.getElementById('vn-hint').style.display = show ? '' : 'none';
  },

  // === Ending ===
  showEnding(image, title, text) {
    const cgEl = document.getElementById('ending-cg');
    const img = new Image();
    img.onload = () => { cgEl.style.backgroundImage = `url('${image}')`; };
    img.onerror = () => {
      cgEl.style.backgroundImage = 'linear-gradient(135deg, #1a0a1e, #2d1040, #1a0a1e)';
    };
    img.src = image;

    document.getElementById('ending-title').textContent = title;
    document.getElementById('ending-text').textContent = text;
    this.showScreen('ending');
  },
};
