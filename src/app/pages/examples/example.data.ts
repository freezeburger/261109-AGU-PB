// Données d'exemple pour les pages de démonstration (remplacer par de vrais appels API).

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export type NotificationLevel = 'info' | 'success' | 'warning' | 'error';

export interface AppNotification {
  id: number;
  level: NotificationLevel;
  title: string;
  message: string;
  createdAt: Date;
  readAt: Date | null;
  action?: { label: string; routerLink: string };
}

const NAMES = [
  'Crème visage hydratante',
  'Crème mains réparatrice',
  'Crème solaire SPF 50',
  'Crème de nuit régénérante',
  'Crème corps fouettée',
  'Crème contour des yeux',
  'Sérum éclat vitamine C',
  'Lait démaquillant doux',
  'Gel douche surgras',
  'Baume à lèvres nourrissant',
  'Masque purifiant argile',
  'Huile sèche pailletée',
];

export const PRODUCTS: Product[] = Array.from({ length: 48 }, (_, index) => ({
  id: index + 1,
  title: NAMES[index % NAMES.length] + (index >= NAMES.length ? ` (lot ${Math.floor(index / NAMES.length) + 1})` : ''),
  description:
    'Soin quotidien pour une peau douce et confortable. Texture légère, adaptée à tous les types de peau.',
  price: Math.round((8 + ((index * 7.3) % 30)) * 100) / 100,
  thumbnail: `https://picsum.photos/seed/product-${index + 1}/300`,
}));

const today = new Date();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    level: 'error',
    title: "Échec de l'enregistrement",
    message: 'Le produit « Crème solaire SPF 50 » n\'a pas pu être enregistré.',
    createdAt: new Date(today.setHours(10, 42)),
    readAt: null,
    action: { label: 'Voir le produit', routerLink: '/examples/products/3' },
  },
  {
    id: 2,
    level: 'warning',
    title: 'Miniature inaccessible',
    message: "L'image du produit n° 4 ne répond plus.",
    createdAt: new Date(today.setHours(9, 15)),
    readAt: null,
    action: { label: 'Modifier le produit', routerLink: '/examples/products/4/edit' },
  },
  {
    id: 3,
    level: 'success',
    title: 'Produit enregistré',
    message: '« Crème visage hydratante » a été mis à jour.',
    createdAt: new Date(today.setHours(8, 3)),
    readAt: null,
    action: { label: 'Voir le produit', routerLink: '/examples/products/1' },
  },
  {
    id: 4,
    level: 'info',
    title: 'Session prolongée',
    message: 'Votre session a été renouvelée automatiquement.',
    createdAt: new Date(yesterday.setHours(17, 30)),
    readAt: new Date(),
  },
];

export function formatPrice(price: number) {
  return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}
