import { Component, computed, inject, model, signal } from '@angular/core';
import { HeaderUi } from '../shared/components/header/header.ui';
import { CardUi } from '../shared/components/card/card.ui';
import { FormFieldUi } from '../shared/components/form-field/form-field.ui';
import { ButtonUi } from '../shared/components/button/button.ui';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  imports: [HeaderUi, CardUi, FormFieldUi, ButtonUi, FormsModule],
  selector: 'app-login',
  styles: `
:host {
    display: block;
    align-items: center;
    background-color: var(--seconodary-color);
    width: 100vw;
    height: 100vh;
 
}
app-card {
    max-width: 600px;
    margin: auto;
    margin-top: 100px;
}  
`,
  template: `
<app-header />
<app-card header="Login" subtitle="Entrez vos identifiants">
 
    <app-form-field label="Adresse e-mail" forId="email" [required]="true" [error]="emailError()">
        <input id="email" type="email" [(ngModel)]="email" />
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
 
 
    <div card-actions>
        <app-button [disabled]="btnDisabled()" (action)="processLogin()">Me connecter</app-button>
    </div>
 
</app-card>
  `,
})
export class LoginPage {

  //private toast = inject(ToastService);
  private authentication = inject(AuthService);
  protected email = signal("");

  protected emailError = computed(() => {
    if (!this.email()) {
      return 'Adresse email obligatoire';
    }
    if (!this.email().includes('@')) {
      return 'Email doit inclure @';
    }
    return null;
  })


  protected showPassword = signal(false);
  protected password = signal("");

  protected passwordError = computed(() => {
    if (!this.password()) {
      return 'Password obligatoire';
    }
    return null;
  })

  protected btnDisabled = computed(() => {
    return Boolean(this.passwordError() || this.emailError());
  })

  processLogin() {
    console.log("processing login");
    this.authentication.login(this.email(), this.password());
    //this.toast.show('Authentification réussie, vous allez être redirigé(e)', { level: 'success' });
  }

}

