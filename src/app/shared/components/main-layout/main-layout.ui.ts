import { Component, input, output, signal } from '@angular/core';
import { HeaderUi } from '../header/header.ui';
import { MenuUi } from '../menu/menu.ui';
import { MenuEntry, MenuItemUi } from '../menu-item/menu-item.ui';

/**
 * Mise en page principale : header + menu latéral + contenu.
 * Sur mobile, le menu devient un panneau coulissant ouvert par le bouton « ☰ ».
 *
 * <app-main-layout appTitle="Atelier" userName="M. Laurent" [menu]="menu" (logout)="logout()">
 *   <router-outlet />
 * </app-main-layout>
 */
@Component({
  imports: [HeaderUi, MenuUi, MenuItemUi],
  selector: 'app-main-layout',
  styleUrl: './main-layout.ui.scss',
  templateUrl: './main-layout.ui.html',
})
export class MainLayoutUi {
  appTitle = input('Paradigm Soundbox');
  userName = input<string>();
  menu = input<MenuEntry[]>([]);
  menuTitle = input('Navigation');
  footerText = input('v1 · aide');

  logout = output<void>();

  protected sidebarOpen = signal(false);

  protected toggleSidebar() {
    this.sidebarOpen.update((open) => !open);
  }

  protected closeSidebar() {
    this.sidebarOpen.set(false);
  }
}
