import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  /** Sans lien, l'élément est affiché comme page courante. */
  link?: string;
}

/**
 * Fil d'Ariane.
 * <app-breadcrumb [items]="[{ label: 'Produits', link: '/products' }, { label: 'Crème' }]" />
 */
@Component({
  imports: [RouterLink],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.ui.scss',
  templateUrl: './breadcrumb.ui.html',
})
export class BreadcrumbUi {
  items = input<BreadcrumbItem[]>([]);
}
