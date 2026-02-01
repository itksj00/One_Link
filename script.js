let pageFlip;
let currentLang = 'ko';

// translations 변수는 translations.js에서 관리

function translatePage() {
    const lang = document.getElementById('languageSelect').value;
    currentLang = lang;

    document.querySelectorAll('.translatable').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'P') {
                element.innerHTML = translations[lang][key].replace(/\n/g, '<br>');
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

function loadLinksFromConfig() {
    document.querySelectorAll('[data-link]').forEach(link => {
        const path = link.getAttribute('data-link').split('.');
        const section = path[0];
        const key = path[1];
        
        if (linkConfig[section] && linkConfig[section][key]) {
            link.href = linkConfig[section][key];
        }
    });
}

function loadTextFromConfig() {
    document.querySelectorAll('[data-config]').forEach(element => {
        const path = element.getAttribute('data-config').split('.');
        const section = path[0];
        const key = path[1];
        
        if (linkConfig[section] && linkConfig[section][key]) {
            element.textContent = linkConfig[section][key];
        }
    });
    
    // 표지 이름만 별도 설정
    const coverSubtitle = document.getElementById('coverSubtitle');
    if (coverSubtitle && linkConfig.section0 && linkConfig.section0.name) {
        coverSubtitle.textContent = linkConfig.section0.name.replace('(Kurt)', '').trim();
    }
    
    // 이력 하이라이트 로드
    const highlightsContainer = document.getElementById('introHighlights');
    if (highlightsContainer && linkConfig.section0 && linkConfig.section0.highlights) {
        linkConfig.section0.highlights.forEach(highlight => {
            const item = document.createElement('div');
            item.className = 'highlight-item';
            item.textContent = highlight;
            highlightsContainer.appendChild(item);
        });
    }
}

function applyThemeConfig() {
    if (typeof themeConfig === 'undefined') return;
    
    // 표지 스타일 적용
    const coverTitle = document.getElementById('coverTitle');
    const coverSubtitle = document.getElementById('coverSubtitle');
    
    if (coverTitle && themeConfig.cover) {
        coverTitle.style.fontSize = themeConfig.cover.titleFontSize;
        coverTitle.style.color = themeConfig.cover.titleColor;
    }
    
    if (coverSubtitle && themeConfig.cover) {
        coverSubtitle.style.fontSize = themeConfig.cover.subtitleFontSize;
        coverSubtitle.style.color = themeConfig.cover.subtitleColor;
    }
    
    // 인트로 스타일 적용
    const introName = document.getElementById('introName');
    const introTitle = document.getElementById('introTitle');
    const introTagline = document.getElementById('introTagline');
    
    if (introName && themeConfig.intro) {
        introName.style.fontSize = themeConfig.intro.nameFontSize;
        introName.style.color = themeConfig.intro.nameColor;
    }
    
    if (introTitle && themeConfig.intro) {
        introTitle.style.fontSize = themeConfig.intro.titleFontSize;
        introTitle.style.color = themeConfig.intro.titleColor;
    }
    
    if (introTagline && themeConfig.intro) {
        introTagline.style.fontSize = themeConfig.intro.taglineFontSize;
        introTagline.style.color = themeConfig.intro.taglineColor;
    }
    
    // 이력 항목 스타일 적용
    document.querySelectorAll('.highlight-item').forEach(item => {
        if (themeConfig.intro) {
            item.style.fontSize = themeConfig.intro.highlightFontSize;
            item.style.color = themeConfig.intro.highlightColor;
        }
    });
}

function updatePageNumber() {
    const currentPage = pageFlip.getCurrentPageIndex();
    
    // 책이 열렸는지 확인 (첫 페이지가 아니면 열린 것)
    const bookContainer = document.getElementById('bookContainer');
    if (currentPage > 0) {
        bookContainer.classList.remove('book-closed');
        bookContainer.classList.add('book-opened');
    } else {
        bookContainer.classList.remove('book-opened');
        bookContainer.classList.add('book-closed');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLinksFromConfig();
    loadTextFromConfig();
    applyThemeConfig();
    
    // PageFlip 초기화
    const bookElement = document.getElementById('book');
    
    pageFlip = new St.PageFlip(bookElement, {
        width: 400,
        height: 600,
        size: 'stretch',
        minWidth: 300,
        maxWidth: 500,
        minHeight: 400,
        maxHeight: 700,
        showCover: true,
        mobileScrollSupport: false,
        swipeDistance: 30,
        clickEventForward: true,
        usePortrait: true,
        startPage: 0,
        drawShadow: true,
        flippingTime: 800,
        useMouseEvents: true,
        autoSize: true,
        maxShadowOpacity: 0.4,
        showPageCorners: true,
        disableFlipByClick: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    // 드래그 감지 변수
    let isDragging = false;
    let dragStartPage = 0;

    // 이벤트 리스너
    pageFlip.on('flip', (e) => {
        setTimeout(() => {
            updatePageNumber();
        }, 50);
    });

    pageFlip.on('changeOrientation', (e) => {
        updatePageNumber();
    });

    pageFlip.on('changeState', (e) => {
        updatePageNumber();
        
        // 첫 페이지(표지) 이후에는 드래그 방지
        const currentPage = pageFlip.getCurrentPageIndex();
        if (currentPage > 0 && e.data === 'user_fold') {
            // 사용자가 드래그를 시작하려 할 때
            if (!isDragging && dragStartPage > 0) {
                // 첫 페이지가 아니면 드래그 차단
                e.preventDefault?.();
            }
        }
    });

    // 마우스 다운 이벤트로 드래그 시작 감지
    bookElement.addEventListener('mousedown', (e) => {
        dragStartPage = pageFlip.getCurrentPageIndex();
        isDragging = false;
    });

    bookElement.addEventListener('mousemove', (e) => {
        if (dragStartPage > 0) {
            isDragging = true;
            // 첫 페이지 이후에는 드래그 중단
            e.stopPropagation();
            e.preventDefault();
        }
    });

    bookElement.addEventListener('mouseup', (e) => {
        isDragging = false;
    });

    // 초기 상태 업데이트
    setTimeout(() => {
        updatePageNumber();
    }, 100);

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            pageFlip.flipPrev();
        } else if (e.key === 'ArrowRight') {
            pageFlip.flipNext();
        }
    });
});