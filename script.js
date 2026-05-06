// Tokyo Ghoul Theme Management
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const themeMenu = document.querySelector('.theme-menu');
const themeOptions = document.querySelectorAll('.theme-option');
const html = document.documentElement;

// Load saved theme or default to gray (Kaneki theme)
const savedTheme = localStorage.getItem('ghoul-theme') || 'gray';
setTheme(savedTheme);

// Toggle theme menu - Kakugan activation
themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('active');
    
    // Add kakugan activation effect (visual feedback)
    themeToggleBtn.style.transform = 'scale(0.9) rotate(180deg)';
    themeToggleBtn.style.boxShadow = '0 0 60px var(--neon-glow), 0 0 100px var(--neon-glow)';
    setTimeout(() => {
        themeToggleBtn.style.transform = '';
        themeToggleBtn.style.boxShadow = '';
    }, 200);
});

// Close theme menu when clicking outside
document.addEventListener('click', (e) => {
    if (!themeMenu.contains(e.target) && !themeToggleBtn.contains(e.target)) {
        themeMenu.classList.remove('active');
    }
});

// Theme option selection - Kagune type selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        setTheme(theme);
        
        // Add kagune activation animation
        option.style.transform = 'scale(1.1)';
        option.style.boxShadow = '0 0 30px var(--neon-glow)';
        setTimeout(() => {
            option.style.transform = '';
            option.style.boxShadow = '';
            themeMenu.classList.remove('active');
        }, 300);
    });
});

// Set theme function
function setTheme(theme) {
    // Remove active class from all options
    themeOptions.forEach(opt => opt.classList.remove('active'));
    
    // Add active class to selected option
    const selectedOption = document.querySelector(`.theme-option[data-theme="${theme}"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');
    }
    
    // Apply theme to HTML element
    if (theme === 'gray') {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', theme);
    }
    
    // Save theme preference
    localStorage.setItem('ghoul-theme', theme);
    
    // Trigger theme change animation
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10);
}

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

// Navbar scroll effect with robot theme
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px var(--neon-glow)';
    } else {
        navbar.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.7), 0 0 60px var(--neon-glow)';
    }
    
    lastScroll = currentScroll;
});

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

// Observe service cards with stagger effect
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Robot Logo Animation - Interactive
const robotHead = document.querySelector('.robot-head');
const robotEyes = document.querySelectorAll('.eye');

if (robotHead) {
    robotHead.addEventListener('mouseenter', () => {
        robotEyes.forEach(eye => {
            eye.style.animation = 'none';
            eye.style.width = '10px';
            eye.style.height = '10px';
        });
    });

    robotHead.addEventListener('mouseleave', () => {
        robotEyes.forEach(eye => {
            eye.style.animation = 'eyeBlink 3s ease-in-out infinite';
            eye.style.width = '8px';
            eye.style.height = '8px';
        });
    });
}

// Terminal typing effect
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
        line.style.opacity = '1';
        line.style.animation = 'typewriter 0.5s steps(30)';
    }, index * 300);
});

// Service card hover effects - Enhanced
document.querySelectorAll('.service-card').forEach(card => {
    const statusLed = card.querySelector('.status-led');
    const moduleId = card.querySelector('.module-id');
    
    card.addEventListener('mouseenter', () => {
        if (statusLed) {
            statusLed.style.animation = 'ledBlink 0.3s ease-in-out infinite';
        }
        if (moduleId) {
            moduleId.style.letterSpacing = '3px';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (statusLed) {
            statusLed.style.animation = 'ledBlink 2s ease-in-out infinite';
        }
        if (moduleId) {
            moduleId.style.letterSpacing = '2px';
        }
    });
});

// Glitch effect on hover for titles
const glitchElements = document.querySelectorAll('.glitch');
glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitch 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'glitch 5s infinite';
    });
});

// CTA Button - Robot activation effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = ctaButton.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        ctaButton.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact button pulse effect
const contactButtons = document.querySelectorAll('.contact-button');
contactButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        const pulse = button.querySelector('.button-pulse');
        if (pulse) {
            pulse.style.animation = 'buttonPulse 0.5s ease-out infinite';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        const pulse = button.querySelector('.button-pulse');
        if (pulse) {
            pulse.style.animation = 'buttonPulse 2s ease-out infinite';
        }
    });
});

// Random circuit line animation
function createCircuitAnimation() {
    const circuitLines = document.querySelector('.circuit-lines');
    if (circuitLines) {
        setInterval(() => {
            const randomOpacity = 0.03 + Math.random() * 0.05;
            circuitLines.style.opacity = randomOpacity;
        }, 3000);
    }
}

createCircuitAnimation();

// Floating gears - Mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const gears = document.querySelectorAll('.gear');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    gears.forEach((gear, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        gear.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Status indicators animation
const statusDots = document.querySelectorAll('.status-dot');
statusDots.forEach((dot, index) => {
    setInterval(() => {
        dot.style.transform = 'scale(1.3)';
        setTimeout(() => {
            dot.style.transform = 'scale(1)';
        }, 200);
    }, 2000 + (index * 500));
});

// Signal bars - Interactive
const signalBars = document.querySelectorAll('.signal-bar');
signalBars.forEach((bar, index) => {
    bar.addEventListener('mouseenter', () => {
        signalBars.forEach((b, i) => {
            if (i <= index) {
                b.style.opacity = '1';
                b.style.transform = 'scaleY(1.2)';
            }
        });
    });
    
    bar.addEventListener('mouseleave', () => {
        signalBars.forEach(b => {
            b.style.opacity = '';
            b.style.transform = '';
        });
    });
});

// Easter egg - Konami code for special kakuja mode
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateKakujaMode();
    }
});

function activateKakujaMode() {
    // Special kakuja activation
    document.body.style.animation = 'glitch 0.5s infinite';
    document.body.style.filter = 'hue-rotate(180deg)';
    
    setTimeout(() => {
        document.body.style.animation = '';
        document.body.style.filter = '';
        alert('👁️ KAKUJA MODE ACTIVATED! 👁️\nRC Cells overflowing!\n"The world is wrong... or maybe I am."');
    }, 2000);
}

// Console message for developers - Tokyo Ghoul themed
console.log('%c👁️ GHOUL SYSTEM AWAKENED 👁️', 'color: #dc2626; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #dc2626;');
console.log('%cWelcome to PaperClip\'s Tokyo Ghoul Portfolio!', 'color: #ef4444; font-size: 14px;');
console.log('%c"I\'m not the protagonist of a novel or anything. I\'m just a college student who likes to read..."', 'color: #fca5a5; font-size: 12px; font-style: italic;');
console.log('%cTry the Konami code for Kakuja mode! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #ffffff; font-size: 12px;');

// Performance optimization - Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-speed', '0.5');
}

// Initialize all animations on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
    }, 100);
});
