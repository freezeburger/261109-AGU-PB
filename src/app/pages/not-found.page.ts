import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonUi } from '../shared/components/button/button.ui';
import { EmptyStateUi } from '../shared/components/empty-state/empty-state.ui';

@Component({
  imports: [ButtonUi, EmptyStateUi],
  selector: 'app-not-found',
  template: `
    <app-empty-state
      icon="🧭"
      header="Page introuvable"
      message="La page demandée n'existe pas ou a été déplacée."
    >
      <app-button (action)="router.navigateByUrl('/home')">Retour à l'accueil</app-button>
    </app-empty-state>
  `,
})
export class NotFoundPage {
  protected router = inject(Router);
}
