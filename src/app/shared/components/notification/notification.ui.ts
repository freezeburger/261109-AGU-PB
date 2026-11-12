import { Component, computed, input, model } from '@angular/core';

export type NotificationLevel = 'info' | 'success' | 'warning' | 'error';

const ICONS: Record<NotificationLevel, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

/**
 * Bannière de message (au-dessus d'un formulaire, d'une liste…).
 * <app-notification level="error" header="Identifiant ou mot de passe incorrect.">
 *   Vérifiez vos informations puis réessayez.
 * </app-notification>
 */
@Component({
  selector: 'app-notification',
  styleUrl: './notification.ui.scss',
  templateUrl: './notification.ui.html',
})
export class NotificationUi {
  level = input<NotificationLevel>('info');
  header = input<string>();
  closable = input(false);
  /** Utilisable en two-way binding : [(visible)]="showBanner" */
  visible = model(true);

  protected icon = computed(() => ICONS[this.level()]);
  protected role = computed(() =>
    this.level() === 'error' || this.level() === 'warning' ? 'alert' : 'status',
  );

  close() {
    this.visible.set(false);
  }
}
