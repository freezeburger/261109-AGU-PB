# Rapport 001 — Bibliothèque de composants UI partagés

- **Tâche** : [`workflow/tasks/001-composants-ui.md`](../tasks/001-composants-ui.md)
- **Prompt** : [`workflow/prompts/001-COMPOSANTS.md`](../prompts/001-COMPOSANTS.md)
- **Statut** : ✅ terminée
- **Date** : 2026-11-12

## 1. Résumé

19 composants UI standalone (niveau « junior », signaux `input()` / `output()` / `model()`)
ont été créés ou complétés dans `src/app/shared/components/`, sans aucune dépendance externe.
Le style s'inspire de PrimeNG et de l'identité be.brussels (bleu `--primary-color`,
jaune `--accent-color`), modernisé par `color-mix()`, des rayons arrondis, des ombres douces
et des micro-animations. Chaque maquette de `workflow/maquette` dispose d'un écran d'exemple
navigable, à copier-coller.

## 2. Livrables

### 2.1 Design tokens — `src/styles.scss`

Variables existantes conservées (`--primary-color`, `--accent-color`, `--secondary-color`,
`--error-color`, `--success-color`, `--font-family`, `--text-color`) et complétées par :
couleurs `warning` / `info`, teintes douces (`--*-soft`), textes (`--text-strong-color`,
`--error-text`…), surfaces, bordures, rayons, ombres, anneau de focus, espacements,
dimensions du layout. Aucune couleur « en dur » dans les composants.

### 2.2 Composants (`src/app/shared/components/`)

| Composant | État | API principale |
|-----------|------|----------------|
| `button` | enrichi | `level`, `variant` (solid/outlined/text), `size`, `loading`, `fullWidth`, `(action)` (click / doubleclick / longpress conservés) |
| `card` | implémenté | `header`, `subtitle`, `highlight`, slots `[card-actions]`, `[card-header-actions]` |
| `header` | enrichi | `appTitle`, `userName`, `showMenuToggle`, `(logout)`, `(menuToggle)` |
| `menu` | implémenté | `header`, projette des `app-menu-item` |
| `menu-item` | implémenté | `label`, `link`, `icon`, `badge` ; lien actif (`routerLinkActive`) ; interface `MenuEntry` |
| `notification` | implémenté | `level`, `header`, `closable`, `[(visible)]` ; `role="alert"` pour erreur/avertissement |
| `badge` | nouveau | `value`, `level` |
| `tag` | nouveau | `level`, `rounded` |
| `skeleton` | nouveau | `width`, `height`, `shape` |
| `breadcrumb` | nouveau | `items: BreadcrumbItem[]` |
| `form-field` | nouveau | `label`, `forId`, `hint`, `error`, `required`, `length` / `maxLength` (compteur) — habille input/select/textarea natifs |
| `checkbox` | nouveau | `label`, `disabled`, `[(checked)]` |
| `table` | nouveau | habille un `<table>` natif : `striped`, `loading`, classes `sortable`, `clickable`, `align-right`, `truncate` |
| `paginator` | nouveau | `[(page)]`, `total`, `pageSize` ; résumé « 1–20 sur 128 » et ellipses |
| `empty-state` | nouveau | `icon`, `header`, `message`, `level` ; actions projetées |
| `dialog` | nouveau | `[(open)]`, `header`, `closeOnBackdrop` ; Échap ; slot `[dialog-actions]` |
| `drawer` | nouveau (demandé) | `[(open)]`, `header`, `position` (left/right), `width` ; Échap ; slot `[drawer-footer]` |
| `toast` + `ToastService` | nouveau | `toast.show(message, { level, duration, actionLabel, onAction })` |
| `main-layout` | nouveau (demandé) | `appTitle`, `userName`, `menu: MenuEntry[]`, `menuTitle`, `footerText`, `(logout)` ; menu latéral coulissant sur mobile |

Hors périmètre, non modifiés : `player`, directives `autofocus` / `autoplay`, pipe `songname`.

### 2.3 Intégration

- `shell/app.html` : `<router-outlet />` + `<app-toast />` (une seule zone de toasts).
- `pages/layout.page.ts` : route « coquille » qui affiche les pages enfants dans `app-main-layout`.
- `config/app.menu.ts` : entrées du menu latéral.
- `config/app.routes.ts` : routes enfants sous le layout ; `/examples/login` reste hors layout
  (écran public, maquette 01).
- `config/app.config.ts` : `withComponentInputBinding()` (le paramètre `:id` arrive dans un `input()`).
- `pages/home.page.ts` : liens vers les exemples ; `pages/not-found.page.ts` : `app-empty-state`.

### 2.4 Exemples à copier-coller (`src/app/pages/examples/`)

| Maquette | Route | Fichier | Composants utilisés |
|----------|-------|---------|---------------------|
| 01 Connexion | `/examples/login` | `login-example.page.ts` | card, form-field, checkbox, notification, button (loading) |
| 02 Recherche produits | `/examples/products` | `products-example.page.ts` | form-field, table, paginator, skeleton, empty-state |
| 03 Détail produit | `/examples/products/:id` | `product-detail-example.page.ts` | breadcrumb, card, button, toast, empty-state (404) |
| 04 Modification produit | `/examples/products/:id/edit` | `product-edit-example.page.ts` | form-field (compteurs, erreurs), tag, notification, dialog |
| 05 Notifications | `/examples/notifications` | `notifications-example.page.ts` | badge, tag, form-field, empty-state, toast « Annuler » |
| Vitrine | `/examples/components` | `components-example.page.ts` | tous, dont **drawer** et dialog |

Données fictives : `example.data.ts` (astuce démo : le mot de passe `demo` réussit la connexion).

## 3. Validation

| Contrôle | Résultat |
|----------|----------|
| `ng build` (production) | ✅ sans erreur ni avertissement (budgets de style respectés) |
| `ng test --watch=false` | ✅ 24 fichiers, 37 tests passés |
| Vérification visuelle (navigateur) | ✅ produits, modification + dialog, connexion (échec), notifications + toast, vitrine + drawer |
| Dépendances ajoutées | aucune |

## 4. Points notables / décisions

- **Emplacement** : le prompt cite `src/shared/*` ; la convention existante
  `src/app/shared/components/*` (`xxx.ui.ts` / `XxxUi`) a été conservée.
- **Entrées `title` renommées** (`header` / `appTitle`) : un input nommé `title` laisse aussi
  l'attribut HTML natif sur l'élément hôte, ce qui affichait une infobulle sur toute la carte.
- **`form-field` et `table`** utilisent `ViewEncapsulation.None` (sélecteurs préfixés par le
  nom du composant) pour styler les éléments natifs projetés, sans `ControlValueAccessor`.
- **Spec du shell** corrigée : l'import `'../app'` était cassé et faisait échouer `ng test`.
- Les miniatures de démonstration utilisent `picsum.photos` (images de remplacement).

## 5. Limites / suites possibles

- Le badge du menu « Notifications » est statique (`app.menu.ts`) ; à brancher sur un service.
- Les guards (`authGuard`, `guestGuard`, `unsavedChangesGuard`), resolvers et appels API des
  maquettes ne font pas partie de cette tâche (simulés par `setTimeout` dans les exemples).
- Pas de piège de focus (focus trap) dans `dialog` / `drawer` : volontairement simple.
