import { Component, input } from '@angular/core';

export type TagLevel = 'info' | 'success' | 'warning' | 'error' | 'neutral';

/**
 * Étiquette de statut. Le texte porte le sens, la couleur ne fait qu'appuyer.
 * <app-tag level="error">Erreur</app-tag>
 */
@Component({
  selector: 'app-tag',
  styleUrl: './tag.ui.scss',
  templateUrl: './tag.ui.html',
})
export class TagUi {
  level = input<TagLevel>('neutral');
  rounded = input(false);
}
