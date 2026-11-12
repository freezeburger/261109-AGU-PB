import { Component, input } from '@angular/core';

/**
 * État vide, erreur ou « introuvable », avec actions projetées.
 * <app-empty-state icon="🔍" header="Aucun résultat" message="Aucun produit ne correspond.">
 *   <app-button variant="outlined">Réinitialiser</app-button>
 * </app-empty-state>
 */
@Component({
  selector: 'app-empty-state',
  styleUrl: './empty-state.ui.scss',
  templateUrl: './empty-state.ui.html',
})
export class EmptyStateUi {
  icon = input('📭');
  header = input('');
  message = input<string>();
  level = input<'neutral' | 'error'>('neutral');
}
