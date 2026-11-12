import { Component, input } from '@angular/core';

export type BadgeLevel = 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info';

/**
 * Pastille compteur.
 * <app-badge [value]="3" level="accent" />
 */
@Component({
  selector: 'app-badge',
  styleUrl: './badge.ui.scss',
  templateUrl: './badge.ui.html',
})
export class BadgeUi {
  value = input<string | number>('');
  level = input<BadgeLevel>('accent');
}
