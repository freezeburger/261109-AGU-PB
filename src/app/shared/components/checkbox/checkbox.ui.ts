import { Component, input, model } from '@angular/core';

/**
 * Case à cocher avec libellé.
 * <app-checkbox label="Rester connecté" [(checked)]="rememberMe" />
 */
@Component({
  selector: 'app-checkbox',
  styleUrl: './checkbox.ui.scss',
  templateUrl: './checkbox.ui.html',
})
export class CheckboxUi {
  label = input('');
  disabled = input(false);
  checked = model(false);

  protected toggle(event: Event) {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
