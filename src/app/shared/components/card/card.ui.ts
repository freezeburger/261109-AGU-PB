import { Component, input } from '@angular/core';

/**
 * Carte de contenu.
 * <app-card header="Informations" subtitle="Produit n° 12">
 *   <p>Contenu…</p>
 *   <div card-actions><app-button>Modifier</app-button></div>
 * </app-card>
 */
@Component({
  selector: 'app-card',
  styleUrl: './card.ui.scss',
  templateUrl: './card.ui.html',
})
export class CardUi {
  header = input<string>();
  subtitle = input<string>();
  /** Liseré coloré à gauche, pour mettre une carte en avant. */
  highlight = input(false);
}
