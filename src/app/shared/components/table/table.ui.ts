import { Component, ViewEncapsulation, input } from '@angular/core';

/**
 * Habillage d'un <table> natif (on garde toute la souplesse du HTML).
 *
 * <app-table [loading]="loading()">
 *   <table>
 *     <thead><tr><th>ID</th><th class="sortable" aria-sort="ascending">Titre</th></tr></thead>
 *     <tbody><tr class="clickable"><td>12</td><td>Crème</td></tr></tbody>
 *   </table>
 * </app-table>
 */
@Component({
  selector: 'app-table',
  styleUrl: './table.ui.scss',
  template: '<div class="table-scroll"><ng-content /></div>',
  // Encapsulation désactivée pour styler le <table> projeté ; sélecteurs préfixés par "app-table".
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.striped]': 'striped()',
    '[attr.aria-busy]': 'loading()',
  },
})
export class TableUi {
  striped = input(false);
  loading = input(false);
}
