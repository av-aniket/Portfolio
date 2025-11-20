/* ========================================
   FORM VALIDATION & SMOOTHNESS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupFormValidation();
    setupSmoothScrolling();
    setupObserverAnimations();
    setupMobileMenu();
    setupInteractiveElements();
}

/* ========================================
   FORM VALIDATION & SUBMISSION
   ======================================== */
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validation
            if (!validateForm(formData)) {
                return;
            }

            // Show success state
            showFormSuccess(contactForm);
            
            // Reset form
            contactForm.reset();
            
            // Here you would typically send the form data to a server
            console.log('Form submitted with data:', formData);
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                resetFormState(contactForm);
            }, 5000);
        });

        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm(data) {
    let isValid = true;

    // Name validation
    if (data.name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Email validation
    if (!isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (data.subject.length < 3) {
        showFieldError('subject', 'Subject must be at least 3 characters');
        isValid = false;
    }

    // Message validation
    if (data.message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    let isValid = true;

    if (field.id === 'name' && field.value.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (field.id === 'email' && !isValidEmail(field.value.trim())) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (field.id === 'subject' && field.value.trim().length < 3) {
        showFieldError('subject', 'Subject must be at least 3 characters');
        isValid = false;
    }

    if (field.id === 'message' && field.value.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    if (isValid && field.value.trim()) {
        clearFieldError(field);
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = 'var(--warning)';
    field.style.backgroundColor = 'rgba(245, 158, 11, 0.05)';

    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.color = 'var(--warning)';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
}

function clearFieldError(field) {
    field.style.borderColor = 'var(--border-color)';
    field.style.backgroundColor = 'var(--dark-bg-secondary)';

    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormSuccess(form) {
    const btn = form.querySelector('.btn-primary');
    const originalText = btn.textContent;

    btn.textContent = '✓ Message Sent Successfully!';
    btn.style.background = 'linear-gradient(135deg, var(--success), #059669)';
    btn.disabled = true;

    // Disable all form fields temporarily
    form.querySelectorAll('input, textarea').forEach(field => {
        field.disabled = true;
    });
}

function resetFormState(form) {
    const btn = form.querySelector('.btn-primary');
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;

    form.querySelectorAll('input, textarea').forEach(field => {
        field.disabled = false;
    });
}

/* ========================================
   SMOOTH SCROLLING & SCROLL EFFECTS
   ======================================== */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                updateActiveNav();
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const { offsetTop, offsetHeight } = section;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                link.style.color = 'var(--primary-blue)';
            } else {
                link.style.color = '';
            }
        }
    });
}

/* ========================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ======================================== */
function setupObserverAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe portfolio cards, testimonial cards, and info boxes
    document.querySelectorAll('.portfolio-card, .testimonial-card, .info-box').forEach(el => {
        el.style.opacity = '0';
        el.style.animation = 'none';
        observer.observe(el);
    });
}

/* ========================================
   MOBILE MENU
   ======================================== */
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.style.display = 'none';
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

/* ========================================
   INTERACTIVE ELEMENTS
   ======================================== */
function setupInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add hover effects to portfolio cards
    setupPortfolioCardInteractivity();

    // Add smooth number counting for stats (if any)
    setupCounterAnimations();
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    const ripples = button.querySelector('.ripples');
    if (ripples) {
        ripples.appendChild(ripple);
    }
}

function setupPortfolioCardInteractivity() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle parallax effect on hover
            this.style.transform = 'translateY(-10px) scale(1.01)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && card.querySelector('a')) {
                card.querySelector('a').click();
            }
        });
    });
}

function setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);

                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

/* ========================================
   PAGE LOAD ANIMATIONS
   ======================================== */
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Trigger animations on page load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.querySelectorAll('.word');
        words.forEach((word, index) => {
            word.style.opacity = '0';
            word.style.animation = `fadeInUp 0.8s ease-out ${0.1 + index * 0.2}s forwards`;
        });
    }
});

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */
document.addEventListener('keydown', function(e) {
    // Skip to main content with keyboard shortcut (Alt + M)
    if (e.altKey && e.key === 'm') {
        document.querySelector('#portfolio')?.focus();
    }

    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (navLinks && mobileMenuBtn) {
            navLinks.style.display = 'none';
            mobileMenuBtn.classList.remove('active');
        }
    }
});

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

console.log('Portfolio initialized successfully!');

// --- Custom Neon Cursor ---

// 1. Select the cursor elements
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// 2. Move the cursor elements on 'mousemove'
window.addEventListener('mousemove', (e) => {
  // Get the X and Y coordinates of the mouse
  const posX = e.clientX;
  const posY = e.clientY;

  // Position the dot instantly
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Position the outline (the CSS transition will make it lag)
  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;
});

// 3. Add the hover effect
// Select all interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .btn');

interactiveElements.forEach((el) => {
  // Add the 'cursor-hover-grow' class on mouse enter
  el.addEventListener('mouseenter', () => {
    cursorOutline.classList.add('cursor-hover-grow');
  });
  
  // Remove the class on mouse leave
  el.addEventListener('mouseleave', () => {
    cursorOutline.classList.remove('cursor-hover-grow');
  });
});

// --- Typing Effect for Hero Subtitle ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Select the elements within the .hero-subtitle
    const typedTextSpan = document.querySelector('.hero-subtitle .typed-text');
    const cursorSpan = document.querySelector('.hero-subtitle .cursor');

    // 2. Define the words to be typed
    const words = ["Frontend Developer", "Video Editor"];
    
    // 3. Define timing variables
    const typingDelay = 150;
    const erasingDelay = 100;
    const newWordDelay = 2000;

    // 4. Define tracking variables
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        // Check if elements exist
        if (!typedTextSpan || !cursorSpan) {
            return; 
        }

        cursorSpan.classList.add('typing');
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // --- DELETING ---
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                if (wordIndex === words.length) {
                    wordIndex = 0;
                }
                setTimeout(type, newWordDelay);
            } else {
                setTimeout(type, erasingDelay);
            }
        } else {
            // --- TYPING ---
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, newWordDelay);
            } else {
                setTimeout(type, typingDelay);
            }
        }
    }

    // Start the effect
    type();
});