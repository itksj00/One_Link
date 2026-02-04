(function () {
    let pageFlip;
    let currentLang = 'ko';
    let translatableElements = [];
    let linkElements = [];
    let textElements = [];
    let emailExpanded = false;

    function cacheElements() {
        translatableElements = document.querySelectorAll('.translatable');
        linkElements = document.querySelectorAll('[data-link]');
        textElements = document.querySelectorAll('[data-config]');
    }

    function copyEmail(event) {
        event.stopPropagation();
        const emailText = linkConfig.section1.email.replace('mailto:', '');
        
        navigator.clipboard.writeText(emailText).then(() => {
            const btn = event.target;
            const originalText = btn.textContent;
            const copiedText = translations[currentLang]['copied'] || 'Copied!';
            
            btn.textContent = copiedText;
            btn.style.background = '#6b8e23';
            
            requestAnimationFrame(() => {
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                    });
                }, 2000);
            });
        }).catch(err => {
            console.error('복사 실패:', err);
            alert('이메일 복사에 실패했습니다.');
        });
    }

    function translatePage() {
        const lang = document.getElementById('languageSelect').value;
        currentLang = lang;
        document.documentElement.lang = lang;

        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang]?.[key]) {
                if (el.tagName === 'P') {
                    el.innerHTML = translations[lang][key].replace(/\n/g, '<br>');
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.textContent = translations[lang]['copy'] || 'Copy';
        }
    }

    function loadConfigData() {
        linkElements.forEach(el => {
            const path = el.getAttribute('data-link')?.split('.');
            if (path?.length === 2) {
                const [section, key] = path;
                el.href = linkConfig[section]?.[key] || '#';
            }
        });

        textElements.forEach(el => {
            const path = el.getAttribute('data-config')?.split('.');
            if (path?.length === 2) {
                const [section, key] = path;
                if (linkConfig[section]?.[key]) {
                    el.textContent = linkConfig[section][key];
                }
            }
        });

        const coverSubtitle = document.getElementById('coverSubtitle');
        if (coverSubtitle && linkConfig.section0?.name) {
            coverSubtitle.textContent = linkConfig.section0.name.replace('(Kurt)', '').trim();
        }

        const highlightsContainer = document.getElementById('introHighlights');
        if (highlightsContainer && linkConfig.section0?.highlights) {
            linkConfig.section0.highlights.forEach(text => {
                const item = document.createElement('div');
                item.className = 'highlight-item';
                item.textContent = text;
                highlightsContainer.appendChild(item);
            });
        }
    }

    function applyThemeConfig() {
        if (typeof themeConfig === 'undefined') return;

        const apply = (id, prop, value) => {
            const el = document.getElementById(id);
            if (el && value) el.style[prop] = value;
        };

        apply('coverTitle', 'fontSize', themeConfig.cover?.titleFontSize);
        apply('coverTitle', 'color', themeConfig.cover?.titleColor);
        apply('coverSubtitle', 'fontSize', themeConfig.cover?.subtitleFontSize);
        apply('coverSubtitle', 'color', themeConfig.cover?.subtitleColor);

        apply('introName', 'fontSize', themeConfig.intro?.nameFontSize);
        apply('introName', 'color', themeConfig.intro?.nameColor);
        apply('introTitle', 'fontSize', themeConfig.intro?.titleFontSize);
        apply('introTitle', 'color', themeConfig.intro?.titleColor);
        apply('introTagline', 'fontSize', themeConfig.intro?.taglineFontSize);
        apply('introTagline', 'color', themeConfig.intro?.taglineColor);

        document.querySelectorAll('.highlight-item').forEach(item => {
            if (themeConfig.intro?.highlightFontSize) item.style.fontSize = themeConfig.intro.highlightFontSize;
            if (themeConfig.intro?.highlightColor) item.style.color = themeConfig.intro.highlightColor;
        });
    }

    function updatePageNumber() {
        if (!pageFlip) return;
        const current = pageFlip.getCurrentPageIndex();
        const container = document.getElementById('bookContainer');
        container.classList.toggle('book-closed', current <= 0);
        container.classList.toggle('book-opened', current > 0);
    }

    function handleEmailInteraction(e) {
        const btn = document.getElementById('emailContactBtn');
        if (!btn) return;

        const isInside = e.target.closest('#emailContactBtn') || e.target === btn;

        if (isInside) {
            e.stopPropagation();

            if (!emailExpanded) {
                const contactText = btn.querySelector('.contact-text');
                if (contactText) contactText.style.display = 'none';

                const email = linkConfig.section1.email.replace('mailto:', '');
                const copyTxt = translations[currentLang]['copy'] || 'Copy';

                const div = document.createElement('div');
                div.className = 'email-display';
                div.innerHTML = `
                    <span class="email-text">${email}</span>
                    <button class="copy-btn" type="button">${copyTxt}</button>
                `;
                btn.appendChild(div);
                emailExpanded = true;
                btn.setAttribute('aria-expanded', 'true');
            }
        } else if (emailExpanded) {
            const display = btn.querySelector('.email-display');
            if (display) display.remove();
            const contactText = btn.querySelector('.contact-text');
            if (contactText) contactText.style.display = 'block';
            emailExpanded = false;
            btn.setAttribute('aria-expanded', 'false');
        }
    }

    document.addEventListener('click', handleEmailInteraction);
    document.getElementById('emailContactBtn')?.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEmailInteraction(e);
        }
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('copy-btn')) {
            copyEmail(e);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        cacheElements();
        loadConfigData();
        applyThemeConfig();

        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail && linkConfig.section1?.email) {
            contactEmail.textContent = linkConfig.section1.email.replace('mailto:', '');
        }

        const langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            currentLang = langSelect.value;
            translatePage();
            langSelect.addEventListener('change', translatePage);
        }

        pageFlip = new St.PageFlip(document.getElementById('book'), {
            width: 400,
            height: 600,
            size: 'stretch',
            minWidth: 300,
            maxWidth: 500,
            minHeight: 400,
            maxHeight: 700,
            showCover: true,
            mobileScrollSupport: false,
            usePortrait: true,
            drawShadow: true,
            flippingTime: 800,
            maxShadowOpacity: 0.4,
            showPageCorners: true
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        pageFlip.on('flip', updatePageNumber);
        pageFlip.on('changeOrientation', updatePageNumber);
        pageFlip.on('changeState', updatePageNumber);

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') pageFlip.flipPrev();
            if (e.key === 'ArrowRight') pageFlip.flipNext();
        });

        setTimeout(updatePageNumber, 100);
    });
})();