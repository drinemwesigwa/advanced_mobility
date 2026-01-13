const translations = {
    en: {
        about: "About MLG",
        solutions: "Solutions",
        products: "Products & Platforms",
        industries: "Industries",
        newsroom: "Newsroom",
        partner: "Partner With Us",
        explore: "Explore the Network",
        title: "Architecting the Sky. Enabling the Future.",
        hero_desc: "The infrastructure behind advanced air mobility. Sovereign mobility capability at regional scale.",
        network_title: "The Operating Network",
        network_subtitle: "Corridors, vertiports, and coverage across the region.",
        estimator_title: "Coverage Estimator",
        origin: "Origin",
        destination: "Destination",
        calculate: "Calculate Route",
        proven_title: "Proven Technology",
        proven_subtitle: "Enterprise-grade autonomous systems built for reliability",
        ready_title: "Ready to Transform Your Operations?",
        ready_subtitle: "Get started with a customized demo and see how autonomous cargo delivery can revolutionize your business.",
        subsidiaries: "Subsidiaries",
        audience: "Audience",
        legal: "Legal & Compliance"
    },
    ar: {
        about: "حول MLG",
        solutions: "الحلول",
        products: "المنتجات والمنصات",
        industries: "الصناعات",
        newsroom: "غرفة الأخبار",
        partner: "شريك معنا",
        explore: "استكشف الشبكة",
        title: "هندسة السماء. تمكين المستقبل.",
        hero_desc: "البنية التحتية وراء التنقل الجوي المتقدم. قدرة تنقل سيادية على نطاق إقليمي.",
        network_title: "شبكة التشغيل",
        network_subtitle: "الممرات والموانئ الجوية والتغطية في جميع أنحاء المنطقة.",
        estimator_title: "مقدر التغطية",
        origin: "نقطة الانطلاق",
        destination: "الوجهة",
        calculate: "حساب المسار",
        proven_title: "تكنولوجيا مثبتة",
        proven_subtitle: "أنظمة مستقلة على مستوى المؤسسات مصممة للموثوقية",
        ready_title: "هل أنت مستعد لتغيير عملياتك؟",
        ready_subtitle: "ابدأ بتجربة مخصصة وشاهد كيف يمكن لشحن البضائع المستقل أن يحدث ثورة في عملك.",
        subsidiaries: "الشركات التابعة",
        audience: "دخول الجمهور",
        legal: "القانونية والامتثال"
    }
};

let currentLang = 'en';

// Language switching functionality
function updateLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.body.classList.toggle('rtl', lang === 'ar');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' && el.type === 'submit') {
                el.value = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Update language button
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = lang === 'en' ? 'AR' : 'EN';
    }

    // Store language preference
    localStorage.setItem('preferred-language', lang);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const menuClose = document.querySelector('.mobile-menu-close');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        menuClose.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Add reveal class to elements that should animate
    const revealElements = document.querySelectorAll('.domain-card, .stat-item, .info-card, .proven-text, .cta-content, .application-card, .partners-content, .fleet-content');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Form handling for coverage estimator
function initEstimatorForm() {
    const form = document.querySelector('.estimator-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const origin = form.querySelector('input[placeholder*="origin"]').value;
            const destination = form.querySelector('input[placeholder*="destination"]').value;

            if (origin && destination) {
                // Simulate calculation
                alert(`Calculating route from ${origin} to ${destination}...\n\nThis is a demo. In a real application, this would connect to a routing API.`);
            } else {
                alert('Please enter both origin and destination.');
            }
        });
    }
}

// ROI Calculator functionality
function initROICalculator() {
    const missionFrequencySlider = document.getElementById('mission-frequency');
    const distanceSlider = document.getElementById('average-distance');
    const missionValueDisplay = document.getElementById('mission-value');
    const distanceValueDisplay = document.getElementById('distance-value');
    const annualSavingsDisplay = document.getElementById('annual-savings');

    if (missionFrequencySlider && distanceSlider && missionValueDisplay && distanceValueDisplay && annualSavingsDisplay) {
        // Function to calculate annual savings
        function calculateSavings(missions, distance) {
            // Simplified calculation: base savings of $2000 per mission, adjusted by distance factor
            const baseSavingsPerMission = 2000;
            const distanceMultiplier = Math.max(0.5, Math.min(2, distance / 15)); // Normalize around 15km
            const savingsPerMission = baseSavingsPerMission * distanceMultiplier;
            return Math.round(missions * 12 * savingsPerMission); // Annual (12 months)
        }

        // Function to update displays
        function updateCalculator() {
            const missions = parseInt(missionFrequencySlider.value);
            const distance = parseInt(distanceSlider.value);

            missionValueDisplay.textContent = missions.toString();
            distanceValueDisplay.textContent = distance.toString() + ' km';

            const savings = calculateSavings(missions, distance);
            annualSavingsDisplay.textContent = '$' + savings.toLocaleString();
        }

        // Add event listeners
        missionFrequencySlider.addEventListener('input', updateCalculator);
        distanceSlider.addEventListener('input', updateCalculator);

        // Initialize with default values
        updateCalculator();
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            closeMobileMenu();
        }

        // Language switching with Ctrl+L
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            updateLanguage(currentLang === 'en' ? 'ar' : 'en');
        }
    });
}

// Performance optimization
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Any scroll-dependent logic here
        }, 16);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'css/style.css';
    preloadLink.as = 'style';
    document.head.appendChild(preloadLink);
}

// Accessibility improvements
function initAccessibility() {
    // Add ARIA labels where needed
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.setAttribute('aria-label', 'Switch language');
    }

    // Ensure all buttons have proper labels
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
        if (!btn.textContent.trim()) {
            btn.setAttribute('aria-label', 'Button');
        }
    });

    // Focus management for mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, input, select, textarea');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        document.addEventListener('keydown', (e) => {
            if (mobileMenu.classList.contains('active')) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            e.preventDefault();
                            lastFocusable.focus();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            e.preventDefault();
                            firstFocusable.focus();
                        }
                    }
                }
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load preferred language
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }

    // Initialize language
    updateLanguage(currentLang);

    // Initialize all features
    initMobileMenu();
    initScrollAnimations();
    initHeaderScroll();
    initSmoothScrolling();
    initEstimatorForm();
    initROICalculator();
    initLazyLoading();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    initAccessibility();

    // Language toggle event
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            updateLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
    }

    // Add loading class removal for smooth transitions
    document.body.classList.add('loaded');

    // Log initialization for debugging
    console.log('AirMobility website initialized successfully');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    closeMobileMenu();
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Service worker would be implemented separately
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});