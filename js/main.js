import { TRANSLATIONS } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    // 0. Global Smooth Scroll (Lenis)
    if (window.Lenis) {
        window.lenisInstance = new window.Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true
        });
        function raf(time) {
            window.lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        window.lenisInstance.on('scroll', () => {
            window.dispatchEvent(new Event('scroll'));
        });
    }

    // 0.1 Custom Cursor Glow
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursor.style.opacity = '1';
        });
        document.body.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
    }

    let currentLang = localStorage.getItem('siteLanguage') || 'zh';

    const updateLanguageElements = () => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (TRANSLATIONS[currentLang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = TRANSLATIONS[currentLang][key];
                } else {
                    el.innerHTML = TRANSLATIONS[currentLang][key];
                }
            }
        });
        
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = currentLang === 'zh' ? 'EN' : '中文';
        }

        if (currentLang === 'en') {
            document.body.classList.add('lang-en');
        } else {
            document.body.classList.remove('lang-en');
        }
    };

    const toggleLanguage = () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('siteLanguage', currentLang);
        location.reload();
    };

    window.toggleLanguage = toggleLanguage;

    // 0.2.1 Digital Rain Background
    const initDigitalRain = () => {
        const canvas = document.getElementById('digital-rain-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width, height, columns;
        const fontSize = 14;
        const characters = '01'.split('');
        let drops;

        const setup = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            drops = Array(columns).fill(0);
        };

        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 11, 0.08)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = 'rgba(245, 166, 35, 0.7)';
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, i) => {
                const text = characters[Math.floor(Math.random() * characters.length)];
                const x = i * fontSize;
                ctx.fillText(text, x, y);

                if (y > height + Math.random() * 8000) {
                    drops[i] = 0;
                } else {
                    drops[i] = y + fontSize;
                }
            });
        };

        setup();
        window.addEventListener('resize', setup);
        setInterval(draw, 50);
    };

    // 0.3 Global Components
    const HEADER_HTML = `
    <header id="site-header">
        <nav class="container">
            <div class="logo">
                <a href="./index.html">
                    <img src="./images/logo.png" alt="Parigain" class="nav-logo">
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="./index.html" data-page="index" data-i18n="nav_home">${TRANSLATIONS[currentLang]['nav_home']}</a></li>
                <li><a href="./strategy.html" data-page="strategy" data-i18n="nav_strategy">${TRANSLATIONS[currentLang]['nav_strategy']}</a></li>
                <li><a href="./about.html" data-page="about" data-i18n="nav_about">${TRANSLATIONS[currentLang]['nav_about']}</a></li>
                <li><a href="./contact.html" data-page="contact" class="btn-primary" data-i18n="nav_contact">${TRANSLATIONS[currentLang]['nav_contact']}</a></li>
                <li class="lang-switch-li"><button id="lang-toggle" class="lang-toggle-btn" onclick="toggleLanguage()">${currentLang === 'zh' ? 'EN' : '中文'}</button></li>
            </ul>
            <div class="menu-toggle" id="mobile-menu">
                <span></span>
                <span></span>
            </div>
        </nav>
    </header>`;

    const FOOTER_HTML = `
    <footer id="site-footer">
        <div class="container footer-top">
            <div class="footer-col brand">
                <div class="logo">
                    <img src="./images/logo.png" alt="Parigain" class="footer-logo">
                </div>
                <p data-i18n="footer_desc">${TRANSLATIONS[currentLang]['footer_desc']}</p>
            </div>
            <div class="footer-col links">
                <h4 data-i18n="footer_links">${TRANSLATIONS[currentLang]['footer_links']}</h4>
                <ul>
                    <li><a href="./index.html" data-i18n="nav_home">${TRANSLATIONS[currentLang]['nav_home']}</a></li>
                    <li><a href="./strategy.html" data-i18n="nav_strategy">${TRANSLATIONS[currentLang]['nav_strategy']}</a></li>
                    <li><a href="./about.html" data-i18n="nav_about">${TRANSLATIONS[currentLang]['nav_about']}</a></li>
                    <li><a href="./contact.html" data-i18n="footer_join">${TRANSLATIONS[currentLang]['footer_join']}</a></li>
                </ul>
            </div>
            <div class="footer-col contact">
                <h4 data-i18n="footer_contact">${TRANSLATIONS[currentLang]['footer_contact']}</h4>
                <p data-i18n="footer_email">${TRANSLATIONS[currentLang]['footer_email']}</p>
                <div class="locations">
                    <span data-i18n="footer_location">${TRANSLATIONS[currentLang]['footer_location']}</span>
                </div>
            </div>
        </div>
        <div class="risk-disclosure">
            <div class="container">
                <p data-i18n="footer_risk">${TRANSLATIONS[currentLang]['footer_risk']}</p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p data-i18n="footer_copy">${TRANSLATIONS[currentLang]['footer_copy']}</p>
            </div>
        </div>
    </footer>`;

    const setupMobileMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
            });
            navLinks.querySelectorAll('a, button').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    };

    const injectComponents = () => {
        if (!document.getElementById('site-header')) document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
        if (!document.getElementById('site-footer')) document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

        const path = window.location.pathname;
        const page = path.split("/").pop().replace(".html", "") || "index";
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('data-page') === page) link.classList.add('active');
        });

        setupMobileMenu();

        const header = document.getElementById('site-header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
        }
        updateLanguageElements();
    };

    injectComponents();

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.control-dot');
    const prevBtn = document.querySelector('.arrow-btn.prev');
    const nextBtn = document.querySelector('.arrow-btn.next');
    let currentSlide = 0;
    let sliderInterval;

    const updateSlider = (index) => {
        if (!slides.length) return;
        slides.forEach(slide => {
            if (!slide.style.backgroundImage) {
                const bg = slide.getAttribute('data-bg');
                if (bg) slide.style.backgroundImage = `url(${bg})`;
            }
            slide.classList.remove('active');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => slides.length && updateSlider((currentSlide + 1) % slides.length);
    const prevSlide = () => slides.length && updateSlider((currentSlide - 1 + slides.length) % slides.length);

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    }
    dots.forEach((dot, idx) => dot.addEventListener('click', () => { updateSlider(idx); resetInterval(); }));

    const startInterval = () => slides.length && (sliderInterval = setInterval(nextSlide, 6000));
    const resetInterval = () => { clearInterval(sliderInterval); startInterval(); };
    startInterval();

    // Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    const revealElements = document.querySelectorAll('.stats-flex, .domain-card, .section-header, .partner-logo, .about-section, .strategy-detail-section, .intro-section, .founder-card, .timeline-item, .office-card, .recruitment-flex, .form-container, .process-flow, .info-card, .strategy-detail-box, .detail-item, .chart-container, .advantage-section, .philosophy-section, .scope-section, .honor-card');
    revealElements.forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // Card Glow
    document.querySelectorAll('.domain-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // Back to Top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => backToTopBtn.classList.toggle('show', window.scrollY > 300));
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Modal & Entry
    const COMPLIANCE_HTML = `
    <div id="compliance-modal" class="compliance-overlay">
        <div class="compliance-modal">
            <div class="compliance-header">
                <h3 data-i18n="modal_title">${TRANSLATIONS[currentLang]['modal_title']}</h3>
                <div class="compliance-line"></div>
            </div>
            <div class="compliance-body" data-lenis-prevent>
                <p data-i18n="modal_p1">${TRANSLATIONS[currentLang]['modal_p1']}</p>
                <div class="compliance-section">
                    <strong data-i18n="modal_s1">${TRANSLATIONS[currentLang]['modal_s1']}</strong>
                    <ol>
                        <li data-i18n="modal_l1">${TRANSLATIONS[currentLang]['modal_l1']}</li>
                        <li data-i18n="modal_l2">${TRANSLATIONS[currentLang]['modal_l2']}</li>
                    </ol>
                </div>
                <div class="compliance-section">
                    <strong data-i18n="modal_s2">${TRANSLATIONS[currentLang]['modal_s2']}</strong>
                    <ol>
                        <li data-i18n="modal_l3">${TRANSLATIONS[currentLang]['modal_l3']}</li>
                        <li data-i18n="modal_l4">${TRANSLATIONS[currentLang]['modal_l4']}</li>
                        <li data-i18n="modal_l5">${TRANSLATIONS[currentLang]['modal_l5']}</li>
                        <li data-i18n="modal_l6">${TRANSLATIONS[currentLang]['modal_l6']}</li>
                    </ol>
                </div>
                <p data-i18n="modal_p2">${TRANSLATIONS[currentLang]['modal_p2']}</p>
                <p class="warning-text" data-i18n="modal_warning">${TRANSLATIONS[currentLang]['modal_warning']}</p>
                <p class="copyright-info" data-i18n="modal_copy">${TRANSLATIONS[currentLang]['modal_copy']}</p>
            </div>
            <div class="compliance-footer">
                <button id="confirm-investor" class="btn-main" data-i18n="modal_confirm">${TRANSLATIONS[currentLang]['modal_confirm']}</button>
                <button id="leave-site" class="btn-outline" data-i18n="modal_leave">${TRANSLATIONS[currentLang]['modal_leave']}</button>
            </div>
        </div>
    </div>`;

    const ENTRY_LOADER_HTML = `
    <div id="entry-loader" class="entry-loader">
        <div class="loader-content">
            <div id="decode-text" class="decode-text"></div>
            <div class="loader-logo-wrapper">
                <img id="loader-logo" src="./images/logo.png" alt="Parigain" class="loader-logo">
            </div>
        </div>
        <div class="skip-hint" data-i18n="loader_skip">${TRANSLATIONS[currentLang]['loader_skip']}</div>
    </div>`;

    const runDecode = (targetText) => {
        const decodeEl = document.getElementById('decode-text');
        if (!decodeEl) return;
        let iteration = 0;
        const interval = setInterval(() => {
            decodeEl.innerText = targetText.split("").map((l, i) => i < iteration ? targetText[i] : '01$#@!%&*?'[Math.floor(Math.random() * 10)]).join("");
            if (iteration >= targetText.length) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('entry-loader')?.classList.add('show-logo');
                    setTimeout(() => {
                        const loader = document.getElementById('entry-loader');
                        if (loader) {
                            loader.style.opacity = '0';
                            setTimeout(() => {
                                loader.classList.remove('active');
                                document.body.style.overflow = 'auto';
                                if (window.lenisInstance) window.lenisInstance.start();
                            }, 800);
                        }
                    }, 2000);
                }, 500);
            }
            iteration += 1 / 5;
        }, 30);
    };

    const initCompliance = () => {
        if (sessionStorage.getItem('complianceConfirmed')) {
            initDigitalRain();
            return;
        }
        if (!document.getElementById('compliance-modal')) document.body.insertAdjacentHTML('afterbegin', COMPLIANCE_HTML);
        if (!document.getElementById('entry-loader')) document.body.insertAdjacentHTML('afterbegin', ENTRY_LOADER_HTML);

        const modal = document.getElementById('compliance-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (window.lenisInstance) window.lenisInstance.stop();

        document.getElementById('confirm-investor').addEventListener('click', () => {
            sessionStorage.setItem('complianceConfirmed', 'true');
            modal.classList.remove('active');
            initDigitalRain();
            const loader = document.getElementById('entry-loader');
            if (loader) {
                loader.classList.add('active');
                runDecode("PARIGAIN");
            } else {
                document.body.style.overflow = 'auto';
                if (window.lenisInstance) window.lenisInstance.start();
            }
        });
        document.getElementById('leave-site').addEventListener('click', () => window.location.href = 'https://www.baidu.com');
    };

    const initSectorGrowth = () => {
        const visual = document.querySelector('.chart-visual');
        if (!visual) return;
        const obs = new IntersectionObserver((es) => {
            if (es[0].isIntersecting) { visual.classList.add('animate'); obs.unobserve(visual); }
        }, { threshold: 0.5 });
        obs.observe(visual);
    };

    initCompliance();
    initSectorGrowth();
});
