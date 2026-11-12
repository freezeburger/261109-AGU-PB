# Tâche 001 — Bibliothèque de composants UI partagés

- **Source** : [`workflow/prompts/001-COMPOSANTS.md`](../prompts/001-COMPOSANTS.md)
- **Maquettes** : [`workflow/maquette/`](../maquette/) (01 connexion → 05 notifications)
- **Statut** : terminée — voir [rapport 001](../reports/001-composants-ui.md)
- **Mode** : séquentiel (pas de travail en parallèle)

## 1. Objectif

Créer un jeu de composants UI réutilisables, de niveau « junior », dans le dossier partagé
du projet, au style inspiré de PrimeNG et de l'identité visuelle de be.brussels
(bleu `--primary-color`, jaune `--accent-color`), **sans aucune dépendance externe**.

> Le prompt mentionne `src/shared/*`. Le projet possède déjà `src/app/shared/components/*`
> (convention `xxx.ui.ts` / `XxxUi` / `app-xxx`) : on conserve cet emplacement et cette convention.

## 2. Principes

1. Composants *standalone*, API à base de signaux : `input()`, `output()`, `model()`, `computed()`.
2. Un fichier `.ts` + `.html` + `.scss` + `.spec.ts` par composant (convention existante).
3. Pas de `ControlValueAccessor`, pas de CDK, pas de librairie : du HTML natif stylé.
4. Toutes les couleurs, rayons, ombres et espacements passent par des variables CSS
   déclarées dans `src/styles.scss` (on garde les variables existantes, on en ajoute de dérivées).
5. Accessibilité de base : `role="alert"`, `aria-label`, focus visible, touche Échap.
6. Budget style Angular : < 4 kB par composant.

## 3. Inventaire des composants (déduit des maquettes)

| # | Composant | Maquettes | Rôle |
|---|-----------|-----------|------|
| 1 | `button` (existant, enrichi) | 01→05 | niveaux, variantes `solid/outlined/text`, `loading`, appui long conservé |
| 2 | `card` (existant, implémenté) | 03, 04 | titre, sous-titre, contenu, zone d'actions |
| 3 | `header` (existant, enrichi) | 02→05 | logo, titre, utilisateur, déconnexion, bouton menu mobile |
| 4 | `menu` (existant, implémenté) | 02→05 | liste de navigation latérale |
| 5 | `menu-item` (existant, implémenté) | 02→05 | lien `routerLink` actif + badge compteur |
| 6 | `notification` (existant, implémenté) | 01, 04, 05 | bannière info/succès/avertissement/erreur, fermable |
| 7 | `form-field` (nouveau) | 01, 04 | libellé, `*` obligatoire, aide, erreur, compteur ; habille input/select/textarea natifs |
| 8 | `checkbox` (nouveau) | 01 | case à cocher stylée + libellé |
| 9 | `badge` (nouveau) | 02→05 | pastille compteur |
| 10 | `tag` (nouveau) | 05 | étiquette de niveau (ERREUR, SUCCÈS…) |
| 11 | `breadcrumb` (nouveau) | 03, 04 | fil d'Ariane |
| 12 | `table` (nouveau) | 02 | habillage d'un `<table>` natif |
| 13 | `paginator` (nouveau) | 02 | Précédent / pages / Suivant |
| 14 | `skeleton` (nouveau) | 02, 05 | squelettes de chargement |
| 15 | `empty-state` (nouveau) | 02, 03, 05 | états vide / erreur / 404 avec actions |
| 16 | `dialog` (nouveau) | 04 | confirmation « Quitter sans enregistrer ? » |
| 17 | `toast` + `ToastService` (nouveau) | 03, 04, 05 | messages temporaires (« Identifiant copié », « Annuler ») |
| 18 | `drawer` (nouveau, demandé) | — | panneau latéral coulissant (gauche/droite) |
| 19 | `main-layout` (nouveau, demandé) | 02→05 | header + menu latéral + contenu, responsive |

Hors périmètre : `player`, directives et pipe existants (non liés aux maquettes).

## 4. Étapes

1. **Design tokens** — enrichir `:root` de `src/styles.scss` (surfaces, bordures, rayons, ombres,
   info/warning, espacements, police, focus) + styles de base.
2. **Composants simples** — badge, tag, skeleton, button, card, notification, breadcrumb.
3. **Formulaires** — form-field, checkbox.
4. **Données** — table, paginator, empty-state.
5. **Superpositions** — dialog, drawer, toast + ToastService.
6. **Navigation / mise en page** — menu-item, menu, header, main-layout.
7. **Intégration** — route « layout » (`pages/layout.page.ts`) qui enveloppe les pages dans
   `app-main-layout` ; shell réduit à `<router-outlet />` + `<app-toast />`.
8. **Exemples à copier-coller** — pages `src/app/pages/examples/*` reproduisant chaque maquette
   (connexion, recherche, détail, modification, notifications) + vitrine des composants (dont drawer).
9. **Tests** — un spec par composant (création + comportement principal) ; correction de
   `shell/app.spec.ts` (import cassé).
10. **Validation** — `ng build` et `ng test --watch=false` au vert.
11. **Rapport** — `workflow/reports/001-composants-ui.md` puis commit normalisé multiligne.

## 5. Critères d'acceptation

- [x] Les 19 composants existent sous `src/app/shared/components/` avec leur spec.
- [x] Aucune dépendance ajoutée dans `package.json`.
- [x] Aucune couleur « en dur » dans les composants : uniquement `var(--…)`.
- [x] Les 5 maquettes ont une page d'exemple navigable.
- [x] `ng build` et `ng test` passent.
