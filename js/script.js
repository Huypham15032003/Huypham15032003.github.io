// Cyberpunk Portfolio JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Close nav when clicking on a link
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for anchor links
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

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Glitch Effect on Hero Title
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        setInterval(() => {
            heroTitle.style.animation = 'none';
            setTimeout(() => {
                heroTitle.style.animation = 'glitch 0.3s ease-in-out';
            }, 10);
        }, 5000);
    }

    // Intersection Observer for fade-in animations
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

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Skill categories animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'scale(0.8)';
        skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skill.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(skill);
    });

    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                animateValue(target, 0, endValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Simple validation
            if (name && email && message) {
                // Show success message
                showNotification('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.', 'success');
                contactForm.reset();
            } else {
                showNotification('Vui lòng điền đầy đủ thông tin.', 'error');
            }
        });
    }

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'var(--cyber-cyan)' : 'var(--cyber-pink)'};
            color: var(--bg-primary);
            border-radius: 5px;
            box-shadow: 0 0 20px ${type === 'success' ? 'var(--cyber-cyan)' : 'var(--cyber-pink)'};
            z-index: 9999;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add keyframes for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Cursor Trail Effect (Cyberpunk particles)
    const createParticle = (x, y) => {
        const particle = document.createElement('div');
        const color = Math.random() > 0.5 ? 'var(--cyber-cyan)' : 'var(--cyber-pink)';

        particle.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 10px ${color};
            z-index: 9999;
            animation: particleFade 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    };

    // Particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-50px);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Mouse move particle effect (throttled)
    let lastParticleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastParticleTime > 100) {
            createParticle(e.clientX, e.clientY);
            lastParticleTime = now;
        }
    });

    // Random glitch effect on page load
    const glitchElements = document.querySelectorAll('.section-title');
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 0.2s ease-in-out';
            }, 10);
        }, Math.random() * 10000 + 5000);
    });

    // Add floating animation to avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.style.animation = 'float 6s ease-in-out infinite, border-flow 4s linear infinite';
    }

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    });

    console.log('%c🚀 SYSTEM INITIALIZED', 'color: #00f5ff; font-size: 16px; font-weight: bold;');
    console.log('%cCyberpunk Portfolio v2.0', 'color: #ff006e; font-size: 14px;');
});

