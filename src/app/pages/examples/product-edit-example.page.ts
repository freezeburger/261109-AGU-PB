import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbUi } from '../../shared/components/breadcrumb/breadcrumb.ui';
import { ButtonUi } from '../../shared/components/button/button.ui';
import { CardUi } from '../../shared/components/card/card.ui';
import { DialogUi } from '../../shared/components/dialog/dialog.ui';
import { FormFieldUi } from '../../shared/components/form-field/form-field.ui';
import { NotificationUi } from '../../shared/components/notification/notification.ui';
import { TagUi } from '../../shared/components/tag/tag.ui';
import { ToastService } from '../../core/services/toast.service';
import { PRODUCTS, Product } from './example.data';

/** EXEMPLE — Maquette 04 « Modification produit ». */
@Component({
  imports: [
    FormsModule,
    BreadcrumbUi,
    ButtonUi,
    CardUi,
    DialogUi,
    FormFieldUi,
    NotificationUi,
    TagUi,
  ],
  selector: 'app-product-edit-example',
  styles: `
    .title-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-3);
    }

    h1 {
      margin: 0;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: var(--space-5);
      align-items: start;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .suffix {
      font-weight: 600;
    }

    .preview {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      border-radius: var(--radius);
      background: var(--surface-hover);
      color: var(--text-color);
      overflow: hidden;
    }

    .preview img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media (width <= 1024px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `,
  template: `
    <div class="stack">
      <app-breadcrumb
        [items]="[
          { label: 'Produits', link: '/examples/products' },
          { label: initial.title, link: '/examples/products/' + initial.id },
          { label: 'Modifier' },
        ]"
      />

      <div class="title-bar">
        <h1>Modifier le produit</h1>
        @if (dirty()) {
          <app-tag level="warning" [rounded]="true">● Modifications non enregistrées</app-tag>
        }
      </div>

      <div class="layout">
        <app-card>
          <form (ngSubmit)="save()" novalidate>
            <p class="muted">Les champs marqués * sont obligatoires.</p>

            <app-form-field label="Identifiant" forId="id" hint="Non modifiable.">
              <input id="id" [value]="initial.id" readonly />
            </app-form-field>

            <app-form-field
              label="Titre"
              forId="title"
              hint="3 à 100 caractères."
              [required]="true"
              [error]="show(errors().title)"
              [length]="title().length"
              [maxLength]="100"
            >
              <input id="title" name="title" maxlength="100" [(ngModel)]="title" [disabled]="saving()" />
            </app-form-field>

            <app-form-field label="Prix" forId="price" [required]="true" [error]="show(errors().price)">
              <input id="price" name="price" inputmode="decimal" [(ngModel)]="price" [disabled]="saving()" />
              <span class="suffix">€</span>
            </app-form-field>

            <app-form-field
              label="Description"
              forId="description"
              hint="Texte brut, 10 à 1 000 caractères."
              [required]="true"
              [error]="show(errors().description)"
              [length]="description().length"
              [maxLength]="1000"
            >
              <textarea id="description" name="description" maxlength="1000" [(ngModel)]="description" [disabled]="saving()"></textarea>
            </app-form-field>

            <app-form-field
              label="URL de la miniature"
              forId="thumbnail"
              hint="URL https:// absolue."
              [required]="true"
              [error]="show(errors().thumbnail)"
            >
              <input id="thumbnail" name="thumbnail" type="url" [(ngModel)]="thumbnail" (ngModelChange)="previewFailed.set(false)" [disabled]="saving()" />
            </app-form-field>

            @if (submitted() && errorCount() > 0) {
              <app-notification level="error">
                ⚠ {{ errorCount() }} champ(s) à corriger. L'enregistrement est bloqué.
              </app-notification>
            }

            <div class="row" style="justify-content: flex-end">
              <app-button variant="outlined" level="secondary" [disabled]="saving()" (action)="cancel()">
                Annuler
              </app-button>
              <app-button type="submit" [loading]="saving()" [disabled]="!dirty()">
                {{ saving() ? 'Enregistrement…' : 'Enregistrer' }}
              </app-button>
            </div>
          </form>
        </app-card>

        <app-card header="Aperçu" subtitle="Mis à jour à la saisie de l'URL.">
          <div class="preview">
            @if (previewFailed()) {
              Aperçu indisponible
            } @else {
              <img [src]="thumbnail()" alt="Aperçu de la miniature" (error)="previewFailed.set(true)" />
            }
          </div>
        </app-card>
      </div>
    </div>

    <app-dialog [(open)]="confirmLeave" header="Quitter sans enregistrer ?">
      <p>Vos modifications seront perdues.</p>
      <div dialog-actions>
        <app-button variant="outlined" (action)="confirmLeave.set(false)">Rester sur la page</app-button>
        <app-button level="error" (action)="goToDetail()">Quitter</app-button>
      </div>
    </app-dialog>
  `,
})
export class ProductEditExamplePage implements OnInit {
  private router = inject(Router);
  private toast = inject(ToastService);

  /** Paramètre de route « :id ». */
  id = input.required<string>();

  protected initial: Product = PRODUCTS[0];

  protected title = signal('');
  protected price = signal('');
  protected description = signal('');
  protected thumbnail = signal('');

  protected submitted = signal(false);
  protected saving = signal(false);
  protected confirmLeave = signal(false);
  protected previewFailed = signal(false);

  ngOnInit() {
    this.initial = PRODUCTS.find((p) => p.id === Number(this.id())) ?? PRODUCTS[0];
    this.title.set(this.initial.title);
    this.price.set(String(this.initial.price).replace('.', ','));
    this.description.set(this.initial.description);
    this.thumbnail.set(this.initial.thumbnail);
  }

  protected dirty = computed(
    () =>
      this.title() !== this.initial.title ||
      this.price() !== String(this.initial.price).replace('.', ',') ||
      this.description() !== this.initial.description ||
      this.thumbnail() !== this.initial.thumbnail,
  );

  protected errors = computed(() => {
    const title = this.title().trim();
    const price = Number(this.price().replace(',', '.'));
    const description = this.description().trim();

    return {
      title: title.length < 3 ? 'Le titre doit contenir au moins 3 caractères.' : null,
      price:
        this.price() === '' || isNaN(price)
          ? 'Le prix est obligatoire.'
          : price < 0
            ? 'Le prix doit être supérieur ou égal à 0.'
            : null,
      description:
        description.length < 10 ? 'La description doit contenir au moins 10 caractères.' : null,
      thumbnail: this.thumbnail().startsWith('https://') ? null : 'URL https:// absolue attendue.',
    };
  });

  protected errorCount = computed(() => Object.values(this.errors()).filter(Boolean).length);

  /** Affiche les erreurs dès qu'une valeur a changé, ou après une tentative d'enregistrement. */
  protected show(error: string | null) {
    return this.submitted() || this.dirty() ? error : null;
  }

  protected save() {
    this.submitted.set(true);
    if (this.errorCount() > 0) {
      return;
    }

    this.saving.set(true);
    // Simule un appel PUT /products/:id
    setTimeout(() => {
      this.saving.set(false);
      this.toast.show('Produit enregistré', { level: 'success' });
      this.goToDetail();
    }, 1000);
  }

  protected cancel() {
    if (this.dirty()) {
      this.confirmLeave.set(true);
    } else {
      this.goToDetail();
    }
  }

  protected goToDetail() {
    this.confirmLeave.set(false);
    this.router.navigate(['/examples/products', this.initial.id]);
  }
}
