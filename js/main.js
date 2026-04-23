import { TRANSLATIONS } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
    const COMPLIANCE_VERSION = '2026-04-21-v2';
    const COMPLIANCE_STORAGE_KEY = 'complianceConfirmedVersion';

    const HTML_TRANSLATION_KEYS = new Set([
        'footer_email',
        'footer_copy',
        'modal_l2',
        'hero_s1_title',
        'hero_s2_title',
        'hero_s3_title',
        'hero_s4_title',
        'abt_hero_title',
        'str_hero_title',
        'con_hero_title',
        'rec_hero_title'
    ]);

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

    const isComplianceConfirmed = () => localStorage.getItem(COMPLIANCE_STORAGE_KEY) === COMPLIANCE_VERSION;

    const updateLanguageElements = () => {
        document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = TRANSLATIONS[currentLang][key];
            if (translation) {
                if (el.tagName === 'TITLE') {
                    document.title = translation;
                } else if (el.tagName === 'META') {
                    el.setAttribute('content', translation);
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else if (el.tagName === 'IMG') {
                    el.alt = translation;
                } else if (HTML_TRANSLATION_KEYS.has(key)) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
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

    // 0.2 Global Components
    const HEADER_HTML = `
    <header id="site-header">
        <nav class="container">
            <div class="logo">
                <a href="./index.html">
                    <img src="./images/logo.png" alt="Parigain Logo" data-i18n="alt_logo" class="nav-logo">
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="./index.html" data-page="index" data-i18n="nav_home">${TRANSLATIONS[currentLang]['nav_home']}</a></li>
                <li><a href="./strategy.html" data-page="strategy" data-i18n="nav_strategy">${TRANSLATIONS[currentLang]['nav_strategy']}</a></li>
                <li><a href="./about.html" data-page="about" data-i18n="nav_about">${TRANSLATIONS[currentLang]['nav_about']}</a></li>
                <li><a href="./careers.html" data-page="careers" data-i18n="nav_careers">${TRANSLATIONS[currentLang]['nav_careers']}</a></li>
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
                    <img src="./images/logo.png" alt="Parigain Logo" data-i18n="alt_logo" class="footer-logo">
                </div>
                <p data-i18n="footer_desc">${TRANSLATIONS[currentLang]['footer_desc']}</p>
            </div>
            <div class="footer-col links">
                <h4 data-i18n="footer_links">${TRANSLATIONS[currentLang]['footer_links']}</h4>
                <ul>
                    <li><a href="./index.html" data-i18n="nav_home">${TRANSLATIONS[currentLang]['nav_home']}</a></li>
                    <li><a href="./strategy.html" data-i18n="nav_strategy">${TRANSLATIONS[currentLang]['nav_strategy']}</a></li>
                    <li><a href="./about.html" data-i18n="nav_about">${TRANSLATIONS[currentLang]['nav_about']}</a></li>
                    <li><a href="./careers.html" data-i18n="nav_careers">${TRANSLATIONS[currentLang]['nav_careers']}</a></li>
                    <li><a href="./contact.html" data-i18n="nav_contact">${TRANSLATIONS[currentLang]['nav_contact']}</a></li>
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
        <div class="risk-disclosure" id="risk-disclosure">
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

    const COMPLIANCE_HTML = `
    <div id="compliance-modal" class="compliance-overlay" role="dialog" aria-modal="true" aria-labelledby="compliance-title">
        <div class="compliance-modal">
            <div class="compliance-header">
                <span class="compliance-kicker" data-i18n="modal_kicker">Investor Access</span>
                <h3 id="compliance-title" data-i18n="modal_title">合格投资者认定</h3>
                <p class="compliance-summary" data-i18n="modal_summary">本网站仅面向合格投资者。请确认您符合相关认定标准，并已了解私募基金投资风险。</p>
                <div class="compliance-quick-facts">
                    <span data-i18n="modal_fact_private">私募基金</span>
                    <span data-i18n="modal_fact_qualified">合格投资者准入</span>
                    <span data-i18n="modal_fact_risk">投资有风险</span>
                </div>
            </div>
            <div class="compliance-body" data-lenis-prevent>
                <details class="compliance-section" open>
                    <summary data-i18n="modal_detail_qualification">合格投资者标准</summary>
                    <p data-i18n="modal_p1">在继续浏览本公司网站前，请您确认您或您所代表的机构是一名“合格投资者”。“合格投资者”指根据任何国家和地区的证券和投资法规所规定的有资格投资于私募证券投资基金的专业投资者。例如根据我国《私募投资基金监督管理暂行办法》的规定，合格投资者的标准如下：</p>
                    <strong data-i18n="modal_s1">一、具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元且符合下列相关标准的单位和个人：</strong>
                    <ol>
                        <li data-i18n="modal_l1">净资产不低于1000万元的单位；</li>
                        <li data-i18n="modal_l2">金融资产不低于300万元或者最近三年个人年均收入不低于50万元的个人。<br><small>(前款所称金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等。)</small></li>
                    </ol>
                </details>
                <details class="compliance-section">
                    <summary data-i18n="modal_detail_deemed">视为合格投资者的情形</summary>
                    <strong data-i18n="modal_s2">二、下列投资者视为合格投资者：</strong>
                    <ol>
                        <li data-i18n="modal_l3">社会保障基金、企业年金等养老基金、慈善基金等社会公益基金；</li>
                        <li data-i18n="modal_l4">依法设立并在基金业协会备案的投资计划；</li>
                        <li data-i18n="modal_l5">投资于所管理私募基金的私募基金管理人及其从业人员；</li>
                        <li data-i18n="modal_l6">中国证监会规定的其他投资者。</li>
                    </ol>
                </details>
                <details class="compliance-section">
                    <summary data-i18n="modal_detail_terms">访问声明</summary>
                    <p data-i18n="modal_p2">如果您继续访问或使用本网站及其所载资料，即表明您声明及保证您或您所代表的机构为“合格投资者”，并将遵守对您适用的司法区域的有关法律及法规，同意并接受以下条款及相关约束。如果您不符合“合格投资者”标准或不同意下列条款及相关约束，请勿继续访问或使用本网站及其所载信息及资料。</p>
                </details>
                <details class="compliance-section warning-section" open>
                    <summary data-i18n="modal_detail_risk">风险提示</summary>
                    <p class="warning-text" data-i18n="modal_warning">投资涉及风险，投资者应详细审阅产品的发售文件以获取进一步资料，了解有关投资所涉及的风险因素，并寻求适当的专业投资和咨询意见。产品净值及其收益存在涨跌可能，过往的产品业绩数据并不预示产品未来的业绩表现。本网站所提供的资料并非投资建议或咨询意见，投资者不应依赖本网站所提供的信息及资料作出投资决策。</p>
                </details>
                <details class="compliance-section">
                    <summary data-i18n="modal_detail_ip">知识产权声明</summary>
                    <p class="copyright-info" data-i18n="modal_copy">与本网站所载信息及资料有关的所有版权、专利权、知识产权及其他产权均为本公司所有。本公司概不向浏览该资料人士发出、转让或以任何方式转移任何种类的权利。</p>
                </details>
            </div>
            <div class="compliance-footer">
                <button id="confirm-investor" class="btn-main" data-i18n="modal_confirm">确认，我是合格投资者</button>
                <button id="leave-site" class="btn-outline" data-i18n="modal_leave">不符合条件，离开</button>
            </div>
        </div>
    </div>

    <div id="entry-loader" class="entry-loader">
        <div class="loader-content">
            <div id="decode-text" class="decode-text"></div>
            <div class="loader-logo-wrapper">
                <img id="loader-logo" src="./images/logo.png" alt="Parigain Logo" data-i18n="alt_logo" class="loader-logo">
            </div>
        </div>
        <div class="skip-hint" data-i18n="loader_skip">Scroll to skip</div>
    </div>`;

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
        if (document.body.classList.contains('compliance-pending') && !isComplianceConfirmed() && !document.getElementById('compliance-modal')) {
            document.body.insertAdjacentHTML('beforeend', COMPLIANCE_HTML);
        }

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
            if (!slide.style.backgroundImage && slide.hasAttribute('data-bg')) {
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
    updateSlider(0);
    startInterval();

    const initHomeBackgroundTransition = () => {
        const hero = document.querySelector('.home-brand-hero');
        const fixedBg = document.querySelector('.home-scroll-bg');
        if (!hero || !fixedBg) return;

        const updateHomeBgProgress = () => {
            const scrollTop = window.scrollY || window.pageYOffset || 0;
            const transitionDistance = Math.max(hero.offsetHeight * 0.85, 1);
            const progress = Math.min(Math.max(scrollTop / transitionDistance, 0), 1);
            document.documentElement.style.setProperty('--home-bg-progress', progress.toFixed(4));
        };

        updateHomeBgProgress();
        window.addEventListener('scroll', updateHomeBgProgress, { passive: true });
        window.addEventListener('resize', updateHomeBgProgress);
    };

    // Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    const revealElements = document.querySelectorAll('.reveal-item, .stats-flex, .domain-card, .section-header, .partner-category-card, .founder-card, .timeline-item, .office-card, .recruitment-flex, .form-container, .process-flow, .info-card, .strategy-detail-box, .detail-item, .chart-container, .honor-card, .job-card, .careers-hero, .image-copy-panel, .home-honors-media, .home-honors-list, .advantage-card, .milestone, .team-photo, .team-copy, .career-value-card, .office-life-strip, .recruit-system-panel, .contact-info-card');
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

    const skipHint = document.querySelector('.skip-hint');
    if (skipHint) skipHint.setAttribute('data-i18n', 'loader_skip');

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
        const modal = document.getElementById('compliance-modal');
        const loader = document.getElementById('entry-loader');

        if (!document.body.classList.contains('compliance-pending')) return;

        if (isComplianceConfirmed()) {
            document.body.classList.remove('compliance-pending');
            return;
        }

        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (window.lenisInstance) window.lenisInstance.stop();

            document.getElementById('confirm-investor')?.addEventListener('click', () => {
                localStorage.setItem(COMPLIANCE_STORAGE_KEY, COMPLIANCE_VERSION);
                modal.classList.remove('active');
                document.body.classList.remove('compliance-pending');
                if (loader) {
                    loader.classList.add('active');
                    runDecode("PARIGAIN");
                } else {
                    document.body.style.overflow = 'auto';
                    if (window.lenisInstance) window.lenisInstance.start();
                }
            });
            document.getElementById('leave-site')?.addEventListener('click', () => {
                if (window.history.length > 1) {
                    window.history.back();
                    return;
                }

                window.location.href = 'about:blank';
            });
        }
    };

    const initSectorGrowth = () => {
        const visual = document.querySelector('.chart-visual');
        if (!visual) return;
        const obs = new IntersectionObserver((es) => {
            if (es[0].isIntersecting) { visual.classList.add('animate'); obs.unobserve(visual); }
        }, { threshold: 0.5 });
        obs.observe(visual);
    };

    const initOfficeMaps = () => {
        if (typeof AMap === 'undefined') return;

        const offices = [
            {
                id: 'map-sz',
                center: [113.9456, 22.5312],
                name: '均成基金 · 研发与投研中心',
                addr: '深圳市南山区高新南九道39号湾区创新大厦B座3003房'
            },
            {
                id: 'map-hq',
                center: [113.541438, 22.138865],
                name: '均成基金 · 合规与业务中心',
                addr: '横琴粤澳深度合作区琴朗道91号1911办公区'
            }
        ];

        offices.forEach(office => {
            const container = document.getElementById(office.id);
            if (!container) return;

            const map = new AMap.Map(office.id, {
                zoom: 15,
                center: office.center,
                mapStyle: 'amap://styles/normal',
                dragEnable: false,
                zoomEnable: false,
                touchZoom: false
            });

            // Original Emoji Style (Round Pushpin)
            const markerContent = `
                <div class="custom-marker">
                    <div class="marker-emoji">📍</div>
                    <span class="marker-label">办公地址</span>
                </div>
            `;

            const marker = new AMap.Marker({
                position: office.center,
                content: markerContent,
                offset: new AMap.Pixel(-16, -30), // Align emoji pin tip
                map: map
            });

            const navigate = () => {
                const url = `https://uri.amap.com/marker?position=${office.center[0]},${office.center[1]}&name=${encodeURIComponent(office.name)}&src=jcweb&coordinate=gaode&callnative=1`;
                window.open(url, '_blank');
            };

            // Click anywhere on the map container to navigate
            container.addEventListener('click', navigate);
        });
    };

    initCompliance();
    initHomeBackgroundTransition();
    initSectorGrowth();
    initOfficeMaps();
});
