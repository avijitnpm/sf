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

// Button hover effects
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

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

// Add loading states for buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.classList.add('loading');
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416"/>
                </svg>
                Loading...
            `;
            this.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add CSS animation for spinner
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    @keyframes spin {
        to { stroke-dashoffset: 0; }
    }
`;
document.head.appendChild(spinnerStyle);

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

// Add hover effect for cards
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .report-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Securafill landing page loaded successfully');
});