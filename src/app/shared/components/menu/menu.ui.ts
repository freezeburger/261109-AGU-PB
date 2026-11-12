import { Component, input } from '@angular/core';

/**
 * Groupe de liens de navigation.
 * <app-menu header="Navigation">
 *   <app-menu-item label="Produits" link="/products" />
 * </app-menu>
 */
@Component({
  selector: 'app-menu',
  styleUrl: './menu.ui.scss',
  templateUrl: './menu.ui.html',
})
export class MenuUi {
  header = input<string>();
}
