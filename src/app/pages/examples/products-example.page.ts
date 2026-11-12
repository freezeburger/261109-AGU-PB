import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonUi } from '../../shared/components/button/button.ui';
import { EmptyStateUi } from '../../shared/components/empty-state/empty-state.ui';
import { FormFieldUi } from '../../shared/components/form-field/form-field.ui';
import { PaginatorUi } from '../../shared/components/paginator/paginator.ui';
import { SkeletonUi } from '../../shared/components/skeleton/skeleton.ui';
import { TableUi } from '../../shared/components/table/table.ui';
import { PRODUCTS, Product, formatPrice } from './example.data';

type SortKey = 'relevance' | 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc';
type ViewState = 'data' | 'loading' | 'error';

/** EXEMPLE — Maquette 02 « Recherche produits ». */
@Component({
  imports: [FormsModule, ButtonUi, EmptyStateUi, FormFieldUi, PaginatorUi, SkeletonUi, TableUi],
  selector: 'app-products-example',
  styles: `
    .toolbar {
      display: grid;
      grid-template-columns: 2fr 1fr auto;
      align-items: end;
      gap: var(--space-3);
    }

    .summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .thumb {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      background: var(--surface-hover);
    }

    .demo {
      padding: var(--space-3);
      border: 1px dashed var(--border-color);
      border-radius: var(--radius);
      font-size: 0.85rem;
    }

    @media (width <= 768px) {
      .toolbar {
        grid-template-columns: 1fr;
      }
    }
  `,
  template: `
    <div class="stack">
      <header>
        <h1>Produits</h1>
        <p class="muted">Recherchez un produit du catalogue puis consultez ou modifiez sa fiche.</p>
      </header>

      <div class="toolbar">
        <app-form-field label="Recherche" forId="search">
          <input id="search" type="search" placeholder="ex. crème" [(ngModel)]="query" (ngModelChange)="page.set(1)" />
        </app-form-field>

        <app-form-field label="Trier par" forId="sort">
          <select id="sort" [(ngModel)]="sort">
            <option value="relevance">Pertinence</option>
            <option value="title-asc">Titre A → Z</option>
            <option value="title-desc">Titre Z → A</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </app-form-field>

        <app-form-field>
          <app-button variant="outlined" (action)="reset()">Réinitialiser</app-button>
        </app-form-field>
      </div>

      <div class="summary">
        <strong>{{ filtered().length }} résultats{{ query() ? ' pour « ' + query() + ' »' : '' }}</strong>
        <label class="row">
          Par page
          <app-form-field>
            <select [(ngModel)]="pageSize" (ngModelChange)="page.set(1)">
              <option [ngValue]="10">10</option>
              <option [ngValue]="20">20</option>
              <option [ngValue]="50">50</option>
            </select>
          </app-form-field>
        </label>
      </div>

      @switch (viewState()) {
        @case ('loading') {
          <app-table [loading]="true">
            <table>
              <tbody>
                @for (line of [1, 2, 3, 4, 5]; track line) {
                  <tr>
                    <td><app-skeleton width="36px" height="36px" /></td>
                    <td><app-skeleton width="60%" /></td>
                    <td><app-skeleton /></td>
                    <td><app-skeleton width="4rem" /></td>
                  </tr>
                }
              </tbody>
            </table>
          </app-table>
        }
        @case ('error') {
          <app-empty-state icon="⚠️" level="error" header="Impossible de charger les produits.">
            <app-button (action)="viewState.set('data')">Réessayer</app-button>
          </app-empty-state>
        }
        @default {
          @if (filtered().length === 0) {
            <app-empty-state
              icon="🔍"
              header="Aucun résultat"
              [message]="'Aucun produit ne correspond à « ' + query() + ' ».'"
            >
              <app-button variant="outlined" (action)="reset()">Réinitialiser</app-button>
            </app-empty-state>
          } @else {
            <app-table>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th class="sortable" [attr.aria-sort]="ariaSort('title')" (click)="toggleSort('title')">Titre</th>
                    <th>Description</th>
                    <th class="sortable align-right" [attr.aria-sort]="ariaSort('price')" (click)="toggleSort('price')">Prix</th>
                    <th class="align-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (product of pageItems(); track product.id) {
                    <tr class="clickable" (click)="open(product)">
                      <td><img class="thumb" [src]="product.thumbnail" alt="" (error)="hideImage($event)" /></td>
                      <td>{{ product.id }}</td>
                      <td>{{ product.title }}</td>
                      <td class="truncate" [title]="product.description">{{ product.description }}</td>
                      <td class="align-right">{{ price(product.price) }}</td>
                      <td class="align-right" (click)="$event.stopPropagation()">
                        <app-button size="small" variant="text" (action)="open(product)">Voir</app-button>
                        <app-button size="small" variant="outlined" (action)="edit(product)">Modifier</app-button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </app-table>

            <app-paginator [(page)]="page" [total]="filtered().length" [pageSize]="pageSize()" />
          }
        }
      }

      <div class="demo row">
        <span class="muted">Démo des états :</span>
        <app-button size="small" variant="text" (action)="viewState.set('data')">Données</app-button>
        <app-button size="small" variant="text" (action)="viewState.set('loading')">Chargement</app-button>
        <app-button size="small" variant="text" level="error" (action)="viewState.set('error')">Erreur</app-button>
      </div>
    </div>
  `,
})
export class ProductsExamplePage {
  private router = inject(Router);

  protected query = signal('');
  protected sort = signal<SortKey>('relevance');
  protected page = signal(1);
  protected pageSize = signal(10);
  protected viewState = signal<ViewState>('data');

  protected filtered = computed(() => {
    const term = this.query().trim().toLowerCase();
    const result = PRODUCTS.filter((p) => p.title.toLowerCase().includes(term));

    switch (this.sort()) {
      case 'title-asc':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return result.sort((a, b) => b.title.localeCompare(a.title));
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  });

  protected pageItems = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  protected price = formatPrice;

  protected ariaSort(column: 'title' | 'price') {
    if (this.sort() === `${column}-asc`) return 'ascending';
    if (this.sort() === `${column}-desc`) return 'descending';
    return null;
  }

  protected toggleSort(column: 'title' | 'price') {
    this.sort.set(this.sort() === `${column}-asc` ? `${column}-desc` : `${column}-asc`);
  }

  protected reset() {
    this.query.set('');
    this.sort.set('relevance');
    this.page.set(1);
    this.pageSize.set(10);
    this.viewState.set('data');
  }

  protected open(product: Product) {
    this.router.navigate(['/examples/products', product.id]);
  }

  protected edit(product: Product) {
    this.router.navigate(['/examples/products', product.id, 'edit']);
  }

  protected hideImage(event: Event) {
    (event.target as HTMLImageElement).style.visibility = 'hidden';
  }
}
