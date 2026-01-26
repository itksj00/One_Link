let pageFlip;
let currentLang = 'ko';

const translations = {
    ko: {
        'intro-name': 'Kurt',
        'intro-title': 'IT 시스템 엔지니어',
        'intro-tagline': 'Linux lover | 시스템 아키텍처 설계 | 클라우드 인프라 전문가',
        'connect-title': '소셜 링크 / 소개',
        'connect-desc': '다음 링크에서 제 활동을 확인하실 수 있습니다.',
        'linkedin': '링크드인',
        'github': '깃허브',
        'twitter': '트위터',
        'email': '이메일',
        'resume-title': '이력서 / 경력 소개',
        'resume-desc': '제 경력과 걸어온 길에 대해 소개드립니다.',
        'view-resume': '이력서 보기',
        'experience': '경력',
        'skills': '스킬',
        'download-cv': 'CV 다운로드',
        'portfolio-title': '포트폴리오 / 프로젝트',
        'portfolio-desc': '제가 진행한 프로젝트와 작업물을 모아두었습니다.\n추가로 아이디어를 실현한 다양한 프로젝트들도 존재합니다.',
        'portfolio': '포트폴리오',
        'project1': '프로젝트 1',
        'project2': '프로젝트 2',
        'website': '웹사이트',
        'personal-title': '취미 / 개인 이야기',
        'personal-desc': '일상 속 작은 즐거움과 저의 이야기를 담았습니다.\n취미와 경험을 통해 저를 더 소개합니다.',
        'hobbies': '취미',
        'my-story': '나의 이야기',
        'adventures': '모험',
        'photography': '사진'
    },
    en: {
        'intro-name': 'Kurt',
        'intro-title': 'IT System Engineer',
        'intro-tagline': 'Linux lover | System Architecture Design | Cloud Infrastructure Expert',
        'connect-title': 'Connect / Social',
        'connect-desc': 'Find me on these platforms and get in touch.',
        'linkedin': 'LinkedIn',
        'github': 'GitHub',
        'twitter': 'Twitter',
        'email': 'Email',
        'resume-title': 'Resume / Career',
        'resume-desc': 'Explore my professional journey and experience.',
        'view-resume': 'View Resume',
        'experience': 'Experience',
        'skills': 'Skills',
        'download-cv': 'Download CV',
        'portfolio-title': 'Portfolio / Projects',
        'portfolio-desc': 'A collection of my work and projects.\nVarious projects where I brought ideas to life.',
        'portfolio': 'Portfolio',
        'project1': 'Project 1',
        'project2': 'Project 2',
        'website': 'Website',
        'personal-title': 'Hobbies / Personal',
        'personal-desc': 'Small joys in daily life and my personal story.\nGet to know me better through my hobbies and experiences.',
        'hobbies': 'Hobbies',
        'my-story': 'My Story',
        'adventures': 'Adventures',
        'photography': 'Photography'
    },
    de: {
        'intro-name': 'Kurt',
        'intro-title': 'IT-Systemingenieur',
        'intro-tagline': 'Linux-Liebhaber | Systemarchitektur-Design | Cloud-Infrastruktur-Experte',
        'connect-title': 'Verbinden / Sozial',
        'connect-desc': 'Finden Sie mich auf diesen Plattformen und kontaktieren Sie mich.',
        'linkedin': 'LinkedIn',
        'github': 'GitHub',
        'twitter': 'Twitter',
        'email': 'E-Mail',
        'resume-title': 'Lebenslauf / Karriere',
        'resume-desc': 'Erkunden Sie meine berufliche Laufbahn und Erfahrung.',
        'view-resume': 'Lebenslauf ansehen',
        'experience': 'Erfahrung',
        'skills': 'Fähigkeiten',
        'download-cv': 'CV herunterladen',
        'portfolio-title': 'Portfolio / Projekte',
        'portfolio-desc': 'Eine Sammlung meiner Arbeiten und Projekte.\nVerschiedene Projekte, bei denen ich Ideen zum Leben erweckt habe.',
        'portfolio': 'Portfolio',
        'project1': 'Projekt 1',
        'project2': 'Projekt 2',
        'website': 'Webseite',
        'personal-title': 'Hobbys / Persönlich',
        'personal-desc': 'Kleine Freuden im täglichen Leben und meine persönliche Geschichte.\nLernen Sie mich besser kennen durch meine Hobbys und Erfahrungen.',
        'hobbies': 'Hobbys',
        'my-story': 'Meine Geschichte',
        'adventures': 'Abenteuer',
        'photography': 'Fotografie'
    }
};

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
        flippingTime: 1000,
        useMouseEvents: true,
        autoSize: true,
        maxShadowOpacity: 0.5,
        showPageCorners: true,
        disableFlipByClick: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

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