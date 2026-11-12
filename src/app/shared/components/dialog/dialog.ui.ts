import { Component, input, model } from '@angular/core';

/**
 * Boîte de dialogue modale.
 * <app-dialog [(open)]="confirmOpen" header="Quitter sans enregistrer ?">
 *   <p>Vos modifications seront perdues.</p>
 *   <div dialog-actions>
 *     <app-button variant="outlined" (action)="confirmOpen.set(false)">Rester</app-button>
 *     <app-button level="error" (action)="leave()">Quitter</app-button>
 *   </div>
 * </app-dialog>
 */
@Component({
  selector: 'app-dialog',
  styleUrl: './dialog.ui.scss',
  templateUrl: './dialog.ui.html',
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class DialogUi {
  open = model(false);
  header = input('');
  /** Ferme la boîte au clic sur le fond grisé. */
  closeOnBackdrop = input(true);

  close() {
    this.open.set(false);
  }

  protected onBackdropClick() {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }
}
