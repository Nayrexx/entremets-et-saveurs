const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3001;

// Chemins
const DATA_FILE = path.join(__dirname, 'data.json');
const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Configuration Multer pour upload d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, IMAGES_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Seules les images sont autorisées!'));
        }
    }
});

// Lire les données
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lecture data.json:', error);
        return null;
    }
}

// Sauvegarder les données
function saveData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Erreur sauvegarde data.json:', error);
        return false;
    }
}

// ===== ROUTES API =====

// Obtenir toutes les données (pour le site)
app.get('/api/data', (req, res) => {
    const data = readData();
    if (data) {
        // Ne pas envoyer le mot de passe admin
        const { admin, ...publicData } = data;
        res.json(publicData);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === AUTHENTIFICATION ===
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const data = readData();
    
    if (data && data.admin.username === username && data.admin.password === password) {
        res.json({ success: true, message: 'Connexion réussie' });
    } else {
        res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }
});

// === PARAMÈTRES ===
app.get('/api/settings', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.settings);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/settings', (req, res) => {
    const data = readData();
    if (data) {
        data.settings = { ...data.settings, ...req.body };
        if (saveData(data)) {
            res.json({ success: true, settings: data.settings });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === BANDEAU ===
app.get('/api/banner', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.banner);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/banner', (req, res) => {
    const data = readData();
    if (data) {
        data.banner = { ...data.banner, ...req.body };
        if (saveData(data)) {
            res.json({ success: true, banner: data.banner });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === HERO ===
app.get('/api/hero', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.hero);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/hero', (req, res) => {
    const data = readData();
    if (data) {
        data.hero = { ...data.hero, ...req.body };
        if (saveData(data)) {
            res.json({ success: true, hero: data.hero });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === SERVICES ===
app.get('/api/services', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.services);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/services', (req, res) => {
    const data = readData();
    if (data) {
        data.services = { ...data.services, ...req.body };
        if (saveData(data)) {
            res.json({ success: true, services: data.services });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === ABOUT ===
app.get('/api/about', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.about);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/about', (req, res) => {
    const data = readData();
    if (data) {
        data.about = { ...data.about, ...req.body };
        if (saveData(data)) {
            res.json({ success: true, about: data.about });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === CONTACT ===
app.get('/api/contact', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.contact);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/contact', (req, res) => {
    const data = readData();
    if (data) {
        data.contact = { ...data.contact, ...req.body };
        if (saveData(data)) {
            res.json({ success: true, contact: data.contact });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === COULEURS ===
app.get('/api/colors', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.colors);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.put('/api/colors', (req, res) => {
    const data = readData();
    if (data) {
        data.colors = { ...data.colors, ...req.body };
        if (saveData(data)) {
            res.json({ success: true, colors: data.colors });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === GALERIE ===
app.get('/api/gallery', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.gallery);
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/api/gallery', upload.single('image'), (req, res) => {
    const data = readData();
    if (data && req.file) {
        const newImage = {
            id: Date.now(),
            src: 'assets/images/' + req.file.filename,
            title: req.body.title || 'Nouvelle image',
            category: req.body.category || 'pastries'
        };
        data.gallery.push(newImage);
        if (saveData(data)) {
            res.json({ success: true, image: newImage });
        } else {
            res.status(500).json({ error: 'Erreur sauvegarde' });
        }
    } else {
        res.status(400).json({ error: 'Image requise' });
    }
});

app.delete('/api/gallery/:id', (req, res) => {
    const data = readData();
    if (data) {
        const imageId = parseInt(req.params.id);
        const imageIndex = data.gallery.findIndex(img => img.id === imageId);
        
        if (imageIndex !== -1) {
            // Optionnel: supprimer le fichier physique
            // const imagePath = path.join(__dirname, '..', data.gallery[imageIndex].src);
            // fs.unlinkSync(imagePath);
            
            data.gallery.splice(imageIndex, 1);
            if (saveData(data)) {
                res.json({ success: true });
            } else {
                res.status(500).json({ error: 'Erreur sauvegarde' });
            }
        } else {
            res.status(404).json({ error: 'Image non trouvée' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === CHANGER MOT DE PASSE ===
app.put('/api/password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const data = readData();
    
    if (data) {
        if (data.admin.password === currentPassword) {
            data.admin.password = newPassword;
            if (saveData(data)) {
                res.json({ success: true, message: 'Mot de passe modifié' });
            } else {
                res.status(500).json({ error: 'Erreur sauvegarde' });
            }
        } else {
            res.status(401).json({ error: 'Mot de passe actuel incorrect' });
        }
    } else {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// === LISTE DES IMAGES ===
app.get('/api/images', (req, res) => {
    fs.readdir(IMAGES_DIR, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Erreur lecture dossier images' });
        } else {
            const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
            res.json(images.map(file => ({
                name: file,
                path: 'assets/images/' + file
            })));
        }
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log('');
    console.log('🎄 ═══════════════════════════════════════════════════════════');
    console.log('   SERVEUR ENTREMETS & SAVEURS');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log(`   🌐 Site web:     http://localhost:${PORT}`);
    console.log(`   🔧 Admin:        http://localhost:${PORT}/admin.html`);
    console.log(`   📡 API:          http://localhost:${PORT}/api/data`);
    console.log('');
    console.log('   Identifiants admin par défaut:');
    console.log('   👤 Utilisateur:  admin');
    console.log('   🔑 Mot de passe: entremets2024');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════ 🎄');
    console.log('');
});
