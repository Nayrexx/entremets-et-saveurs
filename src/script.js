// === GLOBAL VARIABLES ===
let currentImageIndex = 0;
let galleryImages = [];
let isLoading = false;
let navbarHeight = 0;

// === GALLERY DATA ===
const galleryData = [
    {
        id: 1,
        src: 'assets/images/traiteur.jpg',
        title: 'Service Traiteur',
        category: 'catering',
        description: 'Nos créations fraîches pour vos événements'
    },
    {
        id: 2,
        src: 'assets/images/macaron.jpg',
        title: 'Macarons Artisanaux',
        category: 'macarons',
        description: 'Assortiment de macarons aux saveurs variées'
    },
    {
        id: 3,
        src: 'assets/images/gateau halloween.jpg',
        title: 'Gâteau Halloween',
        category: 'cakes',
        description: 'Créations saisonnières sur mesure'
    },
    {
        id: 4,
        src: 'assets/images/gateauuu.jpg',
        title: 'Gâteaux Gourmands',
        category: 'cakes',
        description: 'Gâteaux personnalisés pour célébrer vos moments spéciaux'
    },
    {
        id: 5,
        src: 'assets/images/artisan.jpg',
        title: 'Savoir-faire Artisanal',
        category: 'pastries',
        description: 'Notre maître pâtissier au travail'
    },
    {
        id: 7,
        src: 'assets/images/traiteur2.jpg',
        title: 'Buffet Traiteur',
        category: 'catering',
        description: 'Service complet pour vos événements'
    },
    {
        id: 10,
        src: 'assets/images/traiteur3.jpg',
        title: 'Cocktails Dinatoires',
        category: 'catering',
        description: 'Assortiment de mignardises pour réceptions'
    },
    {
        id: 12,
        src: 'assets/images/mariage.jpg',
        title: 'Gâteau de Mariage',
        category: 'wedding',
        description: 'Création unique pour votre jour J'
    },
    {
        id: 13,
        src: 'assets/images/mariage2.jpg',
        title: 'Pièce Montée Élégante',
        category: 'wedding',
        description: 'Pièce montée sur mesure pour votre cérémonie'
    },
    {
        id: 14,
        src: 'assets/images/gateau3.jpg',
        title: 'Gâteau Signature',
        category: 'cakes',
        description: 'Nos créations signature aux saveurs uniques'
    },
    {
        id: 15,
        src: 'assets/images/patisserie.jpg',
        title: 'Pâtisseries Artisanales',
        category: 'pastries',
        description: 'Nos créations pâtissières traditionnelles'
    },
    {
        id: 16,
        src: 'assets/images/exotique dacquoise coco mousse mangue passion insert framboise.jpg',
        title: 'Entremet Exotique',
        category: 'cakes',
        description: 'Dacquoise coco, mousse mangue passion et insert framboise'
    },
    {
        id: 17,
        src: 'assets/images/macaron1.jpg',
        title: 'Macarons Colorés',
        category: 'macarons',
        description: 'Collection de macarons aux couleurs vives'
    },
    {
        id: 18,
        src: 'assets/images/macaron2.jpg',
        title: 'Macarons Raffinés',
        category: 'macarons',
        description: 'Macarons élégants aux saveurs sophistiquées'
    }
];

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize gallery
    initGallery();
    
    // Initialize forms
    initContactForm();
    
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize modals
    initModals();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Set navbar height
    navbarHeight = document.querySelector('.navbar').offsetHeight;
});

// === LOADING SCREEN ===
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        document.body.style.overflow = 'visible';
        
        // Remove loading screen after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2500);
}

// === NAVIGATION ===
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollY = window.scrollY;
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        });
    });
    
    // Navbar scroll effects
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Active navigation link
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// === GALLERY ===
function initGallery() {
    loadGalleryImages();
    initGalleryFilters();
}

function loadGalleryImages(filter = 'all', append = false) {
    const galleryGrid = document.getElementById('gallery-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!append) {
        galleryGrid.innerHTML = '';
        galleryImages = [];
    }
    
    const filteredImages = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
    const startIndex = append ? galleryImages.length : 0;
    const endIndex = Math.min(startIndex + 6, filteredImages.length);
    const imagesToShow = filteredImages.slice(startIndex, endIndex);
    
    imagesToShow.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, startIndex + index);
        galleryGrid.appendChild(galleryItem);
        galleryImages.push(item);
        
        // Animate item appearance
        setTimeout(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Update load more button
    if (endIndex >= filteredImages.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => loadGalleryImages(filter, true);
    }
}

function createGalleryItem(item, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.opacity = '0';
    galleryItem.style.transform = 'translateY(30px)';
    galleryItem.style.transition = 'all 0.5s ease';
    galleryItem.setAttribute('data-category', item.category);
    
    galleryItem.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `;
    
    galleryItem.addEventListener('click', () => openLightbox(index));
    
    return galleryItem;
}

function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery
            const filter = btn.getAttribute('data-filter');
            loadGalleryImages(filter);
        });
    });
}

// === LIGHTBOX ===
function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const image = document.getElementById('lightbox-image');
    const caption = document.querySelector('.lightbox-caption');
    
    const currentImage = galleryImages[currentImageIndex];
    image.src = currentImage.src;
    image.alt = currentImage.title;
    caption.innerHTML = `<h4>${currentImage.title}</h4><p>${currentImage.description}</p>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'visible';
    document.removeEventListener('keydown', handleLightboxKeydown);
}

function handleLightboxKeydown(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    const image = document.getElementById('lightbox-image');
    const caption = document.querySelector('.lightbox-caption');
    const currentImage = galleryImages[currentImageIndex];
    
    // Fade out
    image.style.opacity = '0';
    setTimeout(() => {
        image.src = currentImage.src;
        image.alt = currentImage.title;
        caption.innerHTML = `<h4>${currentImage.title}</h4><p>${currentImage.description}</p>`;
        image.style.opacity = '1';
    }, 150);
}

// === CONTACT FORM ===
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message envoyé avec succès! Nous vous répondrons rapidement.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    
    // Form validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearFieldError(e);
    
    if (!value) {
        showFieldError(field, 'Ce champ est requis');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Veuillez entrer une adresse email valide');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#e91e63';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#e91e63';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// === NOTIFICATIONS ===
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: auto;">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// === ANIMATIONS ===
function initAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Counter animations
    initCounterAnimations();
    
    // Parallax effects
    initParallaxEffects();
}

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (target - start) * easeOutCubic(progress));
        element.textContent = current + (element.textContent.includes('+') ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
    // Smooth reveal animations for elements
    const revealElements = document.querySelectorAll('section > .container > *:not(.section-header)');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(element);
    });
}

// === MODALS ===
function initModals() {
    // Lightbox navigation
    document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Close modals on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'visible';
    document.removeEventListener('keydown', handleLightboxKeydown);
}

// === VIDEO MODAL ===
function openVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-frame');
    
    // Replace with actual video URL
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-frame');
    
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = 'visible';
}

// === BACK TO TOP ===
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === SMOOTH SCROLLING ===
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === UTILITY FUNCTIONS ===
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// === PRIVACY & COOKIES ===
function openPrivacyModal() {
    showNotification('Modal de confidentialité ouvert (fonctionnalité à implémenter)', 'info');
}

function openCookieSettings() {
    showNotification('Paramètres des cookies ouverts (fonctionnalité à implémenter)', 'info');
}

// === PERFORMANCE OPTIMIZATION ===
// Lazy loading images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
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
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'assets/images/hero-bg.jpg',
        'assets/images/patissier.jpg'
    ];
    
    criticalResources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you would send this to an error logging service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, you would send this to an error logging service
});

// === SERVICE WORKER REGISTRATION (for PWA capabilities) ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// === FORMULAS REVEAL FUNCTIONALITY ===
function initFormulasReveal() {
    const revealBtn = document.getElementById('reveal-formulas-btn');
    const formulasContainer = document.getElementById('formulas-container');
    
    if (revealBtn && formulasContainer) {
        revealBtn.addEventListener('click', function() {
            const isVisible = formulasContainer.classList.contains('visible');
            const chevron = revealBtn.querySelector('.fa-chevron-down');
            const buttonText = revealBtn.querySelector('span');
            
            if (isVisible) {
                // Masquer les formules
                formulasContainer.classList.remove('visible');
                formulasContainer.classList.add('hidden');
                revealBtn.classList.remove('active');
                buttonText.textContent = 'Choisissez votre formule';
                chevron.style.transform = 'rotate(0deg)';
            } else {
                // Afficher les formules
                formulasContainer.classList.remove('hidden');
                formulasContainer.classList.add('visible');
                revealBtn.classList.add('active');
                buttonText.textContent = 'Masquer les formules';
                chevron.style.transform = 'rotate(180deg)';
                
                // Scroll vers les formules après l'animation
                setTimeout(() => {
                    formulasContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
        });
    }
}

// Fonction pour révéler automatiquement les formules si on arrive avec #anniversaires
function checkAndRevealFormulas() {
    if (window.location.hash === '#anniversaires') {
        const formulasContainer = document.getElementById('formulas-container');
        const revealBtn = document.getElementById('reveal-formulas-btn');
        
        if (formulasContainer && revealBtn) {
            // Délai pour permettre à la page de charger complètement
            setTimeout(() => {
                formulasContainer.classList.remove('hidden');
                formulasContainer.classList.add('visible');
                revealBtn.classList.add('active');
                
                const chevron = revealBtn.querySelector('.fa-chevron-down');
                const buttonText = revealBtn.querySelector('span');
                
                if (buttonText) buttonText.textContent = 'Masquer les formules';
                if (chevron) chevron.style.transform = 'rotate(180deg)';
                
                // Scroll vers les formules
                setTimeout(() => {
                    formulasContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 500);
            }, 100);
        }
    }
}

// === HALLOWEEN THEME (Uniquement sur l'écran de chargement) ===
function initHalloweenLoadingTheme() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const halloweenEnd = new Date(currentYear, 10, 1); // 1er novembre (mois 10 = novembre)
    
    // Activer le thème si on est avant le 1er novembre
    if (today < halloweenEnd) {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('halloween-theme');
            
            // Créer le conteneur de décorations
            const decorationsContainer = document.createElement('div');
            decorationsContainer.className = 'halloween-loading-decorations';
            loadingScreen.appendChild(decorationsContainer);
            
            // Créer la toile d'araignée
            const web = document.createElement('div');
            web.className = 'halloween-web';
            loadingScreen.appendChild(web);
            
            // Ajouter des citrouilles flottantes
            const pumpkins = ['🎃', '🎃', '🎃'];
            pumpkins.forEach((emoji, index) => {
                const pumpkin = document.createElement('div');
                pumpkin.className = 'halloween-pumpkin';
                pumpkin.textContent = emoji;
                pumpkin.style.left = `${15 + index * 30}%`;
                pumpkin.style.top = `${20 + index * 15}%`;
                pumpkin.style.animationDelay = `${index * 2}s`;
                decorationsContainer.appendChild(pumpkin);
            });
            
            // Ajouter des fantômes
            const ghosts = ['👻', '👻'];
            ghosts.forEach((emoji, index) => {
                const ghost = document.createElement('div');
                ghost.className = 'halloween-ghost';
                ghost.textContent = emoji;
                ghost.style.left = `${70 + index * 15}%`;
                ghost.style.top = `${30 + index * 20}%`;
                ghost.style.animationDelay = `${index * 3}s`;
                decorationsContainer.appendChild(ghost);
            });
            
            // Ajouter des chauves-souris
            const bats = ['🦇', '🦇', '🦇'];
            bats.forEach((emoji, index) => {
                const bat = document.createElement('div');
                bat.className = 'halloween-bat';
                bat.textContent = emoji;
                bat.style.top = `${10 + index * 25}%`;
                bat.style.animationDelay = `${index * 4}s`;
                decorationsContainer.appendChild(bat);
            });
            
            // Ajouter des araignées
            const spiders = ['🕷️', '🕷️'];
            spiders.forEach((emoji, index) => {
                const spider = document.createElement('div');
                spider.className = 'halloween-spider';
                spider.textContent = emoji;
                spider.style.left = `${25 + index * 50}%`;
                spider.style.animationDelay = `${index * 5}s`;
                decorationsContainer.appendChild(spider);
            });
            
            console.log('🎃 Thème Halloween activé sur l\'écran de chargement jusqu\'au 1er novembre ! 👻');
        }
    }
}

// Initialiser la fonctionnalité au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initFormulasReveal();
    checkAndRevealFormulas();
    initHalloweenLoadingTheme();
});
