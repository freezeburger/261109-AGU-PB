import { Component, input, model } from '@angular/core';

/**
 * Panneau latéral coulissant (filtres, détails, menu mobile…).
 * <app-drawer [(open)]="filtersOpen" header="Filtres" position="right">
 *   …contenu…
 *   <div drawer-footer><app-button (action)="apply()">Appliquer</app-button></div>
 * </app-drawer>
 */
@Component({
  selector: 'app-drawer',
  styleUrl: './drawer.ui.scss',
  templateUrl: './drawer.ui.html',
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class DrawerUi {
  open = model(false);
  header = input('');
  position = input<'left' | 'right'>('right');
  width = input('360px');

  close() {
    this.open.set(false);
  }
}
