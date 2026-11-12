import { Component, input, output } from '@angular/core';

/**
 * Bandeau supérieur : bouton menu (mobile), logo, titre, utilisateur.
 * <app-header appTitle="Atelier" userName="M. Laurent" (logout)="logout()" (menuToggle)="toggle()" />
 */
@Component({
  selector: 'app-header',
  styleUrl: './header.ui.scss',
  templateUrl: './header.ui.html',
})
export class HeaderUi {
  appTitle = input('Paradigm Soundbox');
  userName = input<string>();
  /** Affiche le bouton « ☰ » (utile quand un menu latéral existe). */
  showMenuToggle = input(false);

  logout = output<void>();
  menuToggle = output<void>();
}
