/**
 * Portfolio Website - JavaScript
 * Includes Three.js 3D Background, GSAP Animations, and Interactive Features
 */

// ==========================================
// THREE.JS 3D BACKGROUND
// ==========================================

let scene, camera, renderer, particles, particleGeometry;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    const canvas = document.getElementById('three-bg');
    
    if (!canvas) return;
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create elegant geometry
    createElegantGeometry();
    
    // Animation loop
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
    
    // Handle mouse movement
    document.addEventListener('mousemove', onDocumentMouseMove);
}

let elegantMesh;

function createElegantGeometry() {
    // Create a simple, elegant wireframe torus knot
    const geometry = new THREE.TorusKnotGeometry(15, 3, 100, 16);
    
    // Elegant cyan material
    const material = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    
    elegantMesh = new THREE.Mesh(geometry, material);
    scene.add(elegantMesh);
    
    // Add a minimal amount of subtle floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 150;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x2dd4bf,
        size: 0.5,
        transparent: true,
        opacity: 0.4
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.1;
    mouseY = (event.clientY - windowHalfY) * 0.1;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate elegant mesh
    if (elegantMesh) {
        elegantMesh.rotation.x += 0.002;
        elegantMesh.rotation.y += 0.003;
    }
    
    if (particles) {
        particles.rotation.y += 0.001;
    }
    
    // Camera movement based on mouse
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// ==========================================
// GSAP ANIMATIONS
// ==========================================

function initGSAP() {
    // Register ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate hero elements on load
        animateHeroOnLoad();
        
        // Setup scroll animations
        setupScrollAnimations();
        
        // Setup skill bar animations
        setupSkillAnimations();
        
        // Setup counter animations
        setupCounterAnimations();
    }
}

function animateHeroOnLoad() {
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-description', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-buttons', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-stats-dock', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-ambient', {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    }, '-=1')
    .from('.scroll-indicator', {
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.5');
}

function setupScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.from(section.querySelectorAll('.section-header, .about-content, .skills-content, .projects-grid, .contact-wrapper'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 70%'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });
}

function setupSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillPercent = item.dataset.skill;
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(item.querySelector('.skill-progress'), {
                    width: skillPercent + '%',
                    duration: 1.5,
                    ease: 'power2.out'
                });
            },
            onLeaveBack: () => {
                gsap.to(item.querySelector('.skill-progress'), {
                    width: '0%',
                    duration: 0.5
                });
            }
        });
    });
}

function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const targetCount = parseInt(counter.dataset.count);
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: targetCount,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out',
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                    }
                });
            }
        });
    });
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================

function createParticlesDOM() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random colors
        const colors = ['#6366f1', '#ec4899', '#06b6d4', '#43e97b'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        particlesContainer.appendChild(particle);
    }
}

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile nav toggle
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Smooth scroll for nav links
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
                
                // Close mobile nav if open
                if (mobileNav.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// FORM HANDLING
// ==========================================

function initForms() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success message (in real app, send to server)
            console.log('Form submitted:', data);
            
            // Visual feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Pesan Terkirim!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
        
        // Input focus effects
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
}

// ==========================================
// PROJECTS MODULE
// ==========================================

function initProjects() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    let isExpanded = false;
    // We store the initially hidden projects so we can toggle them
    const hiddenProjects = document.querySelectorAll('.project-card.hidden-project');
    
    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isExpanded = !isExpanded;
        
        hiddenProjects.forEach(project => {
            if (isExpanded) {
                project.classList.remove('hidden-project');
            } else {
                project.classList.add('hidden-project');
            }
        });
        
        loadMoreBtn.querySelector('span').innerText = isExpanded ? 'Tampilkan Lebih Sedikit' : 'Lihat Selengkapnya';
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initThreeJS();
    initGSAP();
    createParticlesDOM();
    initNavigation();
    initForms();
    initProjects();
    
    console.log('Portfolio website initialized successfully!');
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (typeof THREE !== 'undefined') {
            // Three.js will naturally pause
        }
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement)) {
    const scrollElements = document.querySelectorAll('a[href^="#"]');
    scrollElements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = elem.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}