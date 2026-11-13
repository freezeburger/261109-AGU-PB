import { Component, inject } from '@angular/core';
import { Toast, ToastService } from '../../../core/services/toast.service';

const ICONS = { info: 'ℹ', success: '✓', warning: '⚠', error: '✕' };

/**
 * Zone d'affichage des toasts. À placer UNE fois, dans le shell de l'application :
 * <app-toast />
 */
@Component({
  selector: 'app-toast',
  styleUrl: './toast.ui.scss',
  templateUrl: './toast.ui.html',
})
export class ToastUi {
  protected toastService = inject(ToastService);
  protected icons = ICONS;

  protected runAction(toast: Toast) {
    toast.onAction?.();
    this.toastService.dismiss(toast.id);
  }
}
