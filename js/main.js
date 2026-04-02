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

    // 1. Header Scroll Effect
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.control-dot');
    const prevBtn = document.querySelector('.arrow-btn.prev');
    const nextBtn = document.querySelector('.arrow-btn.next');
    let currentSlide = 0;
    let sliderInterval;

    const updateSlider = (index) => {
        if (!slides.length) return;
        
        // Initialize backgrounds if not done
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
        let next = (currentSlide + 1) % slides.length;
        updateSlider(next);
    };

    const prevSlide = () => {
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

    const revealElements = document.querySelectorAll('.stats-flex, .domain-card, .section-header, .partner-logo, .about-section, .strategy-detail-section, .intro-section, .founder-card, .timeline-item, .office-card, .recruitment-flex, .form-container, .process-flow, .info-card, .strategy-detail-box, .detail-item, .chart-container, .advantage-section, .philosophy-section, .scope-section');
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

    // 5. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

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

    // 9. Qualified Investor Modal Logic
    const complianceModal = document.getElementById('compliance-modal');
    const confirmBtn = document.getElementById('confirm-investor');
    const leaveBtn = document.getElementById('leave-site');

    if (complianceModal && !sessionStorage.getItem('complianceConfirmed')) {
        complianceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Disable Lenis if active
        if (window.lenisInstance) window.lenisInstance.stop();
        else if (window.lenis) window.lenis.stop();
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            sessionStorage.setItem('complianceConfirmed', 'true');
            complianceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (window.lenisInstance) window.lenisInstance.start();
        });
    }

    if (leaveBtn) {
        leaveBtn.addEventListener('click', () => {
            window.location.href = 'https://www.baidu.com';
        });
    }
});

