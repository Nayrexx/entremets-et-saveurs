// ══════════════════════════════════════════════════════════════════════════
// 🔥 FIREBASE LOADER - Charge les données admin sur le site
// ══════════════════════════════════════════════════════════════════════════

(function() {
    // Configuration Firebase - MÊME CONFIG QUE DANS ADMIN
    const firebaseConfig = {
        apiKey: "AIzaSyCPTfARbFsZTdRxNA5CohEEDrLLs4Bcb5Y",
        authDomain: "entremets-et-saveurs.firebaseapp.com",
        databaseURL: "https://entremets-et-saveurs-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "entremets-et-saveurs",
        storageBucket: "entremets-et-saveurs.firebasestorage.app",
        messagingSenderId: "445743402926",
        appId: "1:445743402926:web:c57d0f7a9fecb3b115023f"
    };

    // Ne pas initialiser si déjà fait ou non configuré
    if (typeof firebase === 'undefined' || firebaseConfig.apiKey.includes('XXXXX')) {
        console.log('Firebase non configuré - utilisation des valeurs par défaut');
        return;
    }

    // Initialiser Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();

    // ══════════════════════════════════════════════════════════════
    // CHARGER LES SETTINGS
    // ══════════════════════════════════════════════════════════════
    database.ref('settings').on('value', snapshot => {
        const settings = snapshot.val() || {};

        // Mode Noël
        if (settings.noelMode === false) {
            document.body.classList.remove('noel');
            const snowOverlay = document.querySelector('.snow-overlay');
            if (snowOverlay) snowOverlay.remove();
        } else {
            document.body.classList.add('noel');
        }

        // Neige
        if (settings.snowMode === false) {
            const snowOverlay = document.querySelector('.snow-overlay');
            if (snowOverlay) snowOverlay.style.display = 'none';
        } else {
            const snowOverlay = document.querySelector('.snow-overlay');
            if (snowOverlay) snowOverlay.style.display = 'block';
        }

        // Bandeau
        const banner = document.querySelector('.announcement-banner');
        if (banner) {
            banner.style.display = settings.bannerMode === false ? 'none' : 'block';
        }
    });

    // ══════════════════════════════════════════════════════════════
    // CHARGER LE BANDEAU
    // ══════════════════════════════════════════════════════════════
    database.ref('banner').on('value', snapshot => {
        const banner = snapshot.val() || {};
        
        // Mettre à jour le texte du bandeau
        if (banner.text) {
            const bannerSpans = document.querySelectorAll('.banner-text span');
            bannerSpans.forEach(span => {
                span.textContent = banner.text;
            });
        }

        // Mettre à jour le lien du popup
        if (banner.link) {
            const popupImg = document.querySelector('#buche-popup img');
            if (popupImg) {
                popupImg.src = banner.link;
            }
        }
    });

    // ══════════════════════════════════════════════════════════════
    // CHARGER LE HERO
    // ══════════════════════════════════════════════════════════════
    database.ref('hero').on('value', snapshot => {
        const hero = snapshot.val() || {};

        // Titre
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && hero.title) {
            // Conserver la structure avec l'accent
            const accent = hero.titleAccent || '& Saveurs';
            heroTitle.innerHTML = `${hero.title} <span class="accent">${accent}</span>`;
        }

        // Sous-titre
        const heroSubtitle = document.querySelector('.hero-description, .hero-subtitle');
        if (heroSubtitle && hero.subtitle) {
            heroSubtitle.textContent = hero.subtitle;
        }
    });

    // ══════════════════════════════════════════════════════════════
    // CHARGER LES COULEURS (CSS Variables)
    // ══════════════════════════════════════════════════════════════
    database.ref('colors').on('value', snapshot => {
        const colors = snapshot.val() || {};
        
        if (colors.primary) {
            document.documentElement.style.setProperty('--noel-rouge', colors.primary);
        }
        if (colors.secondary) {
            document.documentElement.style.setProperty('--noel-vert-fonce', colors.secondary);
        }
    });

    // ══════════════════════════════════════════════════════════════
    // CHARGER LES INFOS CONTACT
    // ══════════════════════════════════════════════════════════════
    database.ref('contact').on('value', snapshot => {
        const contact = snapshot.val() || {};

        // Email
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            if (contact.email) {
                link.href = `mailto:${contact.email}`;
                if (link.textContent.includes('@')) {
                    link.textContent = contact.email;
                }
            }
        });

        // Téléphone
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            if (contact.phone) {
                link.href = `tel:${contact.phone.replace(/\s/g, '')}`;
                if (link.textContent.match(/\d/)) {
                    link.textContent = contact.phone;
                }
            }
        });
    });

    console.log('🔥 Firebase Loader initialisé');

})();
