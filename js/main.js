export {};

document.addEventListener('DOMContentLoaded', () => {
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

        // Update ScrollTrigger or IntersectionObserver on Lenis scroll
        window.lenisInstance.on('scroll', () => {
            // Force a small scroll event for native observers if needed
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

    // 0.2 Global Components (Header & Footer)
    const HEADER_HTML = `
    <header id="site-header">
        <nav class="container">
            <div class="logo">
                <a href="./index.html">
                    <img src="./images/logo.png" alt="均成基金官方LOGO" class="nav-logo">
                </a>
            </div>
            <ul class="nav-links">
                <li><a href="./index.html" data-page="index">官网首页</a></li>
                <li><a href="./strategy.html" data-page="strategy">投资策略</a></li>
                <li><a href="./about.html" data-page="about">关于均成</a></li>
                <li><a href="./contact.html" data-page="contact" class="btn-primary">联系我们</a></li>
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
                    <img src="./images/logo.png" alt="均成基金" class="footer-logo">
                </div>
                <p>专注于量化投资的专业资管机构</p>
            </div>
            <div class="footer-col links">
                <h4>快速链接</h4>
                <ul>
                    <li><a href="./index.html">官网首页</a></li>
                    <li><a href="./strategy.html">投资策略</a></li>
                    <li><a href="./about.html">关于均成</a></li>
                    <li><a href="./contact.html">加入我们</a></li>
                </ul>
            </div>
            <div class="footer-col contact">
                <h4>联系我们</h4>
                <p>邮箱: contact@parigain.com</p>
                <div class="locations">
                    <span>深圳 · 横琴</span>
                </div>
            </div>
        </div>
        
        <div class="risk-disclosure">
            <div class="container">
                <p>风险揭示：私募集基金投资具有较高风险，投资者在签署基金合同前应仔细阅读招募说明书、基金合同等文件，充分了解基金的风险收益特征。均成基金不承诺基金投资收益，本金不受损失，过往业绩不预示其未来表现。投资需谨慎。</p>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 广东横琴均成私募基金管理有限公司 | 备案编号：P1061222 | <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2020139886号</a></p>
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

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    };

    const injectComponents = () => {
        // Inject Header
        if (!document.getElementById('site-header')) {
            document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
        }
        
        // Inject Footer
        if (!document.getElementById('site-footer')) {
            document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
        }

        // Set Active Link
        const path = window.location.pathname;
        const page = path.split("/").pop().replace(".html", "") || "index";
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Initialize mobile menu after injection
        setupMobileMenu();

        // 1. Header Scroll Effect
        const header = document.getElementById('site-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    };

    injectComponents();

    // 2. Hero Slider Logic
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
                if (bg && (bg.includes('.') || bg.startsWith('http'))) {
                    slide.style.backgroundImage = `url(${bg})`;
                }
            }
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index]?.classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        if (!slides.length) return;
        let next = (currentSlide + 1) % slides.length;
        updateSlider(next);
    };

    const prevSlide = () => {
        if (!slides.length) return;
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider(prev);
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateSlider(idx);
            resetInterval();
        });
    });

    const startInterval = () => {
        if (slides.length > 0) {
            sliderInterval = setInterval(nextSlide, 6000);
        }
    };

    const resetInterval = () => {
        clearInterval(sliderInterval);
        startInterval();
    };

    startInterval();

    // 3. Reveal on Scroll (Modern Approach)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.stats-flex, .domain-card, .section-header, .partner-logo, .about-section, .strategy-detail-section, .intro-section, .founder-card, .timeline-item, .office-card, .recruitment-flex, .form-container, .process-flow, .info-card, .strategy-detail-box, .detail-item, .chart-container, .advantage-section, .philosophy-section, .scope-section, .honor-card');
    revealElements.forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // Fallback: If elements are still invisible after 2s, show them
    setTimeout(() => {
        revealElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 2000);

    // 4. Mouse Tracking for Card Glow
    const cards = document.querySelectorAll('.domain-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Back to Top Button Visibility & Click
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. Count-Up Animation for Statistics (Scroll Triggered)
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetText = el.getAttribute('data-target') || el.textContent;
                const target = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
                
                if (isNaN(target)) return;
                
                let current = 0;
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                const updateCount = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing out function
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    current = Math.floor(easeOutQuart * target);
                    
                    el.textContent = targetText.replace(/\d+/, current);
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = targetText.replace(/\d+/, target);
                    }
                };
                
                requestAnimationFrame(updateCount);
                countUpObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    const countUpElements = document.querySelectorAll('.val');
    countUpElements.forEach(el => {
        // Store the original target value in a data attribute if not already there
        if (!el.getAttribute('data-target')) {
            el.setAttribute('data-target', el.textContent);
        }
        // Set initial state to 0 or formatted 0
        el.textContent = el.textContent.replace(/\d+/, '0');
        countUpObserver.observe(el);
    });

    // 8. Page Load Fade-in
    document.body.classList.add('loaded');

    // 9. Qualified Investor Modal & Entry Animation Logic
    const COMPLIANCE_HTML = `
    <div id="compliance-modal" class="compliance-overlay">
        <div class="compliance-modal">
            <div class="compliance-header">
                <h3>合格投资者认定</h3>
                <div class="compliance-line"></div>
            </div>
            <div class="compliance-body" data-lenis-prevent>
                <p>在继续浏览本公司网站前，请您确认您或您所代表的机构是一名“合格投资者”。“合格投资者”指根据任何国家和地区的证券和投资法规所规定的有资格投资于私募证券投资基金的专业投资者。例如根据我国《私募投资基金监督管理暂行办法》的规定，合格投资者的标准如下：</p>
                
                <div class="compliance-section">
                    <strong>一、具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元且符合下列相关标准的单位和个人：</strong>
                    <ol>
                        <li>净资产不低于1000万元的单位；</li>
                        <li>金融资产不低于300万元或者最近三年个人年均收入不低于50万元的个人。<br><small>(前款所称金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等。)</small></li>
                    </ol>
                </div>

                <div class="compliance-section">
                    <strong>二、下列投资者视为合格投资者：</strong>
                    <ol>
                        <li>社会保障基金、企业年金等养老基金、慈善基金等社会公益基金；</li>
                        <li>依法设立并在基金业协会备案的投资计划；</li>
                        <li>投资于所管理私募基金的私募基金管理人及其从业人员；</li>
                        <li>中国证监会规定的其他投资者。</li>
                    </ol>
                </div>
                
                <p>如果您继续访问或使用本网站及其所载资料，即表明您声明及保证您或您所代表的机构为“合格投资者”，并将遵守对您适用的司法区域的有关法律及法规，同意并接受以下条款及相关约束。如果您不符合“合格投资者”标准或不同意下列条款及相关约束，请勿继续访问或使用本网站及其所载信息及资料。</p>
                
                <p class="warning-text">投资涉及风险，投资者应详细审阅产品的发售文件以获取进一步资料，了解有关投资所涉及的风险因素，并寻求适当的专业投资和咨询意见。产品净值及其收益存在涨跌可能，过往的产品业绩数据并不预示产品未来的业绩表现。本网站所提供的资料并非投资建议或咨询意见，投资者不应依赖本网站所提供的信息及资料作出投资决策。</p>
                
                <p class="copyright-info">与本网站所载信息及资料有关的所有版权、专利权、知识产权及其他产权均为本公司所有。本公司概不向浏览该资料人士发出、转让或以任何方式转移任何种类的权利。</p>
            </div>
            <div class="compliance-footer">
                <button id="confirm-investor" class="btn-main">确认，我是合格投资者</button>
                <button id="leave-site" class="btn-outline">不符合条件，离开</button>
            </div>
        </div>
    </div>`;

    const ENTRY_LOADER_HTML = `
    <div id="entry-loader" class="entry-loader">
        <div class="loader-content">
            <div id="decode-text" class="decode-text"></div>
            <div class="loader-logo-wrapper">
                <img id="loader-logo" src="./images/logo.png" alt="均成资产 Logo" class="loader-logo">
            </div>
        </div>
        <div class="skip-hint">Scroll to skip</div>
    </div>`;

    const chars = '01$#@!%&*?';
    let animationSkipped = false;
    let entryLoader, decodeText;

    const startDigitalRain = () => {
        const canvas = document.getElementById('digital-rain-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width, height, columns;
        const fontHeight = 14;
        const characters = '01'.split('');
        let yPositions;

        const initCanvas = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontHeight);
            yPositions = Array(columns).fill(0);
        };

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(10, 10, 11, 0.08)'; 
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(245, 166, 35, 0.7)'; 
            ctx.font = `${fontHeight}px monospace`;

            yPositions.forEach((y, index) => {
                const char = characters[Math.floor(Math.random() * characters.length)];
                const x = index * fontHeight;
                ctx.fillText(char, x, y);
                if (y > height + Math.random() * 8000) {
                    yPositions[index] = 0;
                } else {
                    yPositions[index] = y + fontHeight;
                }
            });
        };

        initCanvas();
        window.addEventListener('resize', initCanvas);
        setInterval(drawMatrix, 50);
    };

    const skipIntro = () => {
        if (animationSkipped || !entryLoader) return;
        animationSkipped = true;
        entryLoader.style.opacity = '0';
        setTimeout(() => {
            entryLoader.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (window.lenisInstance) window.lenisInstance.start();
        }, 800);
    };

    const runDecode = (targetText) => {
        if (animationSkipped || !decodeText) return;
        const length = targetText.length;
        let iteration = 0;
        const interval = setInterval(() => {
            if (animationSkipped) {
                clearInterval(interval);
                return;
            }
            decodeText.innerText = targetText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) return targetText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= length) {
                clearInterval(interval);
                setTimeout(() => {
                    if (!animationSkipped) {
                        entryLoader.classList.add('show-logo');
                        setTimeout(skipIntro, 2000);
                    }
                }, 500);
            }
            iteration += 1 / 5;
        }, 30);
    };

    const initCompliance = () => {
        if (sessionStorage.getItem('complianceConfirmed')) {
            startDigitalRain();
            return;
        }

        // Inject modal and entry loader if missing
        if (!document.getElementById('compliance-modal')) {
            document.body.insertAdjacentHTML('afterbegin', COMPLIANCE_HTML);
        }
        if (!document.getElementById('entry-loader')) {
            document.body.insertAdjacentHTML('afterbegin', ENTRY_LOADER_HTML);
        }

        const modal = document.getElementById('compliance-modal');
        const confirmBtn = document.getElementById('confirm-investor');
        const leaveBtn = document.getElementById('leave-site');
        
        // Initialize global variables for entry loader after injection
        entryLoader = document.getElementById('entry-loader');
        decodeText = document.getElementById('decode-text');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (window.lenisInstance) window.lenisInstance.stop();

        confirmBtn.addEventListener('click', () => {
            sessionStorage.setItem('complianceConfirmed', 'true');
            modal.classList.remove('active');
            startDigitalRain();
            
            if (entryLoader) {
                entryLoader.classList.add('active');
                setTimeout(() => runDecode("PARIGAIN"), 500);
                window.addEventListener('wheel', skipIntro, { once: true });
                window.addEventListener('touchmove', skipIntro, { once: true });
                window.addEventListener('keydown', skipIntro, { once: true });
                entryLoader.addEventListener('click', skipIntro, { once: true });
            } else {
                document.body.style.overflow = 'auto';
                if (window.lenisInstance) window.lenisInstance.start();
            }
        });

        leaveBtn.addEventListener('click', () => {
            window.location.href = 'https://www.baidu.com';
        });
    };

    const initSectorGrowth = () => {
        const chartVisual = document.querySelector('.chart-visual');
        if (!chartVisual) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chartVisual.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(chartVisual);
    };

    const initMagneticButtons = () => {
        // Disable on touch devices
        if ('ontouchstart' in window) return;

        const magneticElems = document.querySelectorAll('.btn-main, .btn-primary, .btn-outline, .nav-links a');
        
        magneticElems.forEach(elem => {
            elem.addEventListener('mousemove', (e) => {
                const rect = elem.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;
                
                // Attraction strength (scale down the distance)
                const strength = 0.3; 
                
                elem.style.setProperty('--x', `${distanceX * strength}px`);
                elem.style.setProperty('--y', `${distanceY * strength}px`);
            });

            elem.addEventListener('mouseleave', () => {
                elem.style.setProperty('--x', '0px');
                elem.style.setProperty('--y', '0px');
            });
        });
    };

    initCompliance();
    initSectorGrowth();
    initMagneticButtons();
});

