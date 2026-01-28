# 🧾 Invoice Template Generator

## Générateur de Template de Facture avec UI Drag-and-Drop

### ✅ Fonctionnalités Implémentées

Ce projet répond à tous les besoins spécifiés dans le cahier des charges :

#### 1. **Interface Utilisateur Professionnelle**
- Design inspiré de Replit avec thème sombre moderne (Catppuccin)
- Interface propre, simple et professionnelle
- Animations fluides et transitions élégantes

#### 2. **Système Drag-and-Drop Complet**
- Glisser-déposer des champs depuis la barre latérale vers le canvas
- Repositionnement des champs sur le canvas
- Suppression facile des champs (bouton ×)
- Indicateurs visuels pendant le glissement

#### 3. **Support des Attributs Imbriqués**
- Accès complet aux attributs imbriqués : `invoice.customer.address`
- Support de tous les niveaux d'imbrication : `invoice.company.name`, `invoice.customer.city`, etc.
- Plus de 20 champs disponibles organisés par catégorie

#### 4. **Mode Loop pour les Items**
- Champ spécial "Items (Loop)" pour les tableaux d'éléments
- Rendu automatique sous forme de tableau avec colonnes :
  - Description
  - Quantité
  - Prix unitaire
  - Total
- Indicateur visuel distinct pour les champs de type loop

#### 5. **Fonctionnalités Avancées**
- **Prévisualisation en direct** : Voir le template avec des données réelles
- **Export JSON** : Sauvegarder la configuration du template
- **TypeScript** : Sécurité de type complète
- **Données d'exemple** : Invoice sample inclus pour les tests

### 📁 Structure du Projet

```
invoice_template/
├── src/
│   ├── App.tsx              # Composant principal
│   ├── App.css              # Styles professionnels
│   ├── Canvas.tsx           # Zone de dépôt drag-and-drop
│   ├── Sidebar.tsx          # Palette de champs
│   ├── FieldItem.tsx        # Champ draggable
│   ├── DroppedFieldComponent.tsx  # Champ déposé
│   ├── Preview.tsx          # Aperçu avec données
│   ├── types.ts             # Types TypeScript
│   ├── fields.ts            # Configuration des champs
│   └── sampleData.ts        # Données d'exemple
├── package.json             # Dépendances
├── tsconfig.json            # Configuration TypeScript
├── vite.config.ts           # Configuration Vite
├── README.md                # Documentation principale
└── USAGE.md                 # Guide d'utilisation détaillé
```

### 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Démarrage serveur dev
npm run dev

# Build production
npm run build
```

### 🎨 Technologies Utilisées

- **React 18** : Framework UI moderne
- **TypeScript 5** : Typage statique
- **Vite 5** : Build tool ultra-rapide
- **react-dnd 16** : Système drag-and-drop
- **CSS3** : Styles modernes avec thème Catppuccin

### 📊 Format des Données

Le générateur travaille avec un descripteur JSON de facture :

```typescript
interface Invoice {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  company: {
    name, email, phone, address, city, country, zipCode, taxId
  };
  customer: {
    name, email, address, city, country, zipCode
  };
  items: Array<{
    description, quantity, unitPrice, total
  }>;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}
```

### ✨ Caractéristiques de l'UI

- **Thème sombre professionnel** : Inspiré de Replit
- **Couleurs cohérentes** : Palette Catppuccin Mocha
- **Feedback visuel** : Hover effects, transitions, indicateurs
- **Responsive** : Canvas A4 (595x842px) centré
- **Catégories organisées** : Champs groupés logiquement
- **États visuels** : Sélection, survol, glissement

### 🔒 Qualité et Sécurité

✅ **0 erreurs TypeScript**
✅ **0 problèmes de code review**
✅ **0 vulnérabilités de sécurité**
✅ **Build optimisé** : 61.32 kB gzippé

### 📝 Utilisation

1. Lancer le serveur : `npm run dev`
2. Ouvrir http://localhost:5173
3. Glisser des champs de la barre latérale vers le canvas
4. Positionner les champs où vous voulez
5. Cliquer sur "Preview with Data" pour voir le résultat
6. Exporter le template en JSON si besoin

### 🎯 Objectifs Atteints

✅ UI jolie, simple et professionnelle
✅ Système de glisser-déposer intuitif
✅ Support complet des attributs imbriqués
✅ Mode loop pour les items
✅ TypeScript pour la robustesse
✅ Style inspiré de Replit
✅ Prévisualisation en direct
✅ Export de templates

---

**Projet complètement fonctionnel et prêt à l'emploi !** 🎉
