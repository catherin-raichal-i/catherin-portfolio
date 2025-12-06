// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        navMenu.classList.remove('active');
    });
});

// Circular Skills Animation
const circularSkills = document.querySelectorAll('.circular-skill');

// Create SVG gradient definition
const createGradient = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.width = '0';
    svg.style.height = '0';
    svg.style.position = 'absolute';

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#6366f1;stop-opacity:1');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:#ec4899;stop-opacity:1');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    document.body.appendChild(svg);
};

createGradient();

// Animate circular skills on scroll
const animateSkills = () => {
    circularSkills.forEach((skill, index) => {
        const skillTop = skill.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillTop < windowHeight - 100 && !skill.classList.contains('animate')) {
            setTimeout(() => {
                skill.classList.add('animate');
                const percent = parseInt(skill.getAttribute('data-percent'));
                const circle = skill.querySelector('.skill-circle-progress');
                const circumference = 2 * Math.PI * 85; // radius is 85
                const offset = circumference - (percent / 100) * circumference;

                // Animate the circle
                circle.style.strokeDashoffset = offset;

                // Animate the percentage number
                animateValue(skill.querySelector('.skill-percent'), 0, percent, 2000);
            }, index * 150); // Stagger animation
        }
    });
};

// Animate number counting
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateOnScroll = document.querySelectorAll('.skill-category, .project-card, .highlight-item, .contact-method');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Parallax effect for gradient orbs
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero subtitle

setTimeout(() => {
    new Typed(".hero-subtitle", {
        strings: ["Front End Developer", "Java Developer", "SQL Developer",],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
        showCursor: false
    });
}, 1000);

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add pulse animation to buttons on hover
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.animation = 'pulse 0.5s ease-in-out';
    });

    btn.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

// Add CSS for pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Scroll reveal for stats
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    const statsSection = document.querySelector('.hero-stats');
    //const statsTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // if (statsTop < windowHeight && !statsAnimated) {
    //     statsAnimated = true;
    //     stats.forEach((stat, index) => {
    //         const finalValue = parseInt(stat.textContent);
    //         stat.textContent = '0';

    //         setTimeout(() => {
    //             animateValue(stat, 0, finalValue, 2000);
    //         }, index * 200);
    //     });
    //}
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Add smooth reveal for sections
const sections2 = document.querySelectorAll('section');
sections2.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 1s ease-out';
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections2.forEach(section => {
    sectionObserver.observe(section);
});

// console.log('Portfolio loaded successfully! ✨');

