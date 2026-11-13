import { Injectable, signal } from '@angular/core';

export type ToastLevel = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: number;
  message: string;
  level: ToastLevel;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ToastOptions {
  level?: ToastLevel;
  /** Durée d'affichage en millisecondes. */
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Service pour afficher des messages temporaires depuis n'importe quel composant.
 *
 * private toast = inject(ToastService);
 * this.toast.show('Identifiant copié', { level: 'success' });
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  private nextId = 1;

  show(message: string, options: ToastOptions = {}) {
    const toast: Toast = {
      id: this.nextId++,
      message,
      level: options.level ?? 'info',
      actionLabel: options.actionLabel,
      onAction: options.onAction,
    };
    this.toasts.update((list) => [...list, toast]);
    setTimeout(() => this.dismiss(toast.id), options.duration ?? 4000);
    return toast.id;
  }

  dismiss(id: number) {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }
}
