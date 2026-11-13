import { MenuEntry } from '../shared/components/menu-item/menu-item.ui';

/** Entrées du menu latéral de l'application. */
export const APP_MENU: MenuEntry[] = [
  { label: 'Accueil', link: '/home', icon: '🏠' },
  { label: 'Produits', link: '/products', icon: '📦' },
  { label: 'Notifications', link: '/examples/notifications', icon: '🔔', badge: 3 },
  { label: 'Composants', link: '/examples/components', icon: '🧩' },
  { label: 'Connexion', link: '/login', icon: '🔐' },
];
