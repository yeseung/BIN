    const TEXT_TO_MORSE = {
      'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
      '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
      '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.','-':'-....-','_':'..--.-','"':'.-..-.',"'":'.----.','@':'.--.-.'
    };

    const MORSE_TO_TEXT = {};
    Object.keys(TEXT_TO_MORSE).forEach(k => MORSE_TO_TEXT[TEXT_TO_MORSE[k]] = k);

    const inputText = document.getElementById('inputText');
    const output = document.getElementById('output');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const copyOut = document.getElementById('copyOut');
    const playToggleBtn = document.getElementById('playToggleBtn');
    const skatsToTextBtn = document.getElementById('skatsToTextBtn');
    const symbolDashBtn = document.getElementById('symbolDashBtn');
    const symbolDotBtn = document.getElementById('symbolDotBtn');
    const moveToInputBtn = document.getElementById('moveToInputBtn');
    const resetBtn = document.getElementById('resetBtn');
    const symbolSelect = document.getElementById('symbolSelect');
    const langEnBtn = document.getElementById('langEnBtn');
    const langKoBtn = document.getElementById('langKoBtn');
    const skatsCard = document.getElementById('skatsCard');
    const skatsOutput = document.getElementById('skatsOutput');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    let currentLang = 'en'; // 'en' | 'ko'

    function updateInputPlaceholder(){
      if (!inputText) return;
      if (currentLang === 'en') {
        inputText.placeholder = '여기에 영어 텍스트나 모스부호를 입력해주세요.';
      } else {
        inputText.placeholder = '여기에 한글 텍스트나 SKATS, 모스부호를 입력해주세요.';
      }
    }

    function setLanguage(mode){
      currentLang = mode;
      if(mode === 'en'){
        langEnBtn.classList.add('active');
        langKoBtn.classList.remove('active');
        langEnBtn.setAttribute('aria-selected','true');
        langKoBtn.setAttribute('aria-selected','false');
        skatsCard.style.display = 'none';
        skatsToTextBtn.style.display = 'none';
      } else {
        langKoBtn.classList.add('active');
        langEnBtn.classList.remove('active');
        langKoBtn.setAttribute('aria-selected','true');
        langEnBtn.setAttribute('aria-selected','false');
        skatsCard.style.display = 'block';
        skatsToTextBtn.style.display = 'inline-block';
      }
      // 모드 변경 시 입력/출력/SKATS 초기화 및 재생 중지
      stopPlay();
      inputText.value = '';
      output.textContent = '';
      if (skatsOutput) skatsOutput.textContent = '';
      updateInputPlaceholder();
    }

    langEnBtn.addEventListener('click', ()=> setLanguage('en'));
    langKoBtn.addEventListener('click', ()=> setLanguage('ko'));

    function normalizeSpaces(s){
      // 3칸 이상 공백은 2칸으로 축약 (단어 경계 표준화)
      return s.replace(/\s{3,}/g, '  ');
    }

    function textToMorse(text){
      text = text.toUpperCase();
      text = normalizeSpaces(text);
      // 단어 경계: 2칸 공백(또는 기존 슬래시도 허용)
      const words = text.split(/\s{2,}|\s*\/\s*/);
      const encoded = words.map(w => {
        return Array.from(w).map(ch => {
          if(TEXT_TO_MORSE[ch]) return TEXT_TO_MORSE[ch];
          return '';
        }).filter(Boolean).join(' ');
      }).join('  '); // 단어 간 2칸 공백
      return encoded || '(결과 없음)';
    }

    function morseToText(morse){
      morse = morse.replace(/•/g, '.').replace(/—/g, '-');
      // 단어 경계: 2칸 이상 공백 또는 슬래시
      const words = morse.trim().split(/\s{2,}|\s*\/\s*/);
      const decoded = words.map(w => {
        const letters = w.trim().split(/\s+/);
        return letters.map(l => MORSE_TO_TEXT[l] || '?').join('');
      }).join(' ');
      return decoded || '(결과 없음)';
    }

    function applySymbolChoice(s){
      const val = symbolSelect.value;
      if(val === '.-') return s;
      return s.replace(/\./g, '•').replace(/-/g, '—');
    }

    function wrapMorseForHighlight(morse) {
      // 각 문자(., -, /, 공백 등)마다 span으로 감싸기 (공백은 &nbsp;로)
      return morse.split('').map((ch, idx) => {
        let displayChar = ch;
        if(ch === ' ') displayChar = '\u00A0'; // non-breaking space
        return `<span data-index="${idx}">${displayChar}</span>`;
      }).join('');
    }

    // ===== SKATS 전사 매핑 (부분 구현: 예제 문장 커버) =====
    const CHOSEONG_LIST = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    const JUNGSEONG_LIST = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
    const JONGSEONG_LIST = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    const JONG_DECOMP = {
      "ㄳ":["ㄱ","ㅅ"], "ㄵ":["ㄴ","ㅈ"], "ㄶ":["ㄴ","ㅎ"], "ㄺ":["ㄹ","ㄱ"], "ㄻ":["ㄹ","ㅁ"], "ㄼ":["ㄹ","ㅂ"], "ㄽ":["ㄹ","ㅅ"],
      "ㄾ":["ㄹ","ㅌ"], "ㄿ":["ㄹ","ㅍ"], "ㅀ":["ㄹ","ㅎ"], "ㅄ":["ㅂ","ㅅ"]
    };

    const SKATS_CONSONANT = {
      "ㄱ":"L","ㄲ":"LL","ㄴ":"F","ㄷ":"B","ㄸ":"BB","ㄹ":"V","ㅁ":"M","ㅂ":"W","ㅃ":"WW","ㅅ":"G","ㅆ":"GG","ㅇ":"K","ㅈ":"P","ㅉ":"PP","ㅊ":"C","ㅋ":"Z","ㅌ":"X","ㅍ":"J","ㅎ":"H"
    };
    // Hangul Morse code 표 기준 (자모 → ITU 라틴 문자 시퀀스)
    const SKATS_VOWEL = {
      "ㅏ":"E",
      "ㅑ":"I",
      "ㅓ":"A",
      "ㅕ":"S",
      "ㅗ":"N",
      "ㅛ":"U",
      "ㅜ":"R",
      "ㅠ":"D",
      "ㅡ":"Q",
      "ㅢ":"Y",
      "ㅣ":"T",
      "ㅐ":"TU",
      "ㅔ":"EU",
      "ㅖ":"IU"
    };
    // 복합 모음 분해(직접 매핑 없을 때 조합으로 전사)
    const VOWEL_DECOMP = {
      "ㅘ":["ㅗ","ㅏ"],
      "ㅙ":["ㅗ","ㅐ"],
      "ㅚ":["ㅗ","ㅣ"],
      "ㅝ":["ㅜ","ㅓ"],
      "ㅞ":["ㅜ","ㅔ"],
      "ㅟ":["ㅜ","ㅣ"],
      "ㅒ":["ㅑ","ㅐ"] // 드물지만 처리
    };

    function decomposeHangulSyllable(ch){
      const code = ch.charCodeAt(0);
      const SBase = 0xAC00, LCount=19, VCount=21, TCount=28, NCount=VCount*TCount, SCount=LCount*NCount;
      const SIndex = code - SBase;
      if (SIndex < 0 || SIndex >= SCount) return null;
      const LIndex = Math.floor(SIndex / NCount);
      const VIndex = Math.floor((SIndex % NCount) / TCount);
      const TIndex = SIndex % TCount;
      const L = CHOSEONG_LIST[LIndex];
      const V = JUNGSEONG_LIST[VIndex];
      const T = JONGSEONG_LIST[TIndex];
      return { L, V, T };
    }

    function jamoToSkatsForSyllable({L, V, T}){
      const parts = [];
      if (L && SKATS_CONSONANT[L]) parts.push(SKATS_CONSONANT[L]); else if (L) parts.push('?');
      if (V) {
        if (SKATS_VOWEL[V]) {
          parts.push(SKATS_VOWEL[V]);
        } else if (VOWEL_DECOMP[V]) {
          const seq = VOWEL_DECOMP[V]
            .map(v => SKATS_VOWEL[v] || '')
            .join('');
          parts.push(seq || '?');
        } else {
          parts.push('?');
        }
      }
      if (T) {
        if (JONG_DECOMP[T]) {
          JONG_DECOMP[T].forEach(c => parts.push(SKATS_CONSONANT[c] || '?'));
        } else {
          parts.push(SKATS_CONSONANT[T] || '?');
        }
      }
      return parts.join('');
    }

    function hangulToSkats(text){
      const parts = [];
      for (const ch of text) {
        if (/\s/.test(ch)) {
          parts.push(""); // 단어 경계용 빈 토큰 → join 시 두 칸 공백 유도
          continue;
        }
        const syl = decomposeHangulSyllable(ch);
        if (syl) {
          parts.push(jamoToSkatsForSyllable(syl));
          continue;
        }
        // 음절이 아닌 개별 자모(호환 자모) 직접 매핑
        if (SKATS_CONSONANT[ch]) {
          parts.push(SKATS_CONSONANT[ch]);
          continue;
        }
        if (SKATS_VOWEL[ch]) {
          parts.push(SKATS_VOWEL[ch]);
          continue;
        }
        // 기타 문자는 일단 무시하지 않고 '?'로 표기
        parts.push('?');
      }
      // 음절 간은 공백 1칸, 단어 경계는 공백 2칸이 되도록
      // 빈 토큰("")이 섞여 있으면 join(' ') 결과로 이중 공백이 생김
      return parts.join(' ').trim();
    }

    // 역전사: SKATS → 한글 자모(분해형 문자열)
    const SKATS_TO_JAMO_TRIPLE = { "ITU":"ㅒ" };
    const SKATS_TO_JAMO_DOUBLE = {
      "GG":"ㅆ","LL":"ㄲ","BB":"ㄸ","WW":"ㅃ","PP":"ㅉ",
      "TU":"ㅐ","EU":"ㅔ","IU":"ㅖ",
      "NE":"ㅘ","NTU":"ㅙ","NT":"ㅚ",
      "RA":"ㅝ","REU":"ㅞ","RT":"ㅟ"
    };
    const SKATS_TO_JAMO_SINGLE = {
      "L":"ㄱ","F":"ㄴ","B":"ㄷ","V":"ㄹ","M":"ㅁ","W":"ㅂ","G":"ㅅ","K":"ㅇ","P":"ㅈ","C":"ㅊ","Z":"ㅋ","X":"ㅌ","J":"ㅍ","H":"ㅎ",
      "E":"ㅏ","I":"ㅑ","A":"ㅓ","S":"ㅕ","N":"ㅗ","U":"ㅛ","R":"ㅜ","D":"ㅠ","Q":"ㅡ","Y":"ㅢ","T":"ㅣ"
    };

    function skatsToHangulJamo(skats){
      const src = (skats || '').toUpperCase();
      let i = 0;
      const out = [];
      while (i < src.length) {
        const ch = src[i];
        if (ch === ' ') { out.push(' '); i++; continue; }
        const three = src.slice(i, i+3);
        if (SKATS_TO_JAMO_TRIPLE[three]) {
          out.push(SKATS_TO_JAMO_TRIPLE[three]);
          i += 3;
          continue;
        }
        const two = src.slice(i, i+2);
        if (SKATS_TO_JAMO_DOUBLE[two]) {
          out.push(SKATS_TO_JAMO_DOUBLE[two]);
          i += 2;
          continue;
        }
        if (SKATS_TO_JAMO_SINGLE[ch]) {
          out.push(SKATS_TO_JAMO_SINGLE[ch]);
          i += 1;
          continue;
        }
        // 알 수 없는 문자는 그대로
        out.push(ch);
        i += 1;
      }
      return out.join('');
    }
    function updateSymbolButtonsLabel(){
      if (!symbolDashBtn || !symbolDotBtn) return;
      if (symbolSelect.value === '.-') {
        symbolDashBtn.textContent = '-';
        symbolDotBtn.textContent = '.';
      } else {
        symbolDashBtn.textContent = '—';
        symbolDotBtn.textContent = '•';
      }
    }

    function insertAtCursor(textarea, text) {
      if (!textarea) return;
      textarea.focus();
      const start = textarea.selectionStart ?? textarea.value.length;
      const end = textarea.selectionEnd ?? textarea.value.length;
      const before = textarea.value.substring(0, start);
      const after = textarea.value.substring(end);
      textarea.value = before + text + after;
      const cursor = start + text.length;
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(cursor, cursor);
      }
    }

    encodeBtn.addEventListener('click', ()=>{
      if (currentLang === 'en') {
        const res = textToMorse(inputText.value || '');
        output.innerHTML = wrapMorseForHighlight(applySymbolChoice(res));
        return;
      }
      // ko: 한글 → SKATS → 모스
      const sk = hangulToSkats(inputText.value || '');
      skatsOutput.textContent = sk;
      const morse = textToMorse(sk);
      output.innerHTML = wrapMorseForHighlight(applySymbolChoice(morse));
    });

    decodeBtn.addEventListener('click', ()=>{
      if (currentLang === 'en') {
        const res = morseToText(inputText.value || '');
        output.textContent = res;
        return;
      }
      // ko: 모스 → SKATS → 한글 자모
      const sk = morseToText(inputText.value || '');
      skatsOutput.textContent = sk;
      const hangulJamo = skatsToHangulJamo(sk);
      output.textContent = hangulJamo;
    });

    skatsToTextBtn.addEventListener('click', ()=>{
      // 입력의 SKATS를 그대로 표시 후 한글 자모로 변환
      const raw = (inputText.value || '').toUpperCase();
      skatsOutput.textContent = raw;
      const hangulJamo = skatsToHangulJamo(raw);
      output.textContent = hangulJamo;
    });

    copyOut.addEventListener('click', ()=>{
      const textToCopy = (output.textContent || '').replace(/\u00A0/g, ' ');
      navigator.clipboard.writeText(textToCopy).then(()=>{
        copyOut.textContent = '복사됨 ✓';
        setTimeout(()=>copyOut.textContent = '출력 복사',1000);
      }).catch(()=>{
        alert('복사 실패 — 브라우저가 클립보드 API를 지원하지 않을 수 있습니다.');
      });
    });

    let audioCtx;
    let osc;
    let gainNode;
    let playTimeouts = [];
    let currentHighlight = -1;
    let isPlaying = false;

    function clearHighlight() {
      const spans = output.querySelectorAll('span.highlight');
      spans.forEach(s => s.classList.remove('highlight'));
    }

    function stopPlay() {
      if (osc) {
        osc.stop();
        osc.disconnect();
        osc = null;
      }
      if (gainNode) {
        gainNode.disconnect();
        gainNode = null;
      }
      if (audioCtx) {
        audioCtx.close();
        audioCtx = null;
      }
      playTimeouts.forEach(t => clearTimeout(t));
      playTimeouts = [];
      clearHighlight();
      currentHighlight = -1;
      isPlaying = false;
      if (playToggleBtn) {
        playToggleBtn.textContent = '모스부호 재생 ▶';
      }
    }

    function playMorseWithHighlight(morseString) {
      if(!window.AudioContext && !window.webkitAudioContext){
        alert('오디오 재생을 지원하지 않는 브라우저입니다.');
        return;
      }
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      osc = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 600;
      gainNode.gain.value = 0;
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();

      const normalized = morseString.replace(/•/g,'.').replace(/—/g,'-').replace(/\u00A0/g, ' ');
      const spans = output.querySelectorAll('span');
      let time = audioCtx.currentTime;
      // WPM을 unit time으로 변환 (20 WPM = 0.12초/unit 기준)
      const wpm = parseInt(speedSlider.value) || 20;
      const unit = 2.4 / wpm; // 20 WPM = 0.12초, 10 WPM = 0.24초, 30 WPM = 0.08초

      let idx = 0; // 현재 재생 중인 문자 인덱스

      function scheduleSound(ch, startTime, index, source) {
        if(ch === '.') {
          gainNode.gain.setValueAtTime(0.4, startTime);
          gainNode.gain.setValueAtTime(0, startTime + unit);
          return unit * 2; // tone + pause
        } else if(ch === '-') {
          gainNode.gain.setValueAtTime(0.4, startTime);
          gainNode.gain.setValueAtTime(0, startTime + unit * 3);
          return unit * 4;
        } else if(ch === ' ') {
          // 단어 간 2칸 공백 처리: 첫 번째 공백에서만 긴 휴지 적용, 이후 공백은 0
          if (source[index-1] === ' ') return 0;
          if (source[index+1] === ' ') return unit * 6; // word gap
          return unit * 2; // letter gap
        } else if(ch === '/') {
          return unit * 6;
        } else {
          return 0;
        }
      }

      function highlightChar(index) {
        clearHighlight();
        if (index >= 0 && index < spans.length) {
          spans[index].classList.add('highlight');
        }
        currentHighlight = index;
      }

      let accumulatedDelay = 0;

      for(let i=0; i<normalized.length; i++) {
        const ch = normalized[i];
        // 재생과 하이라이트 스케줄링
        playTimeouts.push(setTimeout(() => {
          highlightChar(i);
          // 재생음 조절은 oscillator 스케줄에 맡김
        }, accumulatedDelay * 1000));

        const duration = scheduleSound(ch, time + accumulatedDelay, i, normalized);
        accumulatedDelay += duration;
      }

      // 정지 타이밍 (oscillator stop) + 하이라이트 해제
      playTimeouts.push(setTimeout(() => {
        stopPlay();
      }, accumulatedDelay * 1000 + 100));
    }

    playToggleBtn.addEventListener('click', ()=>{
      if (isPlaying) {
        stopPlay();
        return;
      }
      const text = output.textContent || inputText.value || '';
      const isMorse = /[.\-•—\/]/.test(text);
      const morseToPlay = isMorse ? text : applySymbolChoice(textToMorse(text));
      if(!output.querySelector('span')) {
        output.innerHTML = wrapMorseForHighlight(morseToPlay);
      }
      isPlaying = true;
      playToggleBtn.textContent = '재생 중지 ■';
      playMorseWithHighlight(morseToPlay);
    });

    resetBtn.addEventListener('click', () => {
      stopPlay();
      inputText.value = '';
      output.textContent = '';
      if (typeof skatsOutput !== 'undefined' && skatsOutput) {
        skatsOutput.textContent = '';
      }
      // 재생 속도 초기화 (기본값 20 WPM)
      if (speedSlider) {
        speedSlider.value = 20;
        if (speedValue) {
          speedValue.textContent = '20 WPM';
        }
      }
    });

    moveToInputBtn.addEventListener('click', () => {
      stopPlay();
      const moved = (output.textContent || '').replace(/\u00A0/g, ' ').trim();
      inputText.value = moved;
      output.textContent = '';
      if (typeof skatsOutput !== 'undefined' && skatsOutput) {
        skatsOutput.textContent = '';
      }
    });

    symbolDashBtn.addEventListener('click', () => {
      const ch = symbolSelect.value === '.-' ? '-' : '—';
      insertAtCursor(inputText, ch);
    });

    symbolDotBtn.addEventListener('click', () => {
      const ch = symbolSelect.value === '.-' ? '.' : '•';
      insertAtCursor(inputText, ch);
    });

    symbolSelect.addEventListener('change', updateSymbolButtonsLabel);

    // 속도 슬라이더 이벤트
    speedSlider.addEventListener('input', (e) => {
      const wpm = parseInt(e.target.value);
      speedValue.textContent = `${wpm} WPM`;
    });

    inputText.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && e.ctrlKey && !e.shiftKey){
        e.preventDefault(); encodeBtn.click();
      } else if(e.key === 'Enter' && e.ctrlKey && e.shiftKey){
        e.preventDefault(); decodeBtn.click();
      }
    });

    updateSymbolButtonsLabel();
    setLanguage('en');