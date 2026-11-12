import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeUi } from '../../shared/components/badge/badge.ui';
import { ButtonUi } from '../../shared/components/button/button.ui';
import { CardUi } from '../../shared/components/card/card.ui';
import { CheckboxUi } from '../../shared/components/checkbox/checkbox.ui';
import { DialogUi } from '../../shared/components/dialog/dialog.ui';
import { DrawerUi } from '../../shared/components/drawer/drawer.ui';
import { EmptyStateUi } from '../../shared/components/empty-state/empty-state.ui';
import { FormFieldUi } from '../../shared/components/form-field/form-field.ui';
import { NotificationUi } from '../../shared/components/notification/notification.ui';
import { PaginatorUi } from '../../shared/components/paginator/paginator.ui';
import { SkeletonUi } from '../../shared/components/skeleton/skeleton.ui';
import { TagUi } from '../../shared/components/tag/tag.ui';
import { ToastService } from '../../shared/components/toast/toast.service';

/** EXEMPLE — Vitrine de tous les composants partagés. */
@Component({
  imports: [
    FormsModule,
    BadgeUi,
    ButtonUi,
    CardUi,
    CheckboxUi,
    DialogUi,
    DrawerUi,
    EmptyStateUi,
    FormFieldUi,
    NotificationUi,
    PaginatorUi,
    SkeletonUi,
    TagUi,
  ],
  selector: 'app-components-example',
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-4);
    }
  `,
  template: `
    <div class="stack">
      <h1>Vitrine des composants</h1>

      <div class="grid">
        <app-card header="Boutons" subtitle="level · variant · size · loading">
          <div class="stack">
            <div class="row">
              <app-button>Primary</app-button>
              <app-button level="accent">Accent</app-button>
              <app-button level="secondary">Secondary</app-button>
            </div>
            <div class="row">
              <app-button level="success">Success</app-button>
              <app-button level="warning">Warning</app-button>
              <app-button level="error">Error</app-button>
            </div>
            <div class="row">
              <app-button variant="outlined">Outlined</app-button>
              <app-button variant="text">Text</app-button>
              <app-button [loading]="true">Loading</app-button>
              <app-button [disabled]="true">Disabled</app-button>
            </div>
          </div>
        </app-card>

        <app-card header="Badges & tags">
          <div class="stack">
            <div class="row">
              <app-badge [value]="3" />
              <app-badge [value]="12" level="primary" />
              <app-badge value="new" level="success" />
              <app-badge [value]="99" level="error" />
            </div>
            <div class="row">
              <app-tag level="info">Info</app-tag>
              <app-tag level="success">Succès</app-tag>
              <app-tag level="warning">Avert.</app-tag>
              <app-tag level="error">Erreur</app-tag>
              <app-tag [rounded]="true">Neutre</app-tag>
            </div>
          </div>
        </app-card>

        <app-card header="Formulaire">
          <app-form-field label="Nom" forId="name" hint="Votre nom complet." [required]="true" [length]="name().length" [maxLength]="40">
            <input id="name" maxlength="40" [(ngModel)]="name" />
          </app-form-field>
          <app-form-field label="E-mail" forId="mail" error="Format d'adresse e-mail invalide.">
            <input id="mail" value="marie.laurent@exemple" />
          </app-form-field>
          <app-form-field label="Pays" forId="country">
            <select id="country">
              <option>Belgique</option>
              <option>France</option>
            </select>
          </app-form-field>
          <app-checkbox label="J'accepte les conditions" [(checked)]="accepted" />
        </app-card>

        <app-card header="Bannières">
          <div class="stack">
            <app-notification level="info" header="Information">Message neutre.</app-notification>
            <app-notification level="success" header="Produit enregistré" />
            <app-notification level="warning" header="Miniature inaccessible" />
            <app-notification level="error" header="Erreur" [closable]="true">Fermable.</app-notification>
          </div>
        </app-card>

        <app-card header="Superpositions" subtitle="dialog · drawer · toast">
          <div class="row">
            <app-button (action)="dialogOpen.set(true)">Ouvrir le dialog</app-button>
            <app-button level="accent" (action)="drawerOpen.set(true)">Ouvrir le drawer</app-button>
            <app-button variant="outlined" (action)="showToast()">Afficher un toast</app-button>
          </div>
        </app-card>

        <app-card header="Chargement & pagination">
          <div class="stack">
            <div class="row">
              <app-skeleton width="40px" height="40px" shape="circle" />
              <div class="stack" style="flex: 1; gap: 6px">
                <app-skeleton width="70%" />
                <app-skeleton width="40%" />
              </div>
            </div>
            <app-paginator [(page)]="page" [total]="128" [pageSize]="20" />
          </div>
        </app-card>
      </div>

      <app-empty-state icon="📭" header="État vide" message="Aucune donnée à afficher pour le moment.">
        <app-button variant="outlined">Action</app-button>
      </app-empty-state>
    </div>

    <app-dialog [(open)]="dialogOpen" header="Confirmer l'action">
      <p>Voulez-vous vraiment continuer ?</p>
      <div dialog-actions>
        <app-button variant="outlined" (action)="dialogOpen.set(false)">Annuler</app-button>
        <app-button (action)="dialogOpen.set(false)">Confirmer</app-button>
      </div>
    </app-dialog>

    <app-drawer [(open)]="drawerOpen" header="Filtres">
      <app-form-field label="Recherche" forId="drawer-search">
        <input id="drawer-search" placeholder="ex. crème" />
      </app-form-field>
      <app-checkbox label="Uniquement les non lues" />
      <div drawer-footer>
        <app-button variant="outlined" (action)="drawerOpen.set(false)">Fermer</app-button>
        <app-button (action)="drawerOpen.set(false)">Appliquer</app-button>
      </div>
    </app-drawer>
  `,
})
export class ComponentsExamplePage {
  private toast = inject(ToastService);

  protected name = signal('');
  protected accepted = signal(false);
  protected page = signal(1);
  protected dialogOpen = signal(false);
  protected drawerOpen = signal(false);

  protected showToast() {
    this.toast.show('Action effectuée avec succès', { level: 'success' });
  }
}
