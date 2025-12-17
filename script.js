// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = () => {
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    
    if (!navLinks.classList.contains('active')) {
        navLinks.classList.add('active');
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navLinks.classList.remove('active');
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
};

// Add mobile menu button if it doesn't exist
const addMobileMenuButton = () => {
    const navContainer = document.querySelector('.nav-container');
    const existingButton = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 768 && !existingButton) {
        const mobileButton = document.createElement('button');
        mobileButton.className = 'mobile-menu-toggle';
        mobileButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        mobileButton.addEventListener('click', mobileMenuToggle);
        navContainer.appendChild(mobileButton);
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-toggle {
                display: block;
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 80px;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .nav-links.active {
                display: flex;
            }
            
            @media (min-width: 769px) {
                .mobile-menu-toggle {
                    display: none !important;
                }
                
                .nav-links {
                    display: flex !important;
                    position: static;
                    background: none;
                    flex-direction: row;
                    padding: 0;
                    box-shadow: none;
                }
            }
        `;
        document.head.appendChild(style);
    } else if (window.innerWidth > 768 && existingButton) {
        existingButton.remove();
    }
};

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu button
    addMobileMenuButton();
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.step, .feature-card, .report-card, .testimonial-card, .pricing-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stagger animations for grids
    const grids = document.querySelectorAll('.features-grid, .testimonials-grid, .pricing-grid');
    grids.forEach(grid => {
        const cards = grid.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
});

// Parallax effect for hero shapes
const parallaxShapes = () => {
    const shapes = document.querySelectorAll('.abstract-shape');
    const scrolled = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
};

// Throttle function for performance
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Scroll events
window.addEventListener('scroll', throttle(() => {
    parallaxShapes();
}, 16));

// Resize events
window.addEventListener('resize', throttle(() => {
    addMobileMenuButton();
}, 250));

// Remove button hover animations

// Form interactions (for future forms)
const handleFormFocus = (input) => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
};

// Remove button loading animations - not needed

// Remove spinner animation CSS

// Smooth reveal for section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    
    titleObserver.observe(title);
});

// Remove card hover animations

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Securafill landing page loaded successfully');
});