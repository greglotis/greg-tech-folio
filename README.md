# Portfolio Greg - Technicien Infrastructure & Réseaux

Portfolio professionnel présentant les projets et compétences techniques de Greg, Technicien SISR (Services Informatiques aux Organisations - Solutions d'Infrastructure, Systèmes et Réseaux).

## 🚀 Technologies utilisées

- **React 18** avec TypeScript
- **Vite** pour un build ultra-rapide
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **React Router** pour la navigation

## 📋 Prérequis

- Node.js 18+ et npm
- Un serveur web (Nginx recommandé)
- Certificat SSL (Let's Encrypt)

## 🛠️ Installation en local

```bash
# Cloner le projet
git clone <votre-repo>
cd portfolio-greg

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build
```

## 🌐 Déploiement sur VPS Debian 12

### 1. Préparer le VPS

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Installer Nginx
sudo apt install -y nginx

# Installer Certbot pour Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Build du projet

```bash
# Sur votre machine locale ou sur le VPS
npm run build

# Le dossier 'dist' contient les fichiers statiques à déployer
```

### 3. Configuration Nginx

Créer le fichier `/etc/nginx/sites-available/portfolio-greg` :

```nginx
server {
    listen 80;
    server_name votre-domaine.fr www.votre-domaine.fr;
    
    root /var/www/portfolio-greg/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Activer le site :

```bash
sudo ln -s /etc/nginx/sites-available/portfolio-greg /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Déployer les fichiers

```bash
# Créer le dossier de destination
sudo mkdir -p /var/www/portfolio-greg

# Copier les fichiers (via SCP, Git, ou autre)
sudo cp -r dist/* /var/www/portfolio-greg/

# Définir les permissions
sudo chown -R www-data:www-data /var/www/portfolio-greg
sudo chmod -R 755 /var/www/portfolio-greg
```

### 5. Configurer SSL avec Let's Encrypt

```bash
# Obtenir et configurer le certificat SSL
sudo certbot --nginx -d votre-domaine.fr -d www.votre-domaine.fr

# Le renouvellement automatique est déjà configuré
# Tester le renouvellement :
sudo certbot renew --dry-run
```

### 6. Optimisations supplémentaires

#### A. Configurer le firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

#### B. Configuration Nginx avancée

Ajouter dans `/etc/nginx/nginx.conf` (section http) :

```nginx
# Sécurité
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;

# Performance
client_max_body_size 10M;
keepalive_timeout 65;
```

## 🐳 Déploiement Docker + Nginx

Si votre serveur dispose déjà de Docker et d'un reverse-proxy Nginx (cas d'usage courant sur un VPS), vous pouvez construire et
exécuter le portfolio dans un conteneur autonome. Le Dockerfile multi-étapes fourni génère le build optimisé Vite puis le sert
via Nginx.

### 1. Construire l'image

```bash
# Depuis la racine du projet
docker build -t greg-portfolio:latest .
```

### 2. Lancer le conteneur

```bash
# Exemple : exposer l'application sur le port 8080 de l'hôte
docker run -d \
  --name greg-portfolio \
  --restart unless-stopped \
  -p 8080:80 \
  greg-portfolio:latest
```

Le serveur Nginx embarqué sert les fichiers statiques sur le port 80 du conteneur. Exposez ce port selon votre architecture.

### 3. Intégrer avec votre reverse-proxy Nginx

Si un reverse-proxy Nginx externe est déjà en place (par exemple un conteneur séparé gérant plusieurs sites) :

```bash
# Placer les conteneurs sur le même réseau Docker
docker network create web || true
docker network connect web greg-portfolio
docker network connect web nginx-proxy   # adapter au nom de votre conteneur Nginx
```

Configurez ensuite votre vhost Nginx pour pointer vers `http://greg-portfolio:80`. Exemple minimal :

```nginx
location / {
    proxy_pass http://greg-portfolio:80;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Le conteneur peut être mis à jour en reconstruisant l'image puis en redémarrant :

```bash
docker build -t greg-portfolio:latest .
docker stop greg-portfolio && docker rm greg-portfolio
docker run -d --name greg-portfolio --restart unless-stopped -p 8080:80 greg-portfolio:latest
```

Pensez à automatiser le déploiement (GitHub Actions, GitLab CI, Watchtower…) pour maintenir l'application à jour.

## 📁 Structure du projet

```
portfolio-greg/
├── src/
│   ├── assets/           # Images et fichiers statiques
│   ├── components/       # Composants React réutilisables
│   │   ├── ui/          # Composants shadcn/ui
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/           # Pages du portfolio
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Certifications.tsx
│   │   ├── TechWatch.tsx
│   │   └── Contact.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/              # Fichiers publics (CV, etc.)
└── dist/               # Build de production (généré)
```

## 🎨 Personnalisation

### Couleurs
Le design system est défini dans `src/index.css` :
- Couleur principale : Anthracite `#383C40`
- Accent : Cyan moderne
- Police : Inter

### Contenu
Modifier les fichiers dans `src/pages/` pour personnaliser :
- **Home.tsx** : Page d'accueil et présentation
- **Projects.tsx** : Liste des projets
- **Skills.tsx** : Compétences techniques
- **Certifications.tsx** : Parcours de certifications professionnelles
- **TechWatch.tsx** : Veille technologique et axes de surveillance
- **Contact.tsx** : Formulaire de contact

### Administration du contenu
- Rendez-vous sur `/admin` (via le lien présent dans la navigation) pour ajouter, modifier ou supprimer des projets et compétences.
- Les modifications sont stockées dans votre navigateur (localStorage). Utilisez le bouton de réinitialisation pour revenir aux données par défaut.
- Exportez vos contenus en JSON depuis l'onglet Admin pour conserver une sauvegarde et réimportez-la sur un autre poste si besoin.

#### Importer vos données exportées en production
1. Déployez la dernière version du site (build Vite ou image Docker) sur votre serveur.
2. Ouvrez l'interface `/admin` directement sur l'URL de production (ex. `https://votre-domaine.fr/admin`).
3. Dans la carte « Sauvegarde JSON », cliquez sur **Importer un fichier JSON** puis sélectionnez le fichier exporté depuis votre machine.
4. Après confirmation via la notification, rechargez les pages publiques : vos projets et compétences personnalisés seront instantanément visibles dans ce navigateur.

> ℹ️ Les données sont stockées dans le `localStorage` du domaine. Répétez l'import depuis chaque navigateur qui doit afficher ces contenus personnalisés. Pour figer ces données pour tous les visiteurs, deux options :
> - déposer un fichier `portfolio-data.json` (voir ci-dessous) qui sera chargé automatiquement par toutes les sessions ;
> - ou remplacer manuellement les constantes `DEFAULT_PROJECTS` et `DEFAULT_SKILLS` dans `src/lib/portfolio-data.tsx` puis reconstruire et redéployer l'application.

#### Précharger un export JSON pour tous les visiteurs
1. Exportez vos données depuis `/admin` puis enregistrez le fichier sur votre poste.
2. Copiez ce fichier dans le projet sous le nom `public/portfolio-data.json` (vous pouvez vous baser sur l'exemple `public/portfolio-data.example.json`).
3. Rebuild l'application (`npm run build` ou `docker build ...`). Le fichier sera servi automatiquement et chargé au premier accès, même avant toute connexion à l'admin.
4. En production, vous pouvez mettre à jour le fichier sans rebuild en le remplaçant directement sur le serveur (ex. `/var/www/portfolio-greg/portfolio-data.json`) ou dans le conteneur Docker (`/usr/share/nginx/html/portfolio-data.json`).

> 💡 Lorsqu'un `portfolio-data.json` est présent, le bouton **Réinitialiser** de l'admin recharge ce fichier au lieu des données par défaut codées en dur.

## 🔒 Sécurité

- HTTPS forcé via Let's Encrypt
- Headers de sécurité configurés dans Nginx
- Protection contre les injections XSS
- Validation des inputs côté client

## 📈 Performance

- Build optimisé avec Vite
- Compression Gzip activée
- Cache des assets statiques (1 an)
- Images optimisées

## 🤝 Support

Pour toute question ou problème :
- Email : contact@greg-portfolio.fr
- LinkedIn : [Profil LinkedIn]

## 📄 Licence

Projet personnel - Tous droits réservés

---

**Développé avec ❤️ par Greg** | Technicien SISR
