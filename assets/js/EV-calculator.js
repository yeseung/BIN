    // 정계산/역계산 모드 전환
    function switchMode(mode) {
        const allTabs = document.querySelectorAll('#mode-tabs .segment-tab');
        const forwardSection = document.getElementById('forward-mode');
        const reverseSection = document.getElementById('reverse-mode');
        
        if (mode === 'forward') {
            if (allTabs.length >= 2) {
                allTabs[0].classList.add('active');
                allTabs[1].classList.remove('active');
            }
            forwardSection.classList.add('active');
            reverseSection.classList.remove('active');
        } else {
            if (allTabs.length >= 2) {
                allTabs[0].classList.remove('active');
                allTabs[1].classList.add('active');
            }
            forwardSection.classList.remove('active');
            reverseSection.classList.add('active');
        }
        
        // 결과 컨테이너 숨기기
        document.getElementById('result-container').style.display = 'none';
        hideError();
    }
    
    // 역계산 모드 선택
    function selectReverseMode(mode) {
        // hidden input 업데이트
        document.getElementById('reverse-mode-type').value = mode;
        
        // 세그먼트 탭 활성화 상태 업데이트
        const tabs = document.querySelectorAll('#reverse-mode .segment-tab');
        tabs.forEach((tab, index) => {
            if ((index + 1).toString() === mode) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // UI 업데이트
        updateReverseModeUI();
    }
    
    // 역계산 모드 UI 업데이트
    function updateReverseModeUI() {
        const modeType = document.getElementById('reverse-mode-type').value;
        const isoGroup = document.getElementById('reverse-iso-group');
        const apertureGroup = document.getElementById('reverse-aperture-group');
        const shutterGroup = document.getElementById('reverse-shutter-group');
        
        // 모든 그룹 초기화
        isoGroup.style.display = 'block';
        apertureGroup.style.display = 'none';
        shutterGroup.style.display = 'none';
        
        if (modeType === '1') {
            // 방식 1: EV + ISO → 조리개/셔터 조합 추천
            isoGroup.style.display = 'block';
        } else if (modeType === '2') {
            // 방식 2: EV + 조리개 + ISO → 셔터 스피드 계산
            apertureGroup.style.display = 'block';
        } else if (modeType === '3') {
            // 방식 3: EV + 셔터 + ISO → 조리개 계산
            shutterGroup.style.display = 'block';
        }
        
        // 결과 컨테이너 숨기기
        document.getElementById('result-container').style.display = 'none';
    }
    
    // 역계산 실행
    function calculateReverseEV() {
        hideError();
        
        const ev = parseFloat(document.getElementById('reverse-ev').value);
        const modeType = document.getElementById('reverse-mode-type').value;
        
        if (isNaN(ev)) {
            showError('노출값(EV)을 입력해주세요.');
            return;
        }
        
        if (modeType === '1') {
            // 방식 1: EV + ISO → 조리개/셔터 조합 추천
            const iso = parseFloat(document.getElementById('reverse-iso').value);
            if (isNaN(iso) || iso <= 0) {
                showError('ISO 값을 선택해주세요.');
                return;
            }
            calculateCombinations(ev, iso);
        } else if (modeType === '2') {
            // 방식 2: EV + 조리개 + ISO → 셔터 스피드 계산
            const aperture = parseFloat(document.getElementById('reverse-aperture').value);
            const iso = parseFloat(document.getElementById('reverse-iso').value);
            if (isNaN(aperture) || aperture <= 0) {
                showError('조리개 값을 선택해주세요.');
                return;
            }
            if (isNaN(iso) || iso <= 0) {
                showError('ISO 값을 선택해주세요.');
                return;
            }
            calculateShutterFromEV(ev, aperture, iso);
        } else if (modeType === '3') {
            // 방식 3: EV + 셔터 + ISO → 조리개 계산
            const shutter = parseFloat(document.getElementById('reverse-shutter').value);
            const iso = parseFloat(document.getElementById('reverse-iso').value);
            if (isNaN(shutter) || shutter <= 0) {
                showError('셔터 스피드를 선택해주세요.');
                return;
            }
            if (isNaN(iso) || iso <= 0) {
                showError('ISO 값을 선택해주세요.');
                return;
            }
            calculateApertureFromEV(ev, shutter, iso);
        }
    }
    
    // 방식 1: 조리개/셔터 조합 추천
    function calculateCombinations(ev, iso) {
        // f²/t = 2^(EV + log₂(ISO/100))
        const isoOver100 = iso / 100;
        const fSquaredOverT = Math.pow(2, ev + Math.log2(isoOver100));
        
        // 일반적인 조리개 값들
        const apertures = [1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16, 22, 32];
        // 일반적인 셔터 스피드 값들 (초)
        const shutterSpeeds = [0.000125, 0.00025, 0.0005, 0.001, 0.002, 0.004, 0.008, 0.0167, 0.0333, 0.0667, 0.125, 0.25, 0.5, 1, 2, 4, 8, 15, 30, 60];
        
        const combinations = [];
        
        apertures.forEach(aperture => {
            const fSquared = aperture * aperture;
            const requiredShutter = fSquared / fSquaredOverT;
            
            // 가장 가까운 셔터 스피드 찾기
            let closestShutter = null;
            let minDiff = Infinity;
            
            shutterSpeeds.forEach(shutter => {
                const diff = Math.abs(shutter - requiredShutter);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestShutter = shutter;
                }
            });
            
            // 차이가 20% 이내면 조합으로 추가
            if (minDiff < requiredShutter * 0.2) {
                combinations.push({
                    aperture: aperture,
                    shutter: closestShutter,
                    accuracy: (1 - minDiff / requiredShutter) * 100
                });
            }
        });
        
        // 정확도 순으로 정렬
        combinations.sort((a, b) => b.accuracy - a.accuracy);
        
        // 결과 표시
        displayCombinations(combinations, ev, iso);
    }
    
    // 방식 2: 셔터 스피드 계산
    function calculateShutterFromEV(ev, aperture, iso) {
        const isoOver100 = iso / 100;
        const fSquaredOverT = Math.pow(2, ev + Math.log2(isoOver100));
        const fSquared = aperture * aperture;
        const requiredShutter = fSquared / fSquaredOverT;
        
        displaySingleResult('셔터 스피드', formatShutterSpeed(requiredShutter), ev, aperture, null, iso);
    }
    
    // 방식 3: 조리개 계산
    function calculateApertureFromEV(ev, shutter, iso) {
        const isoOver100 = iso / 100;
        const fSquaredOverT = Math.pow(2, ev + Math.log2(isoOver100));
        const requiredFSquared = fSquaredOverT * shutter;
        const requiredAperture = Math.sqrt(requiredFSquared);
        
        displaySingleResult('조리개', `f/${requiredAperture.toFixed(1)}`, ev, requiredAperture, shutter, iso);
    }
    
    // 조합 결과 표시
    function displayCombinations(combinations, ev, iso) {
        const resultContainer = document.getElementById('result-container');
        const resultValue = document.getElementById('result-value');
        const resultInfo = document.getElementById('result-info');
        
        resultValue.textContent = `EV ${ev.toFixed(2)}`;
        
        let infoHTML = `<div class="result-info-item" style="font-size: 14px; color: #374151; margin-bottom: 12px; font-weight: 600;">ISO ${iso} 기준 조리개/셔터 조합</div>`;
        
        if (combinations.length === 0) {
            infoHTML += `<div class="result-info-item" style="color: #ef4444;">적절한 조합을 찾을 수 없습니다.</div>`;
        } else {
            infoHTML += `<div class="combination-result">`;
            combinations.slice(0, 12).forEach(combo => {
                const shutterText = formatShutterSpeed(combo.shutter);
                infoHTML += `
                    <div class="combination-card">
                        <div style="font-weight: 600; margin-bottom: 4px;">f/${combo.aperture}</div>
                        <div style="font-size: 12px; color: #6b7280;">${shutterText}</div>
                    </div>
                `;
            });
            infoHTML += `</div>`;
        }
        
        resultInfo.innerHTML = infoHTML;
        resultContainer.style.display = 'block';
    }
    
    // 단일 결과 표시
    function displaySingleResult(type, value, ev, aperture, shutter, iso) {
        const resultContainer = document.getElementById('result-container');
        const resultValue = document.getElementById('result-value');
        const resultInfo = document.getElementById('result-info');
        
        resultValue.textContent = value;
        
        let infoHTML = `<div class="result-info-item" style="font-size: 14px; color: #374151; margin-bottom: 12px; font-weight: 600;">필요한 ${type}</div>`;
        
        const apertureText = aperture ? `f/${aperture.toFixed(1)}` : '-';
        const shutterText = shutter ? formatShutterSpeed(shutter) : '-';
        
        infoHTML += `<div class="result-info-item" style="font-size: 13px; color: #6b7280;">EV ${ev.toFixed(2)} | ${apertureText} | ${shutterText} | ISO ${iso}</div>`;
        
        resultInfo.innerHTML = infoHTML;
        resultContainer.style.display = 'block';
    }
    
    // 셔터 스피드 포맷팅 (기존 함수 재사용)
    function formatShutterSpeed(seconds) {
        if (seconds < 1) {
            const fraction = 1 / seconds;
            if (Math.abs(fraction - Math.round(fraction)) < 0.001) {
                return `1/${Math.round(fraction)}초`;
            } else {
                return `${seconds.toFixed(3)}초`;
            }
        } else {
            if (Math.abs(seconds - Math.round(seconds)) < 0.001) {
                return `${Math.round(seconds)}초`;
            } else {
                return `${seconds.toFixed(2)}초`;
            }
        }
    }
    
    // 역계산 입력 초기화
    function clearReverseInputs() {
        document.getElementById('reverse-ev').value = '';
        document.getElementById('reverse-iso').value = '';
        document.getElementById('reverse-aperture').value = '';
        document.getElementById('reverse-shutter').value = '';
        document.getElementById('reverse-mode-type').value = '1';
        
        // 세그먼트 탭 초기화
        const tabs = document.querySelectorAll('#reverse-mode .segment-tab');
        tabs.forEach((tab, index) => {
            if (index === 0) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        updateReverseModeUI();
        document.getElementById('result-container').style.display = 'none';
        hideError();
    }
    
    // 조리개 1 stop 조정
    function adjustAperture(stops) {
        const currentValue = getApertureValue();
        if (currentValue === null) {
            showError('먼저 조리개 값을 선택하거나 입력해주세요.');
            return;
        }
        
        // 1 stop = √2 배 (약 1.414)
        const multiplier = Math.pow(Math.sqrt(2), stops);
        const newValue = currentValue * multiplier;
        
        // 가장 가까운 선택지 찾기
        const select = document.getElementById('aperture');
        const options = Array.from(select.options);
        let closestOption = null;
        let minDiff = Infinity;
        
        options.forEach(option => {
            if (option.value && option.value !== 'custom-aperture') {
                const optionValue = parseFloat(option.value);
                const diff = Math.abs(optionValue - newValue);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestOption = option;
                }
            }
        });
        
        // 차이가 작으면 선택지로 설정, 아니면 직접 입력 모드로
        if (minDiff < 0.1 && closestOption) {
            select.value = closestOption.value;
            document.getElementById('custom-aperture-container').style.display = 'none';
        } else {
            select.value = 'custom-aperture';
            document.getElementById('custom-aperture-container').style.display = 'block';
            document.getElementById('custom-aperture').value = newValue.toFixed(1);
        }
        
        // 자동 계산
        if (getShutterSpeedValue() && getISOValue()) {
            calculateEV();
        }
    }
    
    // 셔터 스피드 1 stop 조정
    function adjustShutterSpeed(stops) {
        const currentValue = getShutterSpeedValue();
        if (currentValue === null) {
            showError('먼저 셔터 스피드를 선택하거나 입력해주세요.');
            return;
        }
        
        // 1 stop = 2배 또는 1/2배
        const multiplier = Math.pow(2, stops);
        const newValue = currentValue * multiplier;
        
        // 가장 가까운 선택지 찾기
        const select = document.getElementById('shutter-speed');
        const options = Array.from(select.options);
        let closestOption = null;
        let minDiff = Infinity;
        
        options.forEach(option => {
            if (option.value && option.value !== 'custom-shutter') {
                const optionValue = parseFloat(option.value);
                const diff = Math.abs(optionValue - newValue);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestOption = option;
                }
            }
        });
        
        // 차이가 작으면 선택지로 설정, 아니면 직접 입력 모드로
        const threshold = newValue < 1 ? newValue * 0.1 : 0.1;
        if (minDiff < threshold && closestOption) {
            select.value = closestOption.value;
            document.getElementById('custom-shutter-container').style.display = 'none';
        } else {
            select.value = 'custom-shutter';
            document.getElementById('custom-shutter-container').style.display = 'block';
            document.getElementById('custom-shutter').value = newValue.toFixed(6);
        }
        
        // 자동 계산
        if (getApertureValue() && getISOValue()) {
            calculateEV();
        }
    }
    
    // ISO 1 stop 조정
    function adjustISO(stops) {
        const currentValue = getISOValue();
        if (currentValue === null) {
            showError('먼저 ISO 값을 선택하거나 입력해주세요.');
            return;
        }
        
        // 1 stop = 2배 또는 1/2배
        const multiplier = Math.pow(2, stops);
        const newValue = currentValue * multiplier;
        
        // 가장 가까운 선택지 찾기
        const select = document.getElementById('iso');
        const options = Array.from(select.options);
        let closestOption = null;
        let minDiff = Infinity;
        
        options.forEach(option => {
            if (option.value && option.value !== 'custom-iso') {
                const optionValue = parseFloat(option.value);
                const diff = Math.abs(optionValue - newValue);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestOption = option;
                }
            }
        });
        
        // 차이가 작으면 선택지로 설정, 아니면 직접 입력 모드로
        if (minDiff < newValue * 0.1 && closestOption) {
            select.value = closestOption.value;
            document.getElementById('custom-iso-container').style.display = 'none';
        } else {
            select.value = 'custom-iso';
            document.getElementById('custom-iso-container').style.display = 'block';
            document.getElementById('custom-iso').value = Math.round(newValue);
        }
        
        // 자동 계산
        if (getApertureValue() && getShutterSpeedValue()) {
            calculateEV();
        }
    }
    
    // EV 계산 함수
    function calculateEV() {
        hideError();
        
        // 입력값 검증
        if (!validateInputs()) {
            return;
        }

        // 값 가져오기
        const aperture = getApertureValue();
        const shutterSpeed = getShutterSpeedValue();
        const iso = getISOValue();

        if (aperture === null || shutterSpeed === null || iso === null) {
            showError('모든 값을 입력해주세요.');
            return;
        }

        // EV 계산: EV = log₂(f²/t) - log₂(ISO/100)
        const fSquared = aperture * aperture;
        const fSquaredOverT = fSquared / shutterSpeed;
        const isoOver100 = iso / 100;
        
        const ev = Math.log2(fSquaredOverT) - Math.log2(isoOver100);

        // 결과 표시
        displayResult(ev, aperture, shutterSpeed, iso);
    }

    // 조리개 값 가져오기
    function getApertureValue() {
        const select = document.getElementById('aperture');
        if (select.value === 'custom-aperture') {
            const customInput = document.getElementById('custom-aperture');
            const value = parseFloat(customInput.value);
            if (isNaN(value) || value <= 0) {
                return null;
            }
            return value;
        } else if (select.value) {
            return parseFloat(select.value);
        }
        return null;
    }

    // 셔터 스피드 값 가져오기
    function getShutterSpeedValue() {
        const select = document.getElementById('shutter-speed');
        if (select.value === 'custom-shutter') {
            const customInput = document.getElementById('custom-shutter');
            const value = parseFloat(customInput.value);
            if (isNaN(value) || value <= 0) {
                return null;
            }
            return value;
        } else if (select.value) {
            return parseFloat(select.value);
        }
        return null;
    }

    // ISO 값 가져오기
    function getISOValue() {
        const select = document.getElementById('iso');
        if (select.value === 'custom-iso') {
            const customInput = document.getElementById('custom-iso');
            const value = parseFloat(customInput.value);
            if (isNaN(value) || value <= 0) {
                return null;
            }
            return value;
        } else if (select.value) {
            return parseFloat(select.value);
        }
        return null;
    }

    // 입력값 검증
    function validateInputs() {
        const aperture = getApertureValue();
        const shutterSpeed = getShutterSpeedValue();
        const iso = getISOValue();

        let errors = [];

        if (aperture === null) {
            errors.push('조리개 값을 선택하거나 입력해주세요.');
            document.getElementById('aperture').classList.add('error');
        } else {
            document.getElementById('aperture').classList.remove('error');
        }

        if (shutterSpeed === null) {
            errors.push('셔터 스피드를 선택하거나 입력해주세요.');
            document.getElementById('shutter-speed').classList.add('error');
        } else {
            document.getElementById('shutter-speed').classList.remove('error');
        }

        if (iso === null) {
            errors.push('ISO 값을 선택하거나 입력해주세요.');
            document.getElementById('iso').classList.add('error');
        } else {
            document.getElementById('iso').classList.remove('error');
        }

        if (errors.length > 0) {
            showError(errors.join(' '));
            return false;
        }

        hideError();
        return true;
    }

    // 결과 표시 함수
    function displayResult(ev, aperture, shutterSpeed, iso) {
        // EV 값 표시
        const evRounded = ev.toFixed(2);
        document.getElementById('result-value').textContent = `EV ${evRounded}`;
        
        // 추가 정보 표시
        const infoContainer = document.getElementById('result-info');
        let infoHTML = '';
        
        // 입력값 요약
        const apertureText = document.getElementById('aperture').value === 'custom-aperture' 
            ? `f/${aperture.toFixed(1)}` 
            : `f/${aperture}`;
        
        let shutterText = '';
        if (shutterSpeed < 1) {
            const fraction = 1 / shutterSpeed;
            if (Math.abs(fraction - Math.round(fraction)) < 0.001) {
                shutterText = `1/${Math.round(fraction)}초`;
            } else {
                shutterText = `${shutterSpeed.toFixed(3)}초`;
            }
        } else {
            shutterText = `${shutterSpeed.toFixed(1)}초`;
        }
        
        infoHTML += `<div class="result-info-item" style="font-size: 14px; color: #374151; margin-bottom: 12px; font-weight: 600;">${apertureText} | ${shutterText} | ISO ${iso}</div>`;
        
        infoContainer.innerHTML = infoHTML;
        document.getElementById('result-container').style.display = 'block';
    }

    // 오류 메시지 표시
    function showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        document.getElementById('result-container').style.display = 'none';
    }

    // 오류 메시지 숨기기
    function hideError() {
        document.getElementById('error-message').style.display = 'none';
    }

    // 모든 입력 초기화
    function clearAllInputs() {
        document.getElementById('aperture').value = '';
        document.getElementById('shutter-speed').value = '';
        document.getElementById('iso').value = '';
        
        // 직접 입력 필드 초기화
        const customApertureContainer = document.getElementById('custom-aperture-container');
        const customApertureInput = document.getElementById('custom-aperture');
        customApertureContainer.style.display = 'none';
        customApertureInput.value = '';
        
        const customShutterContainer = document.getElementById('custom-shutter-container');
        const customShutterInput = document.getElementById('custom-shutter');
        customShutterContainer.style.display = 'none';
        customShutterInput.value = '';
        
        const customISOContainer = document.getElementById('custom-iso-container');
        const customISOInput = document.getElementById('custom-iso');
        customISOContainer.style.display = 'none';
        customISOInput.value = '';
        
        // 에러 클래스 제거
        document.getElementById('aperture').classList.remove('error', 'success');
        document.getElementById('shutter-speed').classList.remove('error', 'success');
        document.getElementById('iso').classList.remove('error', 'success');
        
        // 역계산 입력도 초기화
        clearReverseInputs();

        hideError();
        document.getElementById('result-container').style.display = 'none';
    }

    // 직접 입력 필드 표시/숨김 설정
    function setupCustomInputs() {
        // 조리개 직접 입력
        const apertureSelect = document.getElementById('aperture');
        const customApertureContainer = document.getElementById('custom-aperture-container');
        const customApertureInput = document.getElementById('custom-aperture');
        
        apertureSelect.addEventListener('change', function() {
            if (this.value === 'custom-aperture') {
                customApertureContainer.style.display = 'block';
                customApertureInput.focus();
            } else {
                customApertureContainer.style.display = 'none';
                customApertureInput.value = '';
            }
        });
        
        customApertureInput.addEventListener('input', function() {
            if (this.value.trim()) {
                const value = parseFloat(this.value);
                if (!isNaN(value) && value > 0) {
                    this.classList.remove('error');
                    this.classList.add('success');
                } else {
                    this.classList.remove('success');
                    this.classList.add('error');
                }
            }
        });
        
        // 셔터 스피드 직접 입력
        const shutterSelect = document.getElementById('shutter-speed');
        const customShutterContainer = document.getElementById('custom-shutter-container');
        const customShutterInput = document.getElementById('custom-shutter');
        
        shutterSelect.addEventListener('change', function() {
            if (this.value === 'custom-shutter') {
                customShutterContainer.style.display = 'block';
                customShutterInput.focus();
            } else {
                customShutterContainer.style.display = 'none';
                customShutterInput.value = '';
            }
        });
        
        customShutterInput.addEventListener('input', function() {
            if (this.value.trim()) {
                const value = parseFloat(this.value);
                if (!isNaN(value) && value > 0) {
                    this.classList.remove('error');
                    this.classList.add('success');
                } else {
                    this.classList.remove('success');
                    this.classList.add('error');
                }
            }
        });
        
        // ISO 직접 입력
        const isoSelect = document.getElementById('iso');
        const customISOContainer = document.getElementById('custom-iso-container');
        const customISOInput = document.getElementById('custom-iso');
        
        isoSelect.addEventListener('change', function() {
            if (this.value === 'custom-iso') {
                customISOContainer.style.display = 'block';
                customISOInput.focus();
            } else {
                customISOContainer.style.display = 'none';
                customISOInput.value = '';
            }
        });
        
        customISOInput.addEventListener('input', function() {
            if (this.value.trim()) {
                const value = parseFloat(this.value);
                if (!isNaN(value) && value > 0) {
                    this.classList.remove('error');
                    this.classList.add('success');
                } else {
                    this.classList.remove('success');
                    this.classList.add('error');
                }
            }
        });
        
        // 모든 입력 변경 시 자동 계산
        [apertureSelect, shutterSelect, isoSelect, customApertureInput, customShutterInput, customISOInput].forEach(element => {
            element.addEventListener('change', function() {
                if (apertureSelect.value && shutterSelect.value && isoSelect.value) {
                    calculateEV();
                }
            });
        });
    }

    // 페이지 로드 시 초기화
    document.addEventListener('DOMContentLoaded', function() {
        setupCustomInputs();
        updateReverseModeUI();
    });
    