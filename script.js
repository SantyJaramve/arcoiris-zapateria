(function() {
    'use strict';

    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoLinks = document.querySelectorAll('.logo');

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    logoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === '#top' || href === '/') {
                scrollToTop();
            }
        });
    });

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 150);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.problema-item, .servicio-card, .proceso-step, .testimonio-card'
    );

    animatedElements.forEach(el => {
        animateOnScroll.observe(el);
    });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const delay = el.dataset.delay || 0;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay * 150);
            }
        });
    });

    function initGallery() {
        const slides = document.querySelectorAll('.galeria-slide');
        const navItems = document.querySelectorAll('.galeria-nav-item');

        function activateSlide(index) {
            slides.forEach((s, i) => {
                s.classList.toggle('active', i === index);
            });
            navItems.forEach((n, i) => {
                n.classList.toggle('active', i === index);
            });
        }

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = parseInt(item.dataset.target);
                activateSlide(target);
            });
        });
    }

    if (document.querySelector('.galeria-slide')) {
        initGallery();
    }

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        let floating = true;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300 && !floating) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.transform = 'scale(1)';
                floating = true;
            } else if (window.scrollY <= 300 && floating) {
                whatsappFloat.style.opacity = '0';
                whatsappFloat.style.transform = 'scale(0)';
                floating = false;
            }
        });
    }

})();