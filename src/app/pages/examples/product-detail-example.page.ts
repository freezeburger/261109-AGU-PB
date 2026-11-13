import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbUi } from '../../shared/components/breadcrumb/breadcrumb.ui';
import { ButtonUi } from '../../shared/components/button/button.ui';
import { CardUi } from '../../shared/components/card/card.ui';
import { EmptyStateUi } from '../../shared/components/empty-state/empty-state.ui';
import { ToastService } from '../../core/services/toast.service';
import { PRODUCTS, formatPrice } from './example.data';

/** EXEMPLE — Maquette 03 « Détail produit ». */
@Component({
  imports: [BreadcrumbUi, ButtonUi, CardUi, EmptyStateUi],
  selector: 'app-product-detail-example',
  styles: `
    .title-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
    }

    h1 {
      margin: 0;
    }

    .layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: var(--space-5);
    }

    .thumbnail {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      border-radius: var(--radius);
      background: var(--surface-hover);
      color: var(--text-color);
      overflow: hidden;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    dl {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: var(--space-3) var(--space-5);
      margin: 0;
    }

    dt {
      color: var(--text-color);
    }

    dd {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin: 0;
      min-width: 0;
    }

    .url {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .description {
      white-space: pre-line;
    }

    @media (width <= 1024px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `,
  template: `
    @if (product(); as product) {
      <div class="stack">
        <app-breadcrumb
          [items]="[{ label: 'Produits', link: '/examples/products' }, { label: product.title }]"
        />

        <div>
          <app-button variant="text" (action)="back()">← Retour aux résultats</app-button>
        </div>

        <div class="title-bar">
          <div>
            <h1>{{ product.title }}</h1>
            <span class="muted">Produit n° {{ product.id }}</span>
          </div>
          <app-button (action)="edit()">Modifier</app-button>
        </div>

        <div class="layout">
          <div class="thumbnail">
            @if (imageFailed()) {
              Image indisponible
            } @else {
              <img [src]="product.thumbnail" [alt]="product.title" (error)="imageFailed.set(true)" />
            }
          </div>

          <div class="stack">
            <app-card header="Informations">
              <dl>
                <dt>Identifiant (id)</dt>
                <dd>
                  {{ product.id }}
                  <app-button size="small" variant="outlined" (action)="copyId(product.id)">Copier</app-button>
                </dd>
                <dt>Titre (title)</dt>
                <dd>{{ product.title }}</dd>
                <dt>Prix (price)</dt>
                <dd>{{ price(product.price) }}</dd>
                <dt>Miniature (thumbnail)</dt>
                <dd>
                  <span class="url">{{ product.thumbnail }}</span>
                  <a [href]="product.thumbnail" target="_blank" rel="noopener">Ouvrir ↗</a>
                </dd>
              </dl>
            </app-card>

            <app-card header="Description">
              <p class="description">{{ product.description }}</p>
            </app-card>
          </div>
        </div>
      </div>
    } @else {
      <app-empty-state
        icon="📦"
        header="Produit introuvable"
        [message]="'Le produit n° ' + id() + ' n’existe pas ou a été supprimé.'"
      >
        <app-button (action)="back()">Retour aux produits</app-button>
      </app-empty-state>
    }
  `,
})
export class ProductDetailExamplePage {
  private router = inject(Router);
  private toast = inject(ToastService);

  /** Paramètre de route « :id » (grâce à withComponentInputBinding). */
  id = input.required<string>();

  protected product = computed(() => PRODUCTS.find((p) => p.id === Number(this.id())));
  protected imageFailed = signal(false);
  protected price = formatPrice;

  protected copyId(id: number) {
    navigator.clipboard?.writeText(String(id));
    this.toast.show('Identifiant copié', { level: 'success' });
  }

  protected back() {
    this.router.navigateByUrl('/examples/products');
  }

  protected edit() {
    this.router.navigate(['/examples/products', this.id(), 'edit']);
  }
}
