import { AWARDS_BY_YEAR } from './awards.js';

document.addEventListener('DOMContentLoaded', () => {
    const COMPLIANCE_VERSION = '2026-04-21-v2';
    const COMPLIANCE_STORAGE_KEY = 'complianceConfirmedVersion';

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

        let isDispatchingLenisScroll = false;
        window.lenisInstance.on('scroll', () => {
            if (isDispatchingLenisScroll) return;
            isDispatchingLenisScroll = true;
            window.dispatchEvent(new Event('scroll'));
            isDispatchingLenisScroll = false;
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

    const isComplianceConfirmed = () => localStorage.getItem(COMPLIANCE_STORAGE_KEY) === COMPLIANCE_VERSION;

    // 0.2 Global Components
    const HEADER_HTML = `
    <header id="site-header">
        <nav class="container">
            <div class="logo">
                <a href="./index.html">
                    <img src="./images/logo.png" alt="均成基金 LOGO" class="nav-logo">
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="./index.html" data-page="index">官网首页</a></li>
                <li><a href="./strategy.html" data-page="strategy">产品服务</a></li>
                <li><a href="./about.html" data-page="about">关于均成</a></li>
                <li><a href="./careers.html" data-page="careers">加入我们</a></li>
                <li><a href="./contact.html" data-page="contact">联系我们</a></li>
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
                    <img src="./images/logo.png" alt="均成基金 LOGO" class="footer-logo">
                </div>
                <p>坚持投资者优先的国内量化 CTA 策略先行者</p>
                <div class="footer-qr">
                    <img src="./images/connect-code.png" alt="均成基金二维码" loading="lazy" decoding="async">
                    <span>关注均成基金</span>
                </div>
            </div>
            <div class="footer-col links">
                <h4>快速链接</h4>
                <ul>
                    <li><a href="./index.html">官网首页</a></li>
                    <li><a href="./strategy.html">产品服务</a></li>
                    <li><a href="./about.html">关于均成</a></li>
                    <li><a href="./careers.html">人才招聘</a></li>
                    <li><a href="./contact.html">联系我们</a></li>
                </ul>
            </div>
            <div class="footer-col contact">
                <h4>联系我们</h4>
                <p>邮箱: contact@parigain.com<br>招聘: zhaopin@parigain.com<br>电话: 0755-86525376</p>
                <div class="locations">
                    <span>深圳 · 横琴</span>
                </div>
            </div>
        </div>
        <div class="risk-disclosure" id="risk-disclosure">
            <div class="container">
                <p>风险揭示：私募基金投资具有较高风险，投资者在签署基金合同前应仔细阅读招募说明书、基金合同等文件，充分了解基金的风险收益特征。均成基金不承诺基金投资收益，本金不受损失，过往业绩不预示其未来表现。投资需谨慎。</p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 广东横琴均成私募基金管理有限公司 | 备案编号：P1061222 | <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2020139886号</a></p>
            </div>
        </div>
    </footer>`;

    const COMPLIANCE_HTML = `
    <div id="compliance-modal" class="compliance-overlay" role="dialog" aria-modal="true" aria-labelledby="compliance-title">
        <div class="compliance-modal">
            <div class="compliance-header">
                <span class="compliance-kicker">Investor Access</span>
                <h3 id="compliance-title">合格投资者认定</h3>
                <p class="compliance-summary">本网站仅面向合格投资者。请确认您符合相关认定标准，并已了解私募基金投资风险。</p>
                <div class="compliance-quick-facts">
                    <span>私募基金</span>
                    <span>合格投资者准入</span>
                    <span>投资有风险</span>
                </div>
            </div>
            <div class="compliance-body" data-lenis-prevent>
                <details class="compliance-section" open>
                    <summary>合格投资者标准</summary>
                    <p>在继续浏览本公司网站前，请您确认您或您所代表的机构是一名“合格投资者”。“合格投资者”指根据任何国家和地区的证券和投资法规所规定的有资格投资于私募证券投资基金的专业投资者。例如根据我国《私募投资基金监督管理暂行办法》的规定，合格投资者的标准如下：</p>
                    <strong>一、具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元且符合下列相关标准的单位和个人：</strong>
                    <ol>
                        <li>净资产不低于1000万元的单位；</li>
                        <li>金融资产不低于300万元或者最近三年个人年均收入不低于50万元的个人。<br><small>(前款所称金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等。)</small></li>
                    </ol>
                </details>
                <details class="compliance-section">
                    <summary>视为合格投资者的情形</summary>
                    <strong>二、下列投资者视为合格投资者：</strong>
                    <ol>
                        <li>社会保障基金、企业年金等养老基金、慈善基金等社会公益基金；</li>
                        <li>依法设立并在基金业协会备案的投资计划；</li>
                        <li>投资于所管理私募基金的私募基金管理人及其从业人员；</li>
                        <li>中国证监会规定的其他投资者。</li>
                    </ol>
                </details>
                <details class="compliance-section">
                    <summary>访问声明</summary>
                    <p>如果您继续访问或使用本网站及其所载资料，即表明您声明及保证您或您所代表的机构为“合格投资者”，并将遵守对您适用的司法区域的有关法律及法规，同意并接受以下条款及相关约束。如果您不符合“合格投资者”标准或不同意下列条款及相关约束，请勿继续访问或使用本网站及其所载信息及资料。</p>
                </details>
                <details class="compliance-section warning-section" open>
                    <summary>风险提示</summary>
                    <p class="warning-text">投资涉及风险，投资者应详细审阅产品的发售文件以获取进一步资料，了解有关投资所涉及的风险因素，并寻求适当的专业投资和咨询意见。产品净值及其收益存在涨跌可能，过往的产品业绩数据并不预示产品未来的业绩表现。本网站所提供的资料并非投资建议或咨询意见，投资者不应依赖本网站所提供的信息及资料作出投资决策。</p>
                </details>
                <details class="compliance-section">
                    <summary>知识产权声明</summary>
                    <p class="copyright-info">与本网站所载信息及资料有关的所有版权、专利权、知识产权及其他产权均为本公司所有。本公司概不向浏览该资料人士发出、转让或以任何方式转移任何种类的权利。</p>
                </details>
            </div>
            <div class="compliance-footer">
                <button id="confirm-investor" class="btn-main">确认，我是合格投资者</button>
                <button id="leave-site" class="btn-outline">不符合条件，离开</button>
            </div>
        </div>
    </div>

    <div id="entry-loader" class="entry-loader">
        <div class="loader-content">
            <div id="decode-text" class="decode-text"></div>
            <div class="loader-logo-wrapper">
                <img id="loader-logo" src="./images/logo.png" alt="均成基金 LOGO" class="loader-logo">
            </div>
        </div>
        <div class="skip-hint">Scroll to skip</div>
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
            const updateHeaderState = () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            };
            updateHeaderState();
            window.addEventListener('scroll', updateHeaderState);
        }
    };

    injectComponents();

    const renderAwardsTimeline = () => {
        const timeline = document.querySelector('[data-awards-list]');
        if (!timeline) return;

        const fragment = document.createDocumentFragment();
        AWARDS_BY_YEAR.forEach(({ year, awards }) => {
            const item = document.createElement('div');
            item.className = 'timeline-item reveal-item';

            const yearEl = document.createElement('div');
            yearEl.className = 'year';
            yearEl.textContent = year;

            const content = document.createElement('div');
            content.className = 'content';

            awards.forEach(awardText => {
                const award = document.createElement('div');
                award.className = 'award';

                const title = document.createElement('h4');
                title.textContent = awardText;

                award.appendChild(title);
                content.appendChild(award);
            });

            item.append(yearEl, content);
            fragment.appendChild(item);
        });

        timeline.replaceChildren(fragment);
    };

    renderAwardsTimeline();

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

    const initScrollBackgroundTransition = ({ heroSelector, bgSelector, progressVar }) => {
        const hero = document.querySelector(heroSelector);
        const fixedBg = document.querySelector(bgSelector);
        if (!hero || !fixedBg) return;

        const updateBgProgress = () => {
            const scrollTop = window.scrollY || window.pageYOffset || 0;
            const transitionDistance = Math.max(hero.offsetHeight * 0.85, 1);
            const progress = Math.min(Math.max(scrollTop / transitionDistance, 0), 1);
            document.documentElement.style.setProperty(progressVar, progress.toFixed(4));
        };

        updateBgProgress();
        window.addEventListener('scroll', updateBgProgress, { passive: true });
        window.addEventListener('resize', updateBgProgress);
    };

    initScrollBackgroundTransition({
        heroSelector: '.home-brand-hero',
        bgSelector: '.home-scroll-bg',
        progressVar: '--home-bg-progress'
    });

    initScrollBackgroundTransition({
        heroSelector: '.contact-hero',
        bgSelector: '.contact-scroll-bg',
        progressVar: '--contact-bg-progress'
    });

    initScrollBackgroundTransition({
        heroSelector: '.strategy-page .page-hero',
        bgSelector: '.strategy-scroll-bg',
        progressVar: '--strategy-bg-progress'
    });

    const initAboutHeroBackgroundScroll = () => {
        const hero = document.querySelector('.about-hero');
        if (!hero) return;

        const updateAboutHeroBg = () => {
            const scrollTop = window.scrollY || window.pageYOffset || 0;
            const travel = Math.min(scrollTop * 0.42, 420);
            document.documentElement.style.setProperty('--about-hero-bg-y', `${-travel.toFixed(1)}px`);
        };

        updateAboutHeroBg();
        window.addEventListener('scroll', updateAboutHeroBg, { passive: true });
        window.addEventListener('resize', updateAboutHeroBg);
    };

    initAboutHeroBackgroundScroll();

    const initOfficeCarousel = () => {
        document.querySelectorAll('[data-office-carousel]').forEach((carousel) => {
            const track = carousel.querySelector('.office-carousel-track');
            const slides = Array.from(carousel.querySelectorAll('.office-carousel-slide'));
            const dots = Array.from(carousel.querySelectorAll('[data-office-carousel-dot]'));
            const prev = carousel.querySelector('[data-office-carousel-prev]');
            const next = carousel.querySelector('[data-office-carousel-next]');
            if (!track || slides.length <= 1) return;

            let index = 0;
            let timerId;

            const goTo = (nextIndex) => {
                index = (nextIndex + slides.length) % slides.length;
                track.style.transform = `translateX(-${index * 100}%)`;
                slides.forEach((slide, slideIndex) => {
                    slide.classList.toggle('is-active', slideIndex === index);
                });
                dots.forEach((dot, dotIndex) => {
                    dot.classList.toggle('is-active', dotIndex === index);
                });
            };

            const start = () => {
                window.clearInterval(timerId);
                timerId = window.setInterval(() => goTo(index + 1), 5200);
            };

            prev?.addEventListener('click', () => {
                goTo(index - 1);
                start();
            });
            next?.addEventListener('click', () => {
                goTo(index + 1);
                start();
            });
            dots.forEach((dot, dotIndex) => {
                dot.addEventListener('click', () => {
                    goTo(dotIndex);
                    start();
                });
            });
            carousel.addEventListener('mouseenter', () => window.clearInterval(timerId));
            carousel.addEventListener('mouseleave', start);

            goTo(0);
            start();
        });
    };

    initOfficeCarousel();

    const initMilestoneCarousel = () => {
        document.querySelectorAll('[data-milestone-carousel]').forEach((carousel) => {
            const slides = Array.from(carousel.querySelectorAll('.milestone-slide'));
            const dots = Array.from(carousel.querySelectorAll('[data-milestone-dot]'));
            const navButtons = Array.from(carousel.querySelectorAll('[data-milestone-nav]'));
            const stage = carousel.querySelector('.milestone-stage');
            const track = carousel.querySelector('.milestone-track');
            if (!slides.length) return;

            let index = 0;
            let timerId;
            let dragStartX = 0;
            let dragStartIndex = 0;
            let isDragging = false;

            const getStepWidth = () => {
                const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
                const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
                return slideWidth + gap;
            };

            const goTo = (nextIndex, { centerAxis = false } = {}) => {
                index = (nextIndex + slides.length) % slides.length;
                carousel.style.setProperty('--milestone-index', index);
                carousel.style.setProperty('--milestone-drag-x', '0px');
                slides.forEach((slide, slideIndex) => {
                    slide.classList.toggle('is-active', slideIndex === index);
                });
                dots.forEach((dot, dotIndex) => {
                    dot.classList.toggle('is-active', dotIndex === index);
                    dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
                });
                if (centerAxis) {
                    dots[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
                }
            };

            const start = () => {
                window.clearInterval(timerId);
                timerId = window.setInterval(() => goTo(index + 1), 3600);
            };

            const restart = () => {
                start();
            };

            dots.forEach((dot, dotIndex) => {
                dot.addEventListener('click', () => {
                    goTo(dotIndex, { centerAxis: true });
                    restart();
                });
            });

            navButtons.forEach((button) => {
                button.addEventListener('pointerdown', (event) => {
                    event.stopPropagation();
                });
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const direction = button.dataset.milestoneNav === 'prev' ? -1 : 1;
                    goTo(index + direction);
                    restart();
                });
            });

            carousel.addEventListener('mouseenter', () => window.clearInterval(timerId));
            carousel.addEventListener('mouseleave', start);

            stage?.addEventListener('pointerdown', (event) => {
                if (event.button !== undefined && event.button !== 0) return;
                isDragging = true;
                dragStartX = event.clientX;
                dragStartIndex = index;
                window.clearInterval(timerId);
                carousel.classList.add('is-dragging');
                stage.setPointerCapture?.(event.pointerId);
            });

            stage?.addEventListener('pointermove', (event) => {
                if (!isDragging) return;
                carousel.style.setProperty('--milestone-drag-x', `${event.clientX - dragStartX}px`);
            });

            const finishDrag = (event) => {
                if (!isDragging) return;
                const dragDistance = event.clientX - dragStartX;
                const nextIndex = Math.min(
                    slides.length - 1,
                    Math.max(0, dragStartIndex - Math.round(dragDistance / getStepWidth()))
                );
                isDragging = false;
                carousel.classList.remove('is-dragging');
                stage?.releasePointerCapture?.(event.pointerId);
                goTo(nextIndex, { centerAxis: true });
                start();
            };

            stage?.addEventListener('pointerup', finishDrag);
            stage?.addEventListener('pointercancel', finishDrag);
            stage?.addEventListener('lostpointercapture', () => {
                if (!isDragging) return;
                isDragging = false;
                carousel.classList.remove('is-dragging');
                carousel.style.setProperty('--milestone-drag-x', '0px');
                start();
            });

            goTo(0);
            start();
        });
    };

    initMilestoneCarousel();

    // Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    const revealElements = document.querySelectorAll('.reveal-item, .stats-flex, .domain-card, .section-header, .partner-category-card, .founder-card, .timeline-item, .office-card, .recruitment-flex, .form-container, .process-flow, .info-card, .honor-card, .job-card, .careers-hero, .image-copy-panel, .home-honors-media, .home-honors-list, .advantage-card, .milestone-slide, .team-photo, .team-copy, .career-value-card, .office-carousel, .recruit-system-panel, .contact-info-card');
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

    const finishEntryLoader = (loader, navLogo) => {
        if (!loader) return;

        navLogo?.classList.remove('is-logo-target-hidden');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.remove('active', 'show-logo', 'logo-flight');
            loader.style.opacity = '';
            document.body.style.overflow = 'auto';
            if (window.lenisInstance) window.lenisInstance.start();
        }, 420);
    };

    const animateLoaderLogoToNav = (loader) => {
        const logoWrapper = document.querySelector('.loader-logo-wrapper');
        const loaderLogo = document.getElementById('loader-logo');
        const navLogo = document.querySelector('.nav-logo');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!loader || !logoWrapper || !loaderLogo || !navLogo || reduceMotion) {
            finishEntryLoader(loader, navLogo);
            return;
        }

        const sourceRect = loaderLogo.getBoundingClientRect();
        const targetRect = navLogo.getBoundingClientRect();
        if (!sourceRect.width || !sourceRect.height || !targetRect.width || !targetRect.height) {
            finishEntryLoader(loader, navLogo);
            return;
        }

        const sourceCenterX = sourceRect.left + sourceRect.width / 2;
        const sourceCenterY = sourceRect.top + sourceRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const targetScale = targetRect.height / sourceRect.height;

        logoWrapper.style.setProperty('--loader-logo-dx', `${targetCenterX - sourceCenterX}px`);
        logoWrapper.style.setProperty('--loader-logo-dy', `${targetCenterY - sourceCenterY}px`);
        logoWrapper.style.setProperty('--loader-logo-scale', targetScale.toFixed(4));
        navLogo.classList.add('is-logo-target-hidden');

        requestAnimationFrame(() => {
            loader.classList.add('logo-flight');
        });

        let isDone = false;
        const complete = () => {
            if (isDone) return;
            isDone = true;
            logoWrapper.removeEventListener('transitionend', handleTransitionEnd);
            finishEntryLoader(loader, navLogo);
        };
        const handleTransitionEnd = (event) => {
            if (event.propertyName === 'transform') complete();
        };

        logoWrapper.addEventListener('transitionend', handleTransitionEnd);
        setTimeout(complete, 1150);
    };

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
                            animateLoaderLogoToNav(loader);
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
    initOfficeMaps();
});
