import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BadgeUi } from '../badge/badge.ui';

/** Entrée de menu, utilisée par app-main-layout. */
export interface MenuEntry {
  label: string;
  link: string;
  icon?: string;
  badge?: number;
}

/**
 * Lien de navigation latérale (s'affiche « actif » sur la route courante).
 * <app-menu-item label="Notifications" link="/notifications" icon="🔔" [badge]="3" />
 */
@Component({
  imports: [RouterLink, RouterLinkActive, BadgeUi],
  selector: 'app-menu-item',
  styleUrl: './menu-item.ui.scss',
  templateUrl: './menu-item.ui.html',
})
export class MenuItemUi {
  label = input.required<string>();
  link = input.required<string>();
  icon = input<string>();
  badge = input<number>();
}
