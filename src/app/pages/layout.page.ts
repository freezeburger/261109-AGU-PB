import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { APP_MENU } from '../config/app.menu';
import { MainLayoutUi } from '../shared/components/main-layout/main-layout.ui';

/** Page « coquille » : toutes les routes enfants s'affichent dans le main-layout. */
@Component({
  imports: [RouterOutlet, MainLayoutUi],
  selector: 'app-layout',
  template: `
    <app-main-layout appTitle="Atelier" userName="M. Laurent" [menu]="menu" (logout)="logout()">
      <router-outlet />
    </app-main-layout>
  `,
})
export class LayoutPage {
  private router = inject(Router);

  protected menu = APP_MENU;

  protected logout() {
    this.router.navigateByUrl('/examples/login');
  }
}
