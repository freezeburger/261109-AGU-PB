import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BadgeUi } from '../../shared/components/badge/badge.ui';
import { ButtonUi } from '../../shared/components/button/button.ui';
import { EmptyStateUi } from '../../shared/components/empty-state/empty-state.ui';
import { FormFieldUi } from '../../shared/components/form-field/form-field.ui';
import { TagUi } from '../../shared/components/tag/tag.ui';
import { ToastService } from '../../core/services/toast.service';
import { AppNotification, NOTIFICATIONS, NotificationLevel } from './example.data';

type StatusFilter = 'all' | 'unread' | 'read';

const LEVEL_LABELS: Record<NotificationLevel, string> = {
  error: 'Erreur',
  warning: 'Avert.',
  success: 'Succès',
  info: 'Info',
};

/** EXEMPLE — Maquette 05 « Récapitulatif des notifications ». */
@Component({
  imports: [FormsModule, RouterLink, BadgeUi, ButtonUi, EmptyStateUi, FormFieldUi, TagUi],
  selector: 'app-notifications-example',
  styles: `
    .title-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
    }

    h1 {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin: 0;
    }

    .filters {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: var(--space-4);
    }

    .segmented {
      display: inline-flex;
      padding: 3px;
      border-radius: var(--radius-pill);
      background: var(--surface-hover);
    }

    .segmented button {
      padding: var(--space-1) var(--space-4);
      border: none;
      border-radius: var(--radius-pill);
      background: none;
      color: var(--text-strong-color);
      font: inherit;
      cursor: pointer;
    }

    .segmented button.active {
      background: var(--primary-color);
      color: var(--text-on-primary);
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: var(--space-3);
      padding: var(--space-4);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      background: var(--surface-card);
    }

    li.unread {
      border-left: 4px solid var(--primary-color);
    }

    li.unread strong::before {
      content: '● ';
      color: var(--primary-color);
    }

    li p {
      margin: var(--space-1) 0;
    }

    li app-tag {
      align-self: start;
    }

    .actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-1);
    }
  `,
  template: `
    <div class="stack">
      <div class="title-bar">
        <div>
          <h1>Notifications <app-badge [value]="unreadCount()" /></h1>
          <span class="muted">{{ unreadCount() }} non lues sur {{ notifications().length }}</span>
        </div>
        <app-button variant="outlined" [disabled]="unreadCount() === 0" (action)="markAllAsRead()">
          Tout marquer comme lu
        </app-button>
      </div>

      <div class="filters">
        <div class="segmented" role="group" aria-label="Statut">
          @for (option of statusOptions; track option.value) {
            <button
              type="button"
              [class.active]="status() === option.value"
              [attr.aria-pressed]="status() === option.value"
              (click)="status.set(option.value)"
            >
              {{ option.label }}
            </button>
          }
        </div>

        <app-form-field label="Niveau" forId="level">
          <select id="level" [(ngModel)]="level">
            <option value="">Tous les niveaux</option>
            <option value="info">Info</option>
            <option value="success">Succès</option>
            <option value="warning">Avertissement</option>
            <option value="error">Erreur</option>
          </select>
        </app-form-field>
      </div>

      @if (visible().length === 0) {
        <app-empty-state icon="🔕" header="Aucune notification" message="Aucune notification ne correspond à ce filtre.">
          <app-button variant="text" (action)="status.set('all'); level.set('')">
            Afficher toutes les notifications
          </app-button>
        </app-empty-state>
      } @else {
        <ul>
          @for (notification of visible(); track notification.id) {
            <li [class.unread]="!notification.readAt">
              <app-tag [level]="notification.level">{{ labels[notification.level] }}</app-tag>

              <div>
                <strong>{{ notification.title }}</strong>
                <p>{{ notification.message }}</p>
                @if (notification.action; as action) {
                  <a [routerLink]="action.routerLink" (click)="setRead(notification, true)">
                    {{ action.label }} →
                  </a>
                }
              </div>

              <div class="actions">
                <small class="muted" [title]="notification.createdAt.toLocaleString('fr-FR')">
                  {{ notification.createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }}
                </small>
                <app-button size="small" variant="text" (action)="setRead(notification, !notification.readAt)">
                  {{ notification.readAt ? 'Marquer non lu' : 'Marquer lu' }}
                </app-button>
                <app-button size="small" variant="text" level="error" (action)="remove(notification)">
                  Suppr.
                </app-button>
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class NotificationsExamplePage {
  private toast = inject(ToastService);

  protected labels = LEVEL_LABELS;
  protected statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'Toutes' },
    { value: 'unread', label: 'Non lues' },
    { value: 'read', label: 'Lues' },
  ];

  protected notifications = signal<AppNotification[]>(NOTIFICATIONS);
  protected status = signal<StatusFilter>('all');
  protected level = signal<NotificationLevel | ''>('');

  protected unreadCount = computed(() => this.notifications().filter((n) => !n.readAt).length);

  protected visible = computed(() =>
    this.notifications()
      .filter((n) => this.status() === 'all' || (this.status() === 'unread') === !n.readAt)
      .filter((n) => !this.level() || n.level === this.level())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
  );

  protected setRead(notification: AppNotification, read: boolean) {
    this.notifications.update((list) =>
      list.map((n) => (n.id === notification.id ? { ...n, readAt: read ? new Date() : null } : n)),
    );
  }

  protected markAllAsRead() {
    this.notifications.update((list) => list.map((n) => ({ ...n, readAt: n.readAt ?? new Date() })));
  }

  protected remove(notification: AppNotification) {
    this.notifications.update((list) => list.filter((n) => n.id !== notification.id));
    this.toast.show('Notification supprimée.', {
      duration: 5000,
      actionLabel: 'Annuler',
      onAction: () => this.notifications.update((list) => [...list, notification]),
    });
  }
}
