import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonUi } from '../../shared/components/button/button.ui';
import { CardUi } from '../../shared/components/card/card.ui';
import { CheckboxUi } from '../../shared/components/checkbox/checkbox.ui';
import { FormFieldUi } from '../../shared/components/form-field/form-field.ui';
import { NotificationUi } from '../../shared/components/notification/notification.ui';

/**
 * EXEMPLE — Maquette 01 « Connexion ».
 * Astuce démo : le mot de passe « demo » réussit, tout autre mot de passe échoue.
 */
@Component({
  imports: [FormsModule, ButtonUi, CardUi, CheckboxUi, FormFieldUi, NotificationUi],
  selector: 'app-login-example',
  styles: `
    :host {
      display: grid;
      place-items: center;
      min-height: 100vh;
      padding: var(--space-4);
      background:
        radial-gradient(circle at 15% 20%, var(--accent-color) 0 8%, transparent 9%),
        linear-gradient(135deg, var(--primary-color), var(--primary-hover));
    }

    app-card {
      width: min(420px, 100%);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
    }
  `,
  template: `
    <app-card header="Connexion" subtitle="Accès réservé aux utilisateurs autorisés.">
      <form (ngSubmit)="submit()" novalidate>
        @if (loginFailed()) {
          <app-notification level="error" header="Identifiant ou mot de passe incorrect.">
            Vérifiez vos informations puis réessayez.
          </app-notification>
        }

        <app-form-field label="Adresse e-mail" forId="email" [required]="true" [error]="emailError()">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="username"
            [(ngModel)]="email"
            (blur)="emailTouched.set(true)"
          />
        </app-form-field>

        <app-form-field
          label="Mot de passe"
          forId="password"
          hint="Saisie masquée."
          [required]="true"
          [error]="passwordError()"
        >
          <input
            id="password"
            name="password"
            autocomplete="current-password"
            [type]="showPassword() ? 'text' : 'password'"
            [(ngModel)]="password"
          />
          <app-button variant="text" size="small" (action)="showPassword.set(!showPassword())">
            {{ showPassword() ? 'Masquer' : 'Afficher' }}
          </app-button>
        </app-form-field>

        <app-checkbox label="Rester connecté sur cet appareil" [(checked)]="rememberMe" />

        <app-button type="submit" [fullWidth]="true" [loading]="loading()">
          {{ loading() ? 'Connexion…' : 'Se connecter' }}
        </app-button>

        <div class="footer">
          <a href="#">Mot de passe oublié ?</a>
          <span class="muted">* champ obligatoire</span>
        </div>
      </form>
    </app-card>
  `,
})
export class LoginExamplePage {
  private router = inject(Router);

  protected email = signal('');
  protected password = signal('');
  protected rememberMe = signal(false);
  protected showPassword = signal(false);

  protected emailTouched = signal(false);
  protected submitted = signal(false);
  protected loading = signal(false);
  protected loginFailed = signal(false);

  protected emailError = computed(() => {
    if (!this.emailTouched() && !this.submitted()) {
      return null;
    }
    const value = this.email().trim();
    if (!value) {
      return 'Adresse e-mail obligatoire.';
    }
    return value.includes('@') ? null : "Format d'adresse e-mail invalide.";
  });

  protected passwordError = computed(() =>
    this.submitted() && !this.password() ? 'Mot de passe obligatoire.' : null,
  );

  protected submit() {
    this.submitted.set(true);
    if (this.emailError() || this.passwordError()) {
      return;
    }

    this.loading.set(true);
    this.loginFailed.set(false);

    // Simule un appel POST /auth/login
    setTimeout(() => {
      this.loading.set(false);
      if (this.password() === 'demo') {
        this.router.navigateByUrl('/examples/products');
      } else {
        this.loginFailed.set(true);
        this.password.set('');
        this.submitted.set(false);
      }
    }, 1000);
  }
}
