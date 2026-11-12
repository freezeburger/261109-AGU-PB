import { Routes } from '@angular/router';
import { LayoutPage } from '../pages/layout.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('../pages/login.page').then((m) => m.LoginPage),
  },
  // Écran public, sans menu (maquette 01)
  {
    path: 'examples/login',
    loadComponent: () =>
      import('../pages/examples/login-example.page').then((m) => m.LoginExamplePage),
  },
  // Toutes les routes ci-dessous s'affichent dans le main-layout (header + menu)
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../pages/home.page').then((m) => m.HomePage),
      },
      {
        path: 'application',
        loadComponent: () => import('../pages/application.page').then((m) => m.ApplicationPage),
      },
      {
        path: 'examples/products',
        loadComponent: () =>
          import('../pages/examples/products-example.page').then((m) => m.ProductsExamplePage),
      },
      {
        path: 'examples/products/:id',
        loadComponent: () =>
          import('../pages/examples/product-detail-example.page').then(
            (m) => m.ProductDetailExamplePage,
          ),
      },
      {
        path: 'examples/products/:id/edit',
        loadComponent: () =>
          import('../pages/examples/product-edit-example.page').then(
            (m) => m.ProductEditExamplePage,
          ),
      },
      {
        path: 'examples/notifications',
        loadComponent: () =>
          import('../pages/examples/notifications-example.page').then(
            (m) => m.NotificationsExamplePage,
          ),
      },
      {
        path: 'examples/components',
        loadComponent: () =>
          import('../pages/examples/components-example.page').then(
            (m) => m.ComponentsExamplePage,
          ),
      },
      {
        path: 'not-found',
        loadComponent: () => import('../pages/not-found.page').then((m) => m.NotFoundPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
