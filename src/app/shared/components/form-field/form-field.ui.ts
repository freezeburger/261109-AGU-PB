import { Component, ViewEncapsulation, computed, input } from '@angular/core';

/**
 * Habille un champ natif (input, select, textarea) : libellé, aide, erreur, compteur.
 *
 * <app-form-field label="Adresse e-mail" forId="email" [required]="true" [error]="emailError()">
 *   <input id="email" type="email" [(ngModel)]="email" />
 * </app-form-field>
 */
@Component({
  selector: 'app-form-field',
  styleUrl: './form-field.ui.scss',
  templateUrl: './form-field.ui.html',
  // Encapsulation désactivée pour pouvoir styler les champs natifs projetés.
  // Tous les sélecteurs du .scss commencent donc par "app-form-field".
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.has-error]': '!!error()',
  },
})
export class FormFieldUi {
  label = input<string>();
  /** Identifiant du champ projeté, pour relier le <label>. */
  forId = input<string>();
  hint = input<string>();
  error = input<string | null>();
  required = input(false);
  /** Longueur actuelle du texte (affiche un compteur si maxLength est renseigné). */
  length = input(0);
  maxLength = input<number>();

  protected showCounter = computed(() => this.maxLength() !== undefined);
}
