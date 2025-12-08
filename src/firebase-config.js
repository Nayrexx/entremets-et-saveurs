// === FIREBASE CONFIGURATION ===
// Remplace ces valeurs par celles de ton projet Firebase
// Va sur https://console.firebase.google.com/ pour créer un projet

const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_PROJET.firebaseapp.com",
    databaseURL: "https://VOTRE_PROJET-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "VOTRE_PROJET",
    storageBucket: "VOTRE_PROJET.appspot.com",
    messagingSenderId: "VOTRE_SENDER_ID",
    appId: "VOTRE_APP_ID"
};

/*
=== INSTRUCTIONS POUR CONFIGURER FIREBASE ===

1. Va sur https://console.firebase.google.com/
2. Clique sur "Créer un projet" ou "Add project"
3. Donne un nom au projet (ex: entremets-saveurs)
4. Désactive Google Analytics si tu veux (optionnel)
5. Une fois le projet créé :

   A) ACTIVER REALTIME DATABASE :
      - Dans le menu à gauche, clique sur "Build" > "Realtime Database"
      - Clique sur "Create Database"
      - Choisis "Europe" comme emplacement
      - Choisis "Start in test mode" (pour commencer)
      - Clique sur "Enable"

   B) RÉCUPÉRER LA CONFIGURATION :
      - Clique sur l'icône ⚙️ (engrenage) > "Project settings"
      - Descends jusqu'à "Your apps"
      - Clique sur l'icône </> (Web)
      - Donne un nom à l'app (ex: admin-web)
      - Copie les valeurs de firebaseConfig et colle-les ci-dessus

   C) CONFIGURER LES RÈGLES DE SÉCURITÉ :
      - Va dans "Realtime Database" > "Rules"
      - Remplace le contenu par :
      
      {
        "rules": {
          ".read": true,
          ".write": "auth != null",
          "admin": {
            ".read": false,
            ".write": "auth != null"
          }
        }
      }

   D) ACTIVER L'AUTHENTIFICATION (optionnel mais recommandé) :
      - Va dans "Build" > "Authentication"
      - Clique sur "Get started"
      - Active "Email/Password"

6. Remplace les valeurs dans firebaseConfig ci-dessus
7. C'est prêt !

*/

export default firebaseConfig;
