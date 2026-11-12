import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardUi } from '../shared/components/card/card.ui';
import { NotificationUi } from '../shared/components/notification/notification.ui';

@Component({
  imports: [RouterLink, CardUi, NotificationUi],
  selector: 'app-home',
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--space-4);
    }

    a {
      font-weight: 600;
    }
  `,
  template: `
    <div class="stack">
      <h1>Bienvenue 👋</h1>

      <app-notification level="info" header="Exemples à copier-coller">
        Chaque écran ci-dessous reproduit une maquette de <code>workflow/maquette</code> avec les
        composants de <code>src/app/shared/components</code>.
      </app-notification>

      <div class="grid">
        @for (example of examples; track example.link) {
          <app-card [header]="example.title" [subtitle]="example.subtitle" [highlight]="true">
            <a [routerLink]="example.link">Ouvrir l'exemple →</a>
          </app-card>
        }
      </div>
    </div>
  `,
})
export class HomePage {
  protected examples = [
    { title: '01 · Connexion', subtitle: 'form-field, checkbox, notification', link: '/examples/login' },
    { title: '02 · Recherche produits', subtitle: 'table, paginator, skeleton, empty-state', link: '/examples/products' },
    { title: '03 · Détail produit', subtitle: 'breadcrumb, card, toast', link: '/examples/products/1' },
    { title: '04 · Modification produit', subtitle: 'form-field, dialog, tag', link: '/examples/products/1/edit' },
    { title: '05 · Notifications', subtitle: 'tag, badge, toast avec « Annuler »', link: '/examples/notifications' },
    { title: 'Vitrine des composants', subtitle: 'tous les composants + drawer', link: '/examples/components' },
  ];
}
