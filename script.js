/* ==========================================================================
   NEURAL NETWORK CANVAS BACKGROUND
   ========================================================================== */
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 75;
const connectionDistance = 110;
const mouse = {
    x: null,
    y: null,
    radius: 150
};

// Set canvas dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1.5;
    }

    update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse interact (pull slightly)
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * 0.3;
                this.y -= (dy / dist) * force * 0.3;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.6)';
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? particleCount / 2 : particleCount;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

// Connect particles with lines
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                const alpha = (connectionDistance - dist) / connectionDistance;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                // Color gradient lines
                ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.15})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }

        // Connect particles to mouse
        if (mouse.x !== null && mouse.y !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance * 1.3) {
                const alpha = ((connectionDistance * 1.3) - dist) / (connectionDistance * 1.3);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(179, 136, 255, ${alpha * 0.25})`; // violet accent for mouse
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
}

// Listeners for canvas
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Run network
resizeCanvas();
animate();


/* ==========================================================================
   DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
const typewriterEl = document.getElementById('typewriter');
const roles = [
    'Applied AI Researcher',
    'Deep Learning Specialist',
    'Computer Vision Expert',
    'Generative Models Researcher'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Deleting characters
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40; // delete faster
    } else {
        // Typing characters
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85; // normal typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing role: pause before deleting
        isDeleting = true;
        typingSpeed = 2000; // delay at end of phrase
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting role: move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // pause before typing next phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 800);
});


/* ==========================================================================
   GLASS CARD SPOTLIGHT GLOW EFFECT
   ========================================================================== */
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});


/* ==========================================================================
   SCROLL SPY & REVEAL ANIMATIONS
   ========================================================================== */
const sections = document.querySelectorAll('main > section');
const navItems = document.querySelectorAll('.nav-item');

// ScrollSpy logic to highlight active link
function scrollSpy() {
    let currentActive = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - window.innerHeight * 0.3) {
            currentActive = section.getAttribute('id');
        }
    });

    if (currentActive) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentActive}`) {
                item.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', scrollSpy);

// Reveal elements on scroll
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve after showing
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal-element').forEach(el => {
    revealObserver.observe(el);
});


/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebarMenu = document.getElementById('sidebarMenu');

if (mobileMenuBtn && sidebarMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
        sidebarMenu.classList.toggle('open');
        e.stopPropagation();
        
        // Toggle icon state
        const icon = mobileMenuBtn.querySelector('i');
        if (sidebarMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarMenu.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebarMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebarMenu.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}


/* ==========================================================================
   COPY EMAIL TO CLIPBOARD
   ========================================================================== */
const copyEmailBtn = document.getElementById('copy-email-btn');
const copyEmailBottom = document.getElementById('copy-email-bottom');
const toast = document.getElementById('toast');

function copyEmailToClipboard() {
    const email = 'fredybar@ucm.es';
    
    navigator.clipboard.writeText(email)
        .then(() => {
            // Show toast
            toast.classList.add('show');
            
            // Hide toast after 3s
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        })
        .catch(err => {
            console.error('Failed to copy email: ', err);
        });
}

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', copyEmailToClipboard);
}
if (copyEmailBottom) {
    copyEmailBottom.addEventListener('click', copyEmailToClipboard);
}
