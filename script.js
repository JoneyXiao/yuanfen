// ===== MAIN APPLICATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initGallery();
    initContactForm();
    initSmoothScrolling();
    initScrollEffects();
    initWeChatCopy();
});

// ===== NAVBAR MODULE =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== GALLERY MODULE =====
function initGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    let currentSlide = 0;
    let autoSlideInterval;

    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-rotate slides
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-rotation
        });
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const gallery = document.querySelector('.gallery-slider');

    gallery.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    gallery.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
                showSlide(currentSlide);
            }
        }
    }

    // Pause auto-rotation on hover (desktop)
    gallery.addEventListener('mouseenter', stopAutoSlide);
    gallery.addEventListener('mouseleave', startAutoSlide);

    // Start auto-rotation
    startAutoSlide();
}

// ===== CONTACT FORM MODULE =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');

    // Form validation
    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validatePhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s|-/g, ''));
    }

    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        errorElement.parentElement.classList.add('error');
    }

    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        errorElement.parentElement.classList.remove('error');
    }

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (!validateName(this.value)) {
            showError(nameError, '请输入有效的姓名');
        } else {
            hideError(nameError);
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (!validatePhone(this.value)) {
            showError(phoneError, '请输入有效的手机号码');
        } else {
            hideError(phoneError);
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value;
        const phone = phoneInput.value;
        let isValid = true;

        // Validate all fields
        if (!validateName(name)) {
            showError(nameError, '请输入有效的姓名');
            isValid = false;
        }

        if (!validatePhone(phone)) {
            showError(phoneError, '请输入有效的手机号码');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = '提交中...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('咨询信息已提交！我们将尽快与您联系。');
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });
}

// ===== SMOOTH SCROLLING MODULE =====
function initSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS MODULE =====
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .contact-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== WECHAT COPY MODULE =====
function initWeChatCopy() {
    const wechatElements = document.querySelectorAll('[data-wechat]');
    
    wechatElements.forEach(element => {
        element.addEventListener('click', function() {
            const wechatId = this.getAttribute('data-wechat');
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(wechatId).then(() => {
                    showToast('微信号已复制到剪贴板');
                }).catch(() => {
                    showToast('复制失败，请手动复制：' + wechatId);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = wechatId;
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    showToast('微信号已复制到剪贴板');
                } catch (err) {
                    showToast('复制失败，请手动复制：' + wechatId);
                }
                
                document.body.removeChild(textArea);
            }
        });
        
        // Add click indicator
        element.style.cursor = 'pointer';
        element.title = '点击复制微信号';
    });
}

// ===== UTILITY FUNCTIONS =====
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--dark);
            color: var(--white);
            padding: 1rem 2rem;
            border-radius: 2rem;
            font-size: 0.875rem;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (when real images are added)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('open')) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
});

// ===== BROWSER COMPATIBILITY =====
// Check for CSS custom properties support
if (!window.CSS || !window.CSS.supports || !window.CSS.supports('color', 'var(--fake-var)')) {
    // Fallback for older browsers
    console.warn('CSS custom properties not supported. Consider using a polyfill.');
}

// Check for Intersection Observer support
if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    console.warn('IntersectionObserver not supported. Scroll animations disabled.');
}

// ===== DEVELOPMENT HELPERS =====
if (process.env.NODE_ENV !== 'production') {
    // Add development helpers
    console.log('Wedding website loaded successfully!');
    
    // Performance monitoring
    window.addEventListener('load', () => {
        console.log('Page load time:', performance.now(), 'ms');
    });
} 