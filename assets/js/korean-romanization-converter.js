// 한글 자모 분해 상수
const CHOSEONG_LIST = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JUNGSEONG_LIST = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const JONGSEONG_LIST = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JONG_DECOMP = {
    "ㄳ":["ㄱ","ㅅ"], "ㄵ":["ㄴ","ㅈ"], "ㄶ":["ㄴ","ㅎ"], "ㄺ":["ㄹ","ㄱ"], "ㄻ":["ㄹ","ㅁ"],
    "ㄼ":["ㄹ","ㅂ"], "ㄽ":["ㄹ","ㅅ"], "ㄾ":["ㄹ","ㅌ"], "ㄿ":["ㄹ","ㅍ"], "ㅀ":["ㄹ","ㅎ"], "ㅄ":["ㅂ","ㅅ"]
};

// 행정안전부 주소기반산업지원서비스 - 영문 주소 API 설정
const MOIS_ADDR_ENG_API_URL = 'https://business.juso.go.kr/addrlink/addrEngApi.do';
// 참고: 실제 배포 시에는 승인키를 프론트 코드에 직접 노출하기보다는 서버 프록시를 두는 것이 안전합니다.
const MOIS_ADDR_ENG_API_KEY = 'U01TX0FVVEgyMDI1MTIxMDEwMDUzOTExNjU1MTY=';

// 학술 연구용(제8항) 자모 로마자 매핑: ㄱ, ㄷ, ㅂ, ㄹ은 항상 g, d, b, l
const ACADEMIC_CONSONANT_ROMAN = {
    "ㄱ":"g", "ㄲ":"kk", "ㄴ":"n", "ㄷ":"d", "ㄸ":"tt", "ㄹ":"l", "ㅁ":"m", "ㅂ":"b",
    "ㅃ":"pp", "ㅅ":"s", "ㅆ":"ss", "ㅇ":"ng", "ㅈ":"j", "ㅉ":"jj", "ㅊ":"ch", "ㅋ":"k",
    "ㅌ":"t", "ㅍ":"p", "ㅎ":"h"
};

// 성씨 추천 로마자 표기 (외교부 여권안내 기준에 근접한 형태, 대표적인 성 위주)
const SURNAME_ROMAN_MAP = {
    "김": "Kim",
    "이": "Lee",
    "박": "Park",
    "최": "Choi",
    "정": "Jeong",
    "강": "Kang",
    "조": "Jo",
    "윤": "Yun",
    "장": "Jang",
    "임": "Lim",
    "심": "Sim",
    "안": "An",
    "오": "Oh",
    "한": "Han",
    "서": "Seo",
    "신": "Shin",
    "권": "Kwon",
    "황": "Hwang",
    "송": "Song",
    "전": "Jeon",
    "홍": "Hong",
    "유": "Yu",
    "류": "Ryu",
    "강": "Kang",
    "배": "Bae"
};

// 모음 로마자 매핑 (현행 표기법)
const VOWEL_ROMAN = {
    "ㅏ":"a", "ㅐ":"ae", "ㅑ":"ya", "ㅒ":"yae", "ㅓ":"eo", "ㅔ":"e", "ㅕ":"yeo", "ㅖ":"ye",
    "ㅗ":"o", "ㅘ":"wa", "ㅙ":"wae", "ㅚ":"oe", "ㅛ":"yo", "ㅜ":"u", "ㅝ":"wo", "ㅞ":"we",
    "ㅟ":"wi", "ㅠ":"yu", "ㅡ":"eu", "ㅢ":"ui", "ㅣ":"i"
};

// 자음 로마자 매핑 (기본형 - 현행 표기법)
const CONSONANT_ROMAN = {
    "ㄱ":"g", "ㄲ":"kk", "ㄴ":"n", "ㄷ":"d", "ㄸ":"tt", "ㄹ":"r", "ㅁ":"m", "ㅂ":"b",
    "ㅃ":"pp", "ㅅ":"s", "ㅆ":"ss", "ㅇ":"ng", "ㅈ":"j", "ㅉ":"jj", "ㅊ":"ch", "ㅋ":"k",
    "ㅌ":"t", "ㅍ":"p", "ㅎ":"h"
};

// 자음 종성 매핑 (어말/자음 앞)
const CONSONANT_FINAL = {
    "ㄱ":"k", "ㄲ":"k", "ㄴ":"n", "ㄷ":"t", "ㄸ":"t", "ㄹ":"l", "ㅁ":"m", "ㅂ":"p",
    "ㅃ":"p", "ㅅ":"t", "ㅆ":"t", "ㅇ":"ng", "ㅈ":"t", "ㅉ":"t", "ㅊ":"t", "ㅋ":"k",
    "ㅌ":"t", "ㅍ":"p", "ㅎ":"t"
};

// 한글 음절 분해
function decomposeHangulSyllable(ch) {
    const code = ch.charCodeAt(0);
    const SBase = 0xAC00;
    const LCount = 19;
    const VCount = 21;
    const TCount = 28;
    const NCount = VCount * TCount;
    const SCount = LCount * NCount;
    const SIndex = code - SBase;

    if (SIndex < 0 || SIndex >= SCount) return null;

    const LIndex = Math.floor(SIndex / NCount);
    const VIndex = Math.floor((SIndex % NCount) / TCount);
    const TIndex = SIndex % TCount;

    return {
        L: CHOSEONG_LIST[LIndex],
        V: JUNGSEONG_LIST[VIndex],
        T: JONGSEONG_LIST[TIndex]
    };
}

// 다음 문자가 모음인지 확인
function isVowelNext(text, idx) {
    if (idx >= text.length) return false;
    const next = text[idx];
    const syl = decomposeHangulSyllable(next);
    if (syl && syl.V) return true;
    // 호환 자모 모음 체크
    return /[ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ]/.test(next);
}

// 다음 문자가 자음인지 확인
function isConsonantNext(text, idx) {
    if (idx >= text.length) return false;
    const next = text[idx];
    const syl = decomposeHangulSyllable(next);
    if (syl && syl.L) return true;
    // 호환 자모 자음 체크
    return /[ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ]/.test(next);
}

// 자음 로마자 변환 (위치에 따라) - 현행 표기법
function consonantToRoman(consonant, isInitial, isFinal, nextIsVowel, prevConsonant = null) {
    if (!consonant) return '';

    // 초성 ㅇ: 음가 없음
    if (consonant === 'ㅇ' && isInitial) {
        return '';
    }

    // ㄹㄹ → ll 처리 (초성 ㄹ이어도 앞이 ㄹ이면 l)
    if (consonant === 'ㄹ' && prevConsonant === 'ㄹ') {
        return 'l';
    }

    // 종성 분해 처리
    if (JONG_DECOMP[consonant]) {
        const decomposed = JONG_DECOMP[consonant];
        let result = '';
        decomposed.forEach((c, idx) => {
            const isLast = idx === decomposed.length - 1;
            const nextVowel = isLast ? nextIsVowel : false;
            const isFinalPos = isLast ? isFinal : true;
            result += consonantToRoman(c, false, isFinalPos, nextVowel);
        });
        return result;
    }

    // ㄱ, ㄷ, ㅂ: 모음 앞에서는 g, d, b / 자음 앞이나 어말에서는 k, t, p
    if (consonant === 'ㄱ') {
        if (isInitial && nextIsVowel) return 'g';
        return 'k';
    }
    if (consonant === 'ㄷ') {
        if (isInitial && nextIsVowel) return 'd';
        return 't';
    }
    if (consonant === 'ㅂ') {
        if (isInitial && nextIsVowel) return 'b';
        return 'p';
    }

    // ㄹ: 모음 앞에서는 r / 자음 앞이나 어말에서는 l
    if (consonant === 'ㄹ') {
        if (isInitial && nextIsVowel) return 'r';
        return 'l';
    }

    // 기본 매핑
    if (isFinal) {
        return CONSONANT_FINAL[consonant] || CONSONANT_ROMAN[consonant] || '';
    }
    return CONSONANT_ROMAN[consonant] || '';
}

// 한글 → 로마자 변환 (현행 표기법)
function hangulToRoman(text, options = {}) {
    const { properNoun = false, useHyphen = false } = options;
    return hangulToRomanInternal(text, options);
}

function capitalizeWord(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// 음운 변화 적용 (표준 발음법에 따라)
// forRomanization: true이면 로마자 표기를 위한 변환(된소리되기, 일부 ㅎ 관련 규칙 제외)을,
// false이면 표준 발음법에 가까운 한글 발음 표기(phoneticOutput 용)를 생성
function applyPhonologicalChanges(text, forRomanization = false) {
    const SBase = 0xAC00;
    const LCount = 19;
    const VCount = 21;
    const TCount = 28;
    const NCount = VCount * TCount;

    // 복수 허용 발음이 있는 단어들(표준 발음법 다만 규정) - phoneticOutput에서만 모두 보여 준다.
    const multiPronMap = {
        // 제29항 다만: ㄴ 첨가 관련
        "이죽이죽": ["이중니죽", "이주기죽"],
        "야금야금": ["야금냐금", "야그먀금"],
        "검열": ["검녈", "거멸"],
        "욜랑욜랑": ["욜랑뇰랑", "욜랑욜랑"],
        "금융": ["금늉", "그뮹"]
    };

    // phoneticOutput 전용: 입력이 복수 허용 발음을 가진 단어 하나일 때, 모든 발음을 그대로 반환
    if (!forRomanization) {
        const trimmed = text.trim();
        if (multiPronMap[trimmed]) {
            return multiPronMap[trimmed].join(" / ");
        }
    }

    // 규칙만으로 처리하기 어려운 소수의 예외 단어 처리 (표준 발음이 규정·관용으로 굳은 경우)
    // 되도록 예외를 줄이되, 실제 표준 발음과 다른 결과가 나는 대표적인 지명 등은 보정한다.
    let processedText = text;
    const exceptionMap = {
        // 제20항 다만: ㄴ/ㄹ 동화 예외
        "의견란": "의견난",
        "임진란": "임진난",
        "생산량": "생산냥",
        "결단력": "결단녁",
        "공권력": "공권녁",
        "동원령": "동원녕",
        "상견례": "상견녜",
        "횡단로": "횡단노",
        "이원론": "이원논",
        "입원료": "입원뇨",
        "구근류": "구근뉴",
        // 신문로[신문노] - 비음화(ㅁ+ㄹ→ㅁㄴ)는 그대로지만, ㄴ+ㄹ 유음화(ㄹㄹ) 규칙이 적용되지 않는 예
        "신문로": "신문노",
        // 학여울[항녀울], 알약[알략] - ㄴ 첨가 후 비음화/유음화 조합이 복잡한 대표 예시
        "학여울": "항녀울",
        "알약": "알략",
        // 덮이다[더피다] - 피동 접미사 환경에서의 ㅂ+이 발음을 표준 발음대로 직접 반영
        "덮이다": "더피다",
        // 헛웃음[허두슴] - 제9·10·11항 예시로 제시되는 특수한 연음·대표음화 예
        "헛웃음": "허두슴"
    };
    for (const key in exceptionMap) {
        processedText = processedText.split(key).join(exceptionMap[key]);
    }
    // phoneticOutput 전용 예외 (로마자 표기는 표기법에 따라 별도로 처리하는 것이 원칙인 경우)
    const exceptionMapPhoneticOnly = {
        // 솔잎[솔립] - ㄴ 첨가 및 비음화/유음화는 발음에만 반영, 로마자 표기는 solip
        "솔잎": "솔립",
        // 꽃잎[꼰닙] - 제29항(ㄴ 첨가) + 제18항(비음화) 예시
        //  - phoneticOutput: 실제 발음 '꼰닙'을 그대로 보여 줌
        //  - 로마자: 표준 표기 'Kkonip'을 얻기 위해서도 같은 음운형으로 처리하는 편이 자연스러움
        "꽃잎": "꼰닙",
        // 낮에[나제] - 받침 ㅈ과 모음 '에' 결합 시 실제 발음 반영 (로마자: naje)
        "낮에": "나제",
        // 낮이[나지] - 받침 ㅈ과 조사 '이' 결합 시 실제 발음 반영 (로마자: naji)
        "낮이": "나지"
    };
    if (!forRomanization) {
        for (const key in exceptionMapPhoneticOnly) {
            processedText = processedText.split(key).join(exceptionMapPhoneticOnly[key]);
        }
    } else {
        // 로마자 표기용 예외:
        // 꽃잎 → 꼰입으로 처리하여 'Kkonip'을 얻도록 한다.
        // (발음은 [꼰닙]이지만, 로마자 표기에서는 'n'이 한 번만 나타나는 꼴이 일반적임)
        const exceptionMapRomanization = {
            "꽃잎": "꼰입"
        };
        for (const key in exceptionMapRomanization) {
            processedText = processedText.split(key).join(exceptionMapRomanization[key]);
        }
    }

    const chars = processedText.split('');
    const syllables = chars.map(ch => {
        const syl = decomposeHangulSyllable(ch);
        return syl ? { L: syl.L, V: syl.V, T: syl.T } : null;
    });

    function composeSyllable(syl) {
        if (!syl || !syl.L || !syl.V) return null;
        const lIndex = CHOSEONG_LIST.indexOf(syl.L);
        const vIndex = JUNGSEONG_LIST.indexOf(syl.V);
        const tIndex = syl.T ? JONGSEONG_LIST.indexOf(syl.T) : 0;
        if (lIndex < 0 || vIndex < 0 || tIndex < 0) return null;
        const code = SBase + lIndex * NCount + vIndex * TCount + tIndex;
        return String.fromCharCode(code);
    }

    const len = syllables.length;

    // --- 1. 'ㄷ, ㅌ' 받침 + '이' (제17항) → [ㅈ, ㅊ]
    for (let i = 0; i < len - 1; i++) {
        const currSyl = syllables[i];
        const nextSyl = syllables[i + 1];
        if (!currSyl || !nextSyl) continue;
        if ((currSyl.T === 'ㄷ' || currSyl.T === 'ㅌ') && nextSyl.L === 'ㅇ' && nextSyl.V === 'ㅣ') {
            if (currSyl.T === 'ㄷ') {
                currSyl.T = "";
                nextSyl.L = 'ㅈ';
            } else if (currSyl.T === 'ㅌ') {
                currSyl.T = "";
                nextSyl.L = 'ㅊ';
            }
        }
    }

    // --- 1-붙임. 'ㄷ' 받침 + '히' (제17항 붙임: 굳히다[구치다], 닫히다[다치다], 묻히다[무치다]) → [ㅊ]
    for (let i = 0; i < len - 1; i++) {
        const currSyl = syllables[i];
        const nextSyl = syllables[i + 1];
        if (!currSyl || !nextSyl) continue;
        // 받침이 ㄷ이고, 뒤 음절이 '히'(ㅎ+ㅣ)인 경우
        if (currSyl.T === 'ㄷ' && nextSyl.L === 'ㅎ' && nextSyl.V === 'ㅣ') {
            currSyl.T = "";
            nextSyl.L = 'ㅊ'; // '티'가 [치]로 나는 결과를 직접 반영
        }
    }

    // --- 2. 기본 연음 규칙: 받침 ㄱ/ㄷ/ㅂ/ㄹ/ㅅ/ㅆ/ㅈ/ㅊ + 다음 초성 ㅇ(모음 시작) → 다음 음절 초성으로 이동
    // (백암[배감], 설악[서락], 옷이[오시], 있어[이써], 낮이[나지], 낯이[나치], 겉옷[거돋], 꽃잎[꼰닙] 등)
    // 다만, ㄹ 받침 뒤에 오는 '이/야/여/요/유' 계열(ㄴ 첨가 환경)에서는 적용하지 않는다. (서울역[서울력] 등)
    for (let i = 0; i < len - 1; i++) {
        const currSyl = syllables[i];
        const nextSyl = syllables[i + 1];
        if (!currSyl || !nextSyl) continue;
        const coda = currSyl.T;
        const nextVowel = nextSyl.V;

        if (nextSyl.L === 'ㅇ') {
            // 꽃잎[꼰닙]과 같이, 받침 ㅊ + '잎(ㅇ+ㅣ+ㅂ)'은 연음이 아니라
            // 뒤 단계의 ㄴ 첨가/비음화 규칙(제29항, 제18항 등)으로 처리해야 하므로 여기서는 건너뛴다.
            if (coda === 'ㅊ' && nextVowel === 'ㅣ' && nextSyl.T === 'ㅂ') {
                // do nothing
            } else if (coda === 'ㄹ') {
                // ㄹ 받침은 ㄴ 첨가 대상 모음(이/야/여/요/유) 앞에서는 연음시키지 않는다.
                if (nextVowel !== 'ㅣ' && nextVowel !== 'ㅑ' && nextVowel !== 'ㅕ' && nextVowel !== 'ㅠ') {
                    currSyl.T = "";
                    nextSyl.L = coda;
                }
            } else if (coda === 'ㅌ' && (nextVowel === 'ㅏ' || nextVowel === 'ㅓ' || nextVowel === 'ㅗ' || nextVowel === 'ㅜ' || nextVowel === 'ㅟ')) {
                // 받침 ㅌ + 실질 형태소 앞 모음(ㅏ,ㅓ,ㅗ,ㅜ,ㅟ) → 대표음 ㄷ이 다음 음절 초성으로 이동 (겉옷[거돋], 헛웃음[허두슴] 등)
                currSyl.T = "";
                nextSyl.L = 'ㄷ';
            } else if (
                coda === 'ㄱ' || coda === 'ㄷ' || coda === 'ㅂ' ||
                coda === 'ㅅ' || coda === 'ㅆ' || coda === 'ㅈ' || coda === 'ㅊ'
            ) {
                currSyl.T = "";
                nextSyl.L = coda;
            }
        }
    }

    // --- 3. 'ㅎ' 관련 규칙 (제12항)
    for (let i = 0; i < len - 1; i++) {
        const currSyl = syllables[i];
        const nextSyl = syllables[i + 1];
        if (!currSyl || !nextSyl) continue;

        let coda = currSyl.T;
        let onset = nextSyl.L;

        // 4-1. 'ㅎ(ㄶ,ㅀ)' 뒤에 'ㄱ,ㄷ,ㅈ' → [ㅋ,ㅌ,ㅊ]
        if ((coda === 'ㅎ' || coda === 'ㄶ' || coda === 'ㅀ') &&
            (onset === 'ㄱ' || onset === 'ㄷ' || onset === 'ㅈ')) {
            if (coda === 'ㄶ') currSyl.T = 'ㄴ';
            else if (coda === 'ㅀ') currSyl.T = 'ㄹ';
            else currSyl.T = "";

            if (onset === 'ㄱ') nextSyl.L = 'ㅋ';
            else if (onset === 'ㄷ') nextSyl.L = 'ㅌ';
            else if (onset === 'ㅈ') nextSyl.L = 'ㅊ';
        }

        coda = currSyl.T;
        onset = nextSyl.L;

        // 4-2. 받침 'ㄱ(ㄺ), ㄷ, ㅂ(ㄼ), ㅈ(ㄵ)' + 초성 'ㅎ' → [ㅋ,ㅌ,ㅍ,ㅊ]
        // 로마자 표기에서는 체언의 '낙하, 북하' 등에서 ㅎ을 밝혀 적는 규정이 있으므로,
        // forRomanization=true일 때는 이 규칙을 적용하지 않는다.
        if (!forRomanization && onset === 'ㅎ') {
            if (coda === 'ㄱ' || coda === 'ㄺ') {
                currSyl.T = "";
                nextSyl.L = 'ㅋ';
            } else if (coda === 'ㄷ' || coda === 'ㅅ' || coda === 'ㅆ' || coda === 'ㅈ' || coda === 'ㅊ' || coda === 'ㅌ') {
                currSyl.T = "";
                nextSyl.L = 'ㅌ';
            } else if (coda === 'ㅂ' || coda === 'ㄼ') {
                currSyl.T = "";
                nextSyl.L = 'ㅍ';
            } else if (coda === 'ㅈ' || coda === 'ㄵ') {
                currSyl.T = "";
                nextSyl.L = 'ㅊ';
            }
        }

        coda = currSyl.T;
        onset = nextSyl.L;

        // 4-3. 'ㅎ(ㄶ,ㅀ)' 뒤에 'ㅅ' → [ㅆ]
        if ((coda === 'ㅎ' || coda === 'ㄶ' || coda === 'ㅀ') && onset === 'ㅅ') {
            if (coda === 'ㄶ') currSyl.T = 'ㄴ';
            else if (coda === 'ㅀ') currSyl.T = 'ㄹ';
            else currSyl.T = "";
            nextSyl.L = 'ㅆ';
        }

        coda = currSyl.T;
        onset = nextSyl.L;

        // 4-4. 'ㅎ' 뒤에 'ㄴ' → [ㄴ], 'ㄶ,ㅀ' 뒤 'ㄴ'일 때 ㅎ 탈락
        if (onset === 'ㄴ') {
            if (coda === 'ㅎ') {
                currSyl.T = "";
            } else if (coda === 'ㄶ') {
                currSyl.T = 'ㄴ';
            } else if (coda === 'ㅀ') {
                currSyl.T = 'ㄹ';
            }
        }

        coda = currSyl.T;
        onset = nextSyl.L;

        // 4-5. 'ㅎ(ㄶ,ㅀ)' 뒤에 모음 시작(초성 ㅇ) → ㅎ 탈락
        if (onset === 'ㅇ') {
            if (coda === 'ㅎ') {
                currSyl.T = "";
            } else if (coda === 'ㄶ') {
                currSyl.T = 'ㄴ';
            } else if (coda === 'ㅀ') {
                currSyl.T = 'ㄹ';
            }
        }
    }

    // --- 4. 'ㄴ' 첨가 (제29항 단순화) : 받침 + (이/야/여/요/유) → 초성 ㅇ → ㄴ/ㄹ
    for (let i = 0; i < len - 1; i++) {
        const currSyl = syllables[i];
        const nextSyl = syllables[i + 1];
        if (!currSyl || !nextSyl) continue;
        const coda = currSyl.T;
        const onset = nextSyl.L;
        const vowel = nextSyl.V;

        if (!coda) continue;
        if (onset === 'ㅇ' && (vowel === 'ㅣ' || vowel === 'ㅑ' || vowel === 'ㅕ' || vowel === 'ㅛ' || vowel === 'ㅠ')) {
            // 'ㄹ' 받침 뒤의 'ㄴ' 첨가는 [ㄹ] (솔잎[솔립], 서울역[서울력] 등)
            if (coda === 'ㄹ') {
                nextSyl.L = 'ㄹ';
            } else {
                nextSyl.L = 'ㄴ';
            }
        }
    }

    // --- 5. 비음화/유음화 (제18·19·20항) - ㄴ 첨가 이후에 적용
    if (!forRomanization) {
        const groupG = ['ㄱ','ㄲ','ㅋ','ㄳ','ㄺ'];
        const groupD = ['ㄷ','ㅅ','ㅆ','ㅈ','ㅊ','ㅌ','ㅎ'];
        const groupB = ['ㅂ','ㅍ','ㄼ','ㄿ','ㅄ'];

        // 제18·19항
        for (let i = 0; i < len - 1; i++) {
            const currSyl = syllables[i];
            const nextSyl = syllables[i + 1];
            if (!currSyl || !nextSyl) continue;

            let coda = currSyl.T;
            let onset = nextSyl.L;

            // 제18항: 받침 'ㄱ(ㄲ,ㅋ,ㄳ,ㄺ), ㄷ(ㅅ,ㅆ,ㅈ,ㅊ,ㅌ,ㅎ), ㅂ(ㅍ,ㄼ,ㄿ,ㅄ)' + 'ㄴ,ㅁ' → [ㅇ,ㄴ,ㅁ]
            if ((groupG.includes(coda) || groupD.includes(coda) || groupB.includes(coda)) &&
                (onset === 'ㄴ' || onset === 'ㅁ')) {
                if (groupG.includes(coda)) currSyl.T = 'ㅇ';
                else if (groupD.includes(coda)) currSyl.T = 'ㄴ';
                else if (groupB.includes(coda)) currSyl.T = 'ㅁ';
            }

            coda = currSyl.T;
            onset = nextSyl.L;

            // 제19항 붙임: 받침 'ㄱ,ㅂ' 계열 뒤에 'ㄹ' → [ㅇ/ㅁ] + [ㄴ]
            if (onset === 'ㄹ') {
                if (groupG.includes(coda)) {
                    currSyl.T = 'ㅇ';
                    nextSyl.L = 'ㄴ';
                } else if (groupB.includes(coda)) {
                    currSyl.T = 'ㅁ';
                    nextSyl.L = 'ㄴ';
                }
            }

            coda = currSyl.T;
            onset = nextSyl.L;

            // 제19항: 받침 'ㅁ,ㅇ' 뒤에 'ㄹ' → 'ㄴ'
            if ((coda === 'ㅁ' || coda === 'ㅇ') && onset === 'ㄹ') {
                nextSyl.L = 'ㄴ';
            }
        }

        // 제20항: 'ㄴ'은 'ㄹ'의 앞이나 뒤에서 [ㄹ]
        for (let i = 0; i < len - 1; i++) {
            const currSyl = syllables[i];
            const nextSyl = syllables[i + 1];
            if (!currSyl || !nextSyl) continue;
            const coda = currSyl.T;
            const onset = nextSyl.L;

            if (coda === 'ㄴ' && onset === 'ㄹ') {
                currSyl.T = 'ㄹ';
                nextSyl.L = 'ㄹ';
            } else if (coda === 'ㄹ' && onset === 'ㄴ') {
                currSyl.T = 'ㄹ';
                nextSyl.L = 'ㄹ';
            }
        }
    }

    // --- 6. 한자어 'ㄹ' 받침 뒤 'ㄷ,ㅅ,ㅈ' 경음화 (제26항)
    // 한자어 여부를 기계적으로 구분하기 어려우므로, 구현에서는 단순히 'ㄹ' 받침 + 'ㄷ/ㅅ/ㅈ' 환경에 된소리를 적용한다.
    // 예: 울산[울싼], 갈등[갈뜽], 발전[발쩐], 물질[물찔] 등
    if (!forRomanization) {
        const tenseAfterRMap = { 'ㄷ': 'ㄸ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ' };
        for (let i = 0; i < len - 1; i++) {
            const currSyl = syllables[i];
            const nextSyl = syllables[i + 1];
            if (!currSyl || !nextSyl) continue;
            const coda = currSyl.T;
            const onset = nextSyl.L;
            if (coda === 'ㄹ' && tenseAfterRMap[onset]) {
                nextSyl.L = tenseAfterRMap[onset];
            }
        }
    }

    // --- 7. 경음화 (제23항 기본형) - 받침 자음 뒤 'ㄱ,ㄷ,ㅂ,ㅅ,ㅈ' → ㄲ,ㄸ,ㅃ,ㅆ,ㅉ
    // 로마자 표기에서는 된소리되기를 반영하지 않으므로(forRomanization=true일 때는 생략)
    if (!forRomanization) {
        const tenseMap = { 'ㄱ': 'ㄲ', 'ㄷ': 'ㄸ', 'ㅂ': 'ㅃ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ' };
        const tenseTargets = ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ'];
        const tenseCodas = ['ㄱ','ㄲ','ㅋ','ㄳ','ㄺ','ㄷ','ㅅ','ㅆ','ㅈ','ㅊ','ㅌ','ㅂ','ㅍ','ㄼ','ㄿ','ㅄ'];

        for (let i = 0; i < len - 1; i++) {
            const currSyl = syllables[i];
            const nextSyl = syllables[i + 1];
            if (!currSyl || !nextSyl) continue;
            const coda = currSyl.T;
            const onset = nextSyl.L;
            if (tenseCodas.includes(coda) && tenseTargets.includes(onset)) {
                nextSyl.L = tenseMap[onset] || onset;
            }
        }
    }

    // --- 8. 받침 대표음화 (제9·10·11항)
    // 어말 또는 자음 앞에서 ㄲ,ㅋ,ㅅ,ㅆ,ㅈ,ㅊ,ㅌ,ㅍ 및 겹받침을 7개의 대표 자음으로 축약
    const finalRepMap = {
        // 제9항: 홑받침
        'ㄲ': 'ㄱ',
        'ㅋ': 'ㄱ',
        'ㅅ': 'ㄷ',
        'ㅆ': 'ㄷ',
        'ㅈ': 'ㄷ',
        'ㅊ': 'ㄷ',
        'ㅌ': 'ㄷ',
        'ㅍ': 'ㅂ',
        // 제10·11항: 겹받침
        'ㄳ': 'ㄱ',
        'ㄵ': 'ㄴ',
        'ㄶ': 'ㄴ',
        'ㄼ': 'ㄹ',
        'ㄽ': 'ㄹ',
        'ㄾ': 'ㄹ',
        'ㅀ': 'ㄹ',
        'ㅄ': 'ㅂ',
        'ㄺ': 'ㄱ',
        'ㄻ': 'ㅁ',
        'ㄿ': 'ㅂ'
    };

    for (let i = 0; i < len; i++) {
        const currSyl = syllables[i];
        if (!currSyl) continue;
        const coda = currSyl.T;
        if (!coda) continue;

        const nextSyl = syllables[i + 1];
        const nextChar = chars[i + 1];

        // 한 단어 내부에서 다음 음절이 모음으로 시작(초성 ㅇ)하면 대표음화 대상이 아님
        const nextIsHangulSyllable = !!nextSyl;
        const nextIsVowelStart = nextSyl && nextSyl.L === 'ㅇ';

        // 다음 글자가 없거나, 한글 음절이 아니거나, 자음으로 시작하는 음절이면 "어말 또는 자음 앞"
        const isEndOfWord =
                  !nextChar ||
                  /\s/.test(nextChar) ||
                  !/[가-힣]/.test(nextChar) ||
                  (nextIsHangulSyllable && !nextIsVowelStart);

        if (isEndOfWord && finalRepMap[coda]) {
            currSyl.T = finalRepMap[coda];
        }
    }

    // 최종: 음절 배열을 다시 문자열로 합성
    const outChars = chars.map((ch, idx) => {
        const syl = syllables[idx];
        if (!syl) return ch;
        const composed = composeSyllable(syl);
        return composed || ch;
    });

    return outChars.join('');
}

// 학술 연구용 로마자 변환 (제8항)
function hangulToRomanAcademic(text) {
    let result = '';
    let atWordStart = true;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        // 공백(단어 경계) 처리
        if (/\s/.test(ch)) {
            result += ch;
            atWordStart = true;
            continue;
        }

        const syl = decomposeHangulSyllable(ch);
        if (!syl) {
            // 한글 음절이 아닌 문자는 그대로 유지
            result += ch;
            // 공백이 아니므로 단어는 계속 이어진다고 본다
            atWordStart = false;
            continue;
        }

        const { L, V, T } = syl;
        let chunk = '';

        // 초성 처리
        if (L === 'ㅇ') {
            // 음가 없는 ㅇ: 단어 첫머리에서는 생략, 그 밖에서는 하이픈(-)으로 표기
            if (!atWordStart) {
                chunk += '-';
            }
        } else {
            chunk += ACADEMIC_CONSONANT_ROMAN[L] || '';
        }

        // 중성 처리 (제2장 모음 대응 그대로)
        chunk += VOWEL_ROMAN[V] || '';

        // 종성 처리: 겹받침은 분해하여 자모 단위로 표기
        if (T) {
            const codas = JONG_DECOMP[T] || [T];
            codas.forEach(c => {
                if (c === 'ㅇ') {
                    chunk += 'ng';
                } else {
                    chunk += ACADEMIC_CONSONANT_ROMAN[c] || '';
                }
            });
        }

        result += chunk;
        atWordStart = false;
    }

    return result;
}

// 내부 변환 함수
function hangulToRomanInternal(text, options = {}) {
    const { properNoun = false, useHyphen = false } = options;

    // 발음 변환은 외부에서 이미 수행된 텍스트를 받는다고 가정하거나
    // 혹은 이 함수 내에서는 순수하게 '입력된 텍스트'를 로마자로만 바꾼다.
    // 여기서는 입력 텍스트가 이미 발음대로 변환되었다고 가정하지 않고,
    // 호출하는 쪽에서 제어하도록 구조를 변경하거나 유지.
    // 현재 구조상 호출 시점에 변환된 텍스트를 넘겨주는 것이 좋음.

    let result = '';
    let isFirstChar = true;
    let prevConsonant = null;
    let prevWasHangulSyllable = false;
    const vowelMap = VOWEL_ROMAN;
    const consonantFunc = consonantToRoman;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        // 공백 처리
        if (/\s/.test(ch)) {
            result += ch;
            isFirstChar = true;
            prevConsonant = null;
            prevWasHangulSyllable = false;
            continue;
        }

        // 한글 음절 분해
        const syl = decomposeHangulSyllable(ch);
        if (!syl) {
            result += ch;
            prevConsonant = null;
            prevWasHangulSyllable = false;
            continue;
        }

        let roman = '';
        // 다음 글자가 모음으로 시작하는지 확인 (초성이 'ㅇ'인 경우)
        const nextCh = text[i + 1];
        const nextSyl = nextCh ? decomposeHangulSyllable(nextCh) : null;
        const nextIsVowelStart = nextSyl && nextSyl.L === 'ㅇ';

        const nextIsVowel = isVowelNext(text, i + 1); // 이 함수는 단순히 중성이 있는지만 확인하므로 수정 필요하거나 사용 주의
        // const nextIsConsonant = isConsonantNext(text, i + 1);
        const hasNextSyllable = !!nextSyl;

        // 필요 시 음절 경계에 하이픈 추가 (옵션)
        if (useHyphen && prevWasHangulSyllable) {
            result += '-';
        }

        // 초성
        if (syl.L) {
            // 초성일 때 'nextIsVowel'은 '현재 음절의 중성이 존재하는지' 여부여야 함
            const isNextVowelForInitial = !!syl.V;

            let initialConsonant = syl.L;

            // 로마자 표기 시, 받침 ㄱ/ㄷ/ㅂ/ㄺ/ㄼ/ㄵ + '혀/히' 계열에서
            // 실제 발음대로 ㅎ을 드러내지 않고 거센소리 자음만 반영하기 위한 처리.
            // 예: 잡혀[자펴] → Japyeo (× Japhyeo), 잡히다[자피다] → Japida 등.
            // 다만, 체언 '집현전'처럼 ㅎ을 밝혀 적어야 하는 고유 명사는 예외로 둔다.
            if (initialConsonant === 'ㅎ') {
                const prevCh = text[i - 1];
                const prevSyl = prevCh ? decomposeHangulSyllable(prevCh) : null;
                const prevCoda = prevSyl && prevSyl.T;
                const aspirGroup = ['ㄱ', 'ㄺ', 'ㄷ', 'ㅂ', 'ㄼ', 'ㅈ', 'ㄵ'];
                const bigram = (prevCh || '') + ch;
                const isKeepHException = (bigram === '집현'); // 집현전 → Jiphyeonjeon
                // '혀(ㅎ+ㅕ)', '히(ㅎ+ㅣ)'와 같이 용언 활용에서 자주 나타나는 환경만 한정적으로 적용
                if (!isKeepHException && aspirGroup.includes(prevCoda) && (syl.V === 'ㅕ' || syl.V === 'ㅣ')) {
                    initialConsonant = ''; // ㅎ을 로마자 표기에서 생략
                }
            }

            if (initialConsonant) {
                roman += consonantFunc(initialConsonant, true, false, isNextVowelForInitial, prevConsonant);
            }
        }

        // 중성
        if (syl.V) {
            roman += vowelMap[syl.V] || '';
            prevConsonant = null;
        }

        // 종성
        if (syl.T) {
            // 종성은 다음 음절이 없거나, 다음이 자음으로 시작할 때(초성이 ㅇ이 아닐 때) 종성으로 처리
            // 다음이 모음으로 시작(초성이 ㅇ)하면 종성이 초성으로 이어지므로(연음) 모음 앞 자음으로 처리
            const isFinalPos = !hasNextSyllable || !nextIsVowelStart;

            if (JONG_DECOMP[syl.T]) {
                // 복합 종성 분해
                const decomposed = JONG_DECOMP[syl.T];
                decomposed.forEach((c, idx) => {
                    const isLast = idx === decomposed.length - 1;
                    // 마지막 자음이고 다음이 모음 시작이면 연음 처리
                    const nextVowel = isLast ? nextIsVowelStart : false;
                    const isFinal = isLast ? isFinalPos : true;
                    const prev = idx > 0 ? decomposed[idx - 1] : null;
                    roman += consonantFunc(c, false, isFinal, nextVowel, prev);
                });
                prevConsonant = decomposed[decomposed.length - 1];
            } else {
                // 단일 종성
                roman += consonantFunc(syl.T, false, isFinalPos, nextIsVowelStart, prevConsonant);
                prevConsonant = syl.T;
            }
        } else {
            prevConsonant = null;
        }

        // 고유명사 첫 글자 대문자
        if (properNoun && isFirstChar && roman) {
            roman = roman.charAt(0).toUpperCase() + roman.slice(1);
        }

        result += roman;
        isFirstChar = false;
        prevWasHangulSyllable = true;
    }

    return result;
}

// DOM 요소
const inputText = document.getElementById('inputText');
const output = document.getElementById('output');
const phoneticOutput = document.getElementById('phoneticOutput');
const toRomanBtn = document.getElementById('toRomanBtn');
const copyOut1 = document.getElementById('copyOut1');
const resetBtn = document.getElementById('resetBtn');
const properNounCheck = document.getElementById('properNounCheck');
const hyphenCheck = document.getElementById('hyphenCheck');

// 모드 전환 관련 DOM
const modeGeneralBtn = document.getElementById('modeGeneralBtn');
const modeNameBtn = document.getElementById('modeNameBtn');
const modeAddressBtn = document.getElementById('modeAddressBtn');
const modeAcademicBtn = document.getElementById('modeAcademicBtn');
const generalSection = document.getElementById('generalSection');
const nameSection = document.getElementById('nameSection');
const addressSection = document.getElementById('addressSection');
const academicSection = document.getElementById('academicSection');
const surnameInput = document.getElementById('surnameInput');
const givenNameInput = document.getElementById('givenNameInput');
const toRomanNameBtn = document.getElementById('toRomanNameBtn');
const nameHyphenCheck = document.getElementById('nameHyphenCheck');

// 영문주소 탭 DOM
const korAddressInput = document.getElementById('korAddressInput');
const fetchEngAddressBtn = document.getElementById('fetchEngAddressBtn');

// 학술 연구용 DOM
const academicInput = document.getElementById('academicInput');
const toRomanAcademicBtn = document.getElementById('toRomanAcademicBtn');

// 모드 전환: 일반 고유명사 모드
modeGeneralBtn.addEventListener('click', () => {
    modeGeneralBtn.classList.add('active');
    modeNameBtn.classList.remove('active');
    modeAddressBtn.classList.remove('active');
    modeAcademicBtn.classList.remove('active');
    generalSection.style.display = 'block';
    nameSection.style.display = 'none';
    addressSection.style.display = 'none';
    academicSection.style.display = 'none';
    // 모드 전환 시 이전 결과 초기화
    if (output) output.textContent = '';
    if (phoneticOutput) phoneticOutput.textContent = '';
    if (phoneticOutput && phoneticOutput.parentElement) {
        phoneticOutput.parentElement.style.display = 'block';
    }
});

// 모드 전환: 이름(성명) 모드
modeNameBtn.addEventListener('click', () => {
    modeNameBtn.classList.add('active');
    modeGeneralBtn.classList.remove('active');
    modeAddressBtn.classList.remove('active');
    modeAcademicBtn.classList.remove('active');
    generalSection.style.display = 'none';
    nameSection.style.display = 'block';
    addressSection.style.display = 'none';
    academicSection.style.display = 'none';
    if (output) output.textContent = '';
    if (phoneticOutput) phoneticOutput.textContent = '';
    if (phoneticOutput && phoneticOutput.parentElement) {
        phoneticOutput.parentElement.style.display = 'none';
    }
});

// 모드 전환: 영문주소 모드
modeAddressBtn.addEventListener('click', () => {
    modeAddressBtn.classList.add('active');
    modeGeneralBtn.classList.remove('active');
    modeNameBtn.classList.remove('active');
    modeAcademicBtn.classList.remove('active');
    generalSection.style.display = 'none';
    nameSection.style.display = 'none';
    addressSection.style.display = 'block';
    academicSection.style.display = 'none';
    if (output) output.textContent = '';
    if (phoneticOutput) phoneticOutput.textContent = '';
    if (phoneticOutput && phoneticOutput.parentElement) {
        phoneticOutput.parentElement.style.display = 'none';
    }
});

// 모드 전환: 학술연구 논문 모드
modeAcademicBtn.addEventListener('click', () => {
    modeAcademicBtn.classList.add('active');
    modeGeneralBtn.classList.remove('active');
    modeNameBtn.classList.remove('active');
    modeAddressBtn.classList.remove('active');
    generalSection.style.display = 'none';
    nameSection.style.display = 'none';
    addressSection.style.display = 'none';
    academicSection.style.display = 'block';
    if (output) output.textContent = '';
    if (phoneticOutput) phoneticOutput.textContent = '';
    if (phoneticOutput && phoneticOutput.parentElement) {
        phoneticOutput.parentElement.style.display = 'none';
    }
});

// 한글 → 로마자 변환 (일반 고유명사 모드)
toRomanBtn.addEventListener('click', () => {
    const text = inputText.value || '';

    // 1. 표준 발음 텍스트 생성 (forRomanization=false)
    const phoneticText = applyPhonologicalChanges(text, false);
    phoneticOutput.textContent = phoneticText || '(결과 없음)';

    const options = {
        properNoun: properNounCheck.checked,
        useHyphen: hyphenCheck.checked
    };

    // 2. 변환된 발음 텍스트를 기준으로 로마자 변환
    const romanText = applyPhonologicalChanges(text, true);
    const result = hangulToRomanInternal(romanText, options);

    output.textContent = result || '(결과 없음)';
});

// 이름(성명) → 로마자 변환
toRomanNameBtn.addEventListener('click', () => {
    const surname = (surnameInput.value || '').trim();
    const given = (givenNameInput.value || '').trim();

    if (!surname && !given) {
        output.textContent = '(결과 없음)';
        return;
    }

    let romanSurname = '';
    if (surname) {
        if (SURNAME_ROMAN_MAP[surname]) {
            romanSurname = SURNAME_ROMAN_MAP[surname];
        } else {
            const sPhon = applyPhonologicalChanges(surname, true);
            romanSurname = hangulToRomanInternal(sPhon, { properNoun: true, useHyphen: false });
            romanSurname = capitalizeWord(romanSurname);
        }
    }

    let romanGiven = '';
    if (given) {
        const gPhon = applyPhonologicalChanges(given, true);
        const useHyphenInGiven = !!(nameHyphenCheck && nameHyphenCheck.checked);
        romanGiven = hangulToRomanInternal(gPhon, { properNoun: true, useHyphen: useHyphenInGiven });
        // 이름이 두 음절 이상이거나 띄어쓰기가 있을 때 각 단어 첫 글자만 대문자
        romanGiven = romanGiven.split(/\s+/).map(capitalizeWord).join(' ');
    }

    const combined = [romanSurname, romanGiven].filter(Boolean).join(' ');
    output.textContent = combined || '(결과 없음)';
});

function getMoisErrorMessage(errorCode, errorMessage) {
    const map = {
        '0': '',
        '-999': '주소 서비스 시스템 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. 문제가 계속되면 도로명주소 도움센터에 문의해 주세요.',
        'E0001': '승인되지 않은 키입니다. 개발용 승인키를 다시 확인해 주세요. (서비스 담당자에게 문의 필요)',
        'E0005': '검색어가 없습니다. 도로명이나 지번 등 한글 주소를 입력해 주세요.',
        'E0006': '시·도 이름만으로는 검색할 수 없습니다. 예: "서울 종로구 세종대로 209"처럼 도로명과 번지까지 입력해 주세요.',
        'E0008': '한 글자만으로는 검색할 수 없습니다. 예: "종로구", "세종대로 209"처럼 두 글자 이상 입력해 주세요.',
        'E0009': '숫자만으로는 검색할 수 없습니다. "세종대로 209"처럼 도로명이나 동 이름과 함께 입력해 주세요.',
        'E0010': '주소가 너무 깁니다. 시/구/도로명/번지 정도까지만 입력해 주세요. (80자를 넘길 수 없습니다.)',
        'E0011': '10자리를 넘는 너무 긴 숫자가 포함되어 있습니다. 지번·번지 숫자를 줄여서 다시 입력해 주세요.',
        'E0012': '특수문자와 숫자만으로 이루어진 검색어는 사용할 수 없습니다. 도로명이나 동 이름을 함께 입력해 주세요.',
        'E0013': '주소에 허용되지 않는 특수문자나 예약어(%, =, <, >, [, ])가 포함되어 있습니다. 기호를 제거하고 다시 입력해 주세요.',
        'E0014': '개발 승인키 사용 기간이 만료되었습니다. 개발용 승인키를 다시 발급받아 설정해 주세요.',
        'E0015': '검색 범위가 너무 넓습니다. 더 구체적인 주소(도로명+번지 등)로 다시 검색해 주세요.'
    };
    return map[errorCode] || (errorMessage || '주소 조회 중 알 수 없는 오류가 발생했습니다.');
}

async function fetchEngAddressByKeyword(keyword, currentPage = 1, countPerPage = 10) {
    const params = new URLSearchParams({
        confmKey: MOIS_ADDR_ENG_API_KEY,
        currentPage: String(currentPage),
        countPerPage: String(countPerPage),
        keyword,
        resultType: 'json'
    });
    const url = `${MOIS_ADDR_ENG_API_URL}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    const results = data.results || data;
    const common = results.common;
    const errorCode = common?.errorCode;
    const errorMessage = common?.errorMessage;
    if (errorCode && errorCode !== '0') {
        const userMsg = getMoisErrorMessage(errorCode, errorMessage);
        throw new Error(`API 오류(${errorCode}): ${userMsg}`);
    }
    const jusoList = results.juso || [];
    return jusoList.map(item => ({
        roadAddr: item.roadAddr,
        jibunAddr: item.jibunAddr,
        zipNo: item.zipNo,
        korAddr: item.korAddr
    }));
}

// 영문 주소 조회 버튼
if (fetchEngAddressBtn) {
    fetchEngAddressBtn.addEventListener('click', async () => {
        const fullKorInput = (korAddressInput?.value || '').trim();

        if (!fullKorInput) {
            output.textContent = '한글 주소를 먼저 입력해 주세요.';
            return;
        }

        // 쉼표(,) 기준으로 1차 상세주소 분리: "해송로 143, 118동 402호" → "해송로 143" + "118동 402호"
        let mainKeyword = fullKorInput;
        let extraFromComma = '';
        const commaIdx = fullKorInput.indexOf(',');
        if (commaIdx !== -1) {
            mainKeyword = fullKorInput.slice(0, commaIdx).trim();
            extraFromComma = fullKorInput.slice(commaIdx + 1).trim();
        }

        const detailKorCombined = extraFromComma.trim();

        output.textContent = '영문 주소 조회 중입니다. 잠시만 기다려 주세요...';

        try {
            const list = await fetchEngAddressByKeyword(mainKeyword, 1, 10);

            if (!list.length) {
                output.textContent = '검색 결과가 없습니다.';
                return;
            }

            const lines = list.map(item => {
                const road = item.roadAddr || '';
                const jibun = item.jibunAddr || '';
                const zip = item.zipNo || '';
                const kor = item.korAddr || '';
                const main = road || jibun;

                // 상세주소(쉼표 뒤 한글)에서 층 정보 추출: "지하 1층" → B1F, "3층" → 3F
                let floorToken = '';
                let detailKorBase = detailKorCombined;
                if (detailKorBase) {
                    const basementMatch = detailKorBase.match(/지하\s*(\d+)\s*층/);
                    if (basementMatch) {
                        floorToken = `B${basementMatch[1]}F`;
                        detailKorBase = detailKorBase.replace(basementMatch[0], '').trim();
                    } else {
                        const floorMatch = detailKorBase.match(/(\d+)\s*층/);
                        if (floorMatch) {
                            floorToken = `${floorMatch[1]}F`;
                            detailKorBase = detailKorBase.replace(floorMatch[0], '').trim();
                        }
                    }
                }

                let detailEng = '';
                if (detailKorBase) {
                    const detailPhon = applyPhonologicalChanges(detailKorBase, true);
                    detailEng = hangulToRomanInternal(detailPhon, { properNoun: false, useHyphen: false }).trim();
                    // 주소 상세 표현 중 자주 쓰이는 생활어는 관용적인 영문 표현으로 보정
                    // 예: "아파트" → "Apartment" 등
                    detailEng = detailEng
                    .replace(/\bapateu\b/gi, 'Apartment')   // 아파트
                    .replace(/\bopiseutel\b/gi, 'Officetel') // 오피스텔
                    .replace(/\bbilla\b/gi, 'Villa')         // 빌라
                    .replace(/\bdandokjutaek\b/gi, 'House')  // 단독주택
                    .replace(/\bjutaek\b/gi, 'House');       // 주택
                }

                if (floorToken) {
                    detailEng = detailEng ? `${floorToken} ${detailEng}` : floorToken;
                }

                // 상세 주소(동·호 등)가 있을 경우, 영문 주소에서는 일반적으로 상세를 앞에,
                // 도로명 주소를 뒤에 두는 형식으로 표기한다.
                // 예) 402-dong 118-ho, 143 Haesong-ro, Yeonsu-gu, Incheon
                const engWithDetail = detailEng ? `${detailEng}, ${main}` : main;

                return zip
                    ? `${engWithDetail} (${zip})\n  - 한글: ${kor}${detailKorCombined ? ' ' + detailKorCombined : ''}`
                    : `${engWithDetail}\n  - 한글: ${kor}${detailKorCombined ? ' ' + detailKorCombined : ''}`;
            });
            output.textContent = lines.join('\n\n');
        } catch (err) {
            console.error(err);
            output.textContent = `조회 중 오류가 발생했습니다. (브라우저 CORS 정책 또는 API 오류일 수 있습니다.)\n${err.message || err}`;
        }
    });
}

// 학술연구 논문용 한글 → 로마자 변환
if (toRomanAcademicBtn) {
    toRomanAcademicBtn.addEventListener('click', () => {
        const text = (academicInput?.value || '').trim();
        if (!text) {
            output.textContent = '(결과 없음)';
            return;
        }
        const result = hangulToRomanAcademic(text);
        output.textContent = result || '(결과 없음)';
    });
}

// 현행 표기법 복사
copyOut1.addEventListener('click', () => {
    const textToCopy = output.textContent || '';
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyOut1.textContent = '복사됨 ✓';
        setTimeout(() => copyOut1.textContent = '변환결과 복사', 1000);
    }).catch(() => {
        alert('복사 실패 — 브라우저가 클립보드 API를 지원하지 않을 수 있습니다.');
    });
});

// 초기화
resetBtn.addEventListener('click', () => {
    inputText.value = '';
    output.textContent = '';
    phoneticOutput.textContent = '';
});

// 키보드 단축키
inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        toRomanBtn.click();
    }
});