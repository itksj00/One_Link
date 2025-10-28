// ==========================================
// Personal Link Hub - JavaScript
// ==========================================

let currentSlide = 0;
const totalSlides = 4;
let touchStartX = 0;
let touchEndX = 0;
let currentLang = 'ko';
let isAnimating = false;

// Translation data
const translations = {
    en: {
        // Slide 1
        'connect-title': 'Social Links / Introduction',
        'connect-desc': 'You can check my activities through the following links.',
        'linkedin': 'LinkedIn',
        'github': 'GitHub',
        'twitter': 'Twitter',
        'email': 'Email',
        
        // Slide 2
        'resume-title': 'Resume / Career Introduction',
        'resume-desc': 'Let me introduce my career and the path I have walked.',
        'view-resume': 'View Resume',
        'experience': 'Experience',
        'skills': 'Skills',
        'download-cv': 'Download CV',
        
        // Slide 3
        'portfolio-title': 'Portfolio / Projects',
        'portfolio-desc': 'I have collected the projects and works I have done. There are also various projects that realized ideas.',
        'portfolio': 'Portfolio',
        'project1': 'Project 1',
        'project2': 'Project 2',
        'website': 'Website',
        
        // Slide 4
        'personal-title': 'Hobbies / Personal Story',
        'personal-desc': 'I captured small joys in everyday life and my stories. I introduce myself more through hobbies and experiences.',
        'hobbies': 'Hobbies',
        'my-story': 'My Story',
        'adventures': 'Adventures',
        'photography': 'Photography',
        
        // Footer
        'quote': 'The highest of all studies is to know yourself.',
        'quote-author': '— Plato'
    },
    ko: {
        // Slide 1
        'connect-title': '소셜 링크 / 소개',
        'connect-desc': '다음 링크에서 제 활동을 확인하실 수 있습니다.',
        'linkedin': '링크드인',
        'github': '깃허브',
        'twitter': '트위터',
        'email': '이메일',
        
        // Slide 2
        'resume-title': '이력서 / 경력 소개',
        'resume-desc': '제 경력과 걸어온 길에 대해 소개드립니다.',
        'view-resume': '이력서 보기',
        'experience': '경력',
        'skills': '스킬',
        'download-cv': 'CV 다운로드',
        
        // Slide 3
        'portfolio-title': '포트폴리오 / 프로젝트',
        'portfolio-desc': '제가 진행한 프로젝트와 작업물을 모아두었습니다. 추가로 아이디어를 실현한 다양한 프로젝트들도 존재합니다.',
        'portfolio': '포트폴리오',
        'project1': '프로젝트 1',
        'project2': '프로젝트 2',
        'website': '웹사이트',
        
        // Slide 4
        'personal-title': '취미 / 개인 이야기',
        'personal-desc': '일상 속 작은 즐거움과 저의 이야기를 담았습니다. 취미와 경험을 통해 저를 더 소개합니다.',
        'hobbies': '취미',
        'my-story': '나의 이야기',
        'adventures': '모험',
        'photography': '사진',
        
        // Footer
        'quote': '모든 학문 중 가장 높은 것은 자기 자신을 아는 것이다.',
        'quote-author': '— 플라톤'
    },
    de: {
        // Slide 1
        'connect-title': 'Soziale Links / Einführung',
        'connect-desc': 'Sie können meine Aktivitäten über die folgenden Links verfolgen.',
        'linkedin': 'LinkedIn',
        'github': 'GitHub',
        'twitter': 'Twitter',
        'email': 'E-Mail',
        
        // Slide 2
        'resume-title': 'Lebenslauf / Karrierevorstellung',
        'resume-desc': 'Lassen Sie mich meine Karriere und meinen Werdegang vorstellen.',
        'view-resume': 'Lebenslauf ansehen',
        'experience': 'Erfahrung',
        'skills': 'Fähigkeiten',
        'download-cv': 'CV herunterladen',
        
        // Slide 3
        'portfolio-title': 'Portfolio / Projekte',
        'portfolio-desc': 'Ich habe die Projekte und Arbeiten gesammelt, die ich durchgeführt habe. Es gibt auch verschiedene Projekte, die Ideen verwirklicht haben.',
        'portfolio': 'Portfolio',
        'project1': 'Projekt 1',
        'project2': 'Projekt 2',
        'website': 'Webseite',
        
        // Slide 4
        'personal-title': 'Hobbys / Persönliche Geschichte',
        'personal-desc': 'Ich habe kleine Freuden im Alltag und meine Geschichten festgehalten. Ich stelle mich durch Hobbys und Erfahrungen vor.',
        'hobbies': 'Hobbys',
        'my-story': 'Meine Geschichte',
        'adventures': 'Abenteuer',
        'photography': 'Fotografie',
        
        // Footer
        'quote': 'Das höchste aller Studien ist, sich selbst zu kennen.',
        'quote-author': '— Platon'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    loadLinksFromConfig();
    loadQuotes(currentLang);
    updateSlides('forward');
    createDots();
}

function setupEventListeners() {
    // Touch events for mobile swipe
    const slides = document.getElementById('slides');
    slides.addEventListener('touchstart', handleTouchStart);
    slides.addEventListener('touchend', handleTouchEnd);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
}

// Create navigation dots
function createDots() {
    const dotsContainer = document.getElementById('dotsContainer');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Update slides with animation
function updateSlides(direction = 'forward') {
    if (isAnimating) return;
    isAnimating = true;

    const allSlides = document.querySelectorAll('.slide');
    
    // Remove all animation classes first
    allSlides.forEach(slide => {
        slide.classList.remove('flipping-out', 'flipping-in', 'flipping-out-reverse', 'flipping-in-reverse');
    });

    // Hide all slides
    allSlides.forEach((slide, index) => {
        slide.style.display = index === currentSlide ? 'flex' : 'none';
    });

    // Add flip animation class based on direction
    if (direction === 'forward') {
        allSlides[currentSlide].classList.add('flipping-in');
    } else {
        allSlides[currentSlide].classList.add('flipping-in-reverse');
    }
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Reset animation flag after animation completes
    setTimeout(() => {
        isAnimating = false;
        allSlides.forEach(slide => {
            slide.classList.remove('flipping-out', 'flipping-in', 'flipping-out-reverse', 'flipping-in-reverse');
        });
    }, 800);
}

function nextSlide() {
    if (isAnimating) return;
    const previousSlide = currentSlide;
    currentSlide = (currentSlide + 1) % totalSlides;
    
    const allSlides = document.querySelectorAll('.slide');
    allSlides[previousSlide].classList.add('flipping-out');
    
    setTimeout(() => {
        updateSlides('forward');
    }, 50);
}

function previousSlide() {
    if (isAnimating) return;
    const previousSlide = currentSlide;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    
    const allSlides = document.querySelectorAll('.slide');
    allSlides[previousSlide].classList.add('flipping-out-reverse');
    
    setTimeout(() => {
        updateSlides('backward');
    }, 50);
}

function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;
    const direction = index > currentSlide ? 'forward' : 'backward';
    const previousSlide = currentSlide;
    currentSlide = index;
    
    const allSlides = document.querySelectorAll('.slide');
    if (direction === 'forward') {
        allSlides[previousSlide].classList.add('flipping-out');
    } else {
        allSlides[previousSlide].classList.add('flipping-out-reverse');
    }
    
    setTimeout(() => {
        updateSlides(direction);
    }, 50);
}

// Translation functions
function translatePage() {
    const lang = document.getElementById('languageSelect').value;
    currentLang = lang;
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update quotes
    loadQuotes(lang);
}

function loadQuotes(lang) {
    document.querySelectorAll('[data-quote]').forEach(element => {
        const key = element.getAttribute('data-quote');
        const [page, type] = key.split('-');
        
        if (quotesConfig[page] && quotesConfig[page][lang]) {
            if (type === 'text') {
                element.textContent = quotesConfig[page][lang].text;
            } else if (type === 'author') {
                element.textContent = quotesConfig[page][lang].author;
            }
        }
    });
}

// Load URLs from config file
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

// Touch/swipe support for mobile
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        nextSlide();
    }
    if (touchEndX - touchStartX > 50) {
        previousSlide();
    }
}

// Keyboard navigation
function handleKeyPress(e) {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
}