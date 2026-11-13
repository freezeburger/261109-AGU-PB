import { inject, Service, signal } from '@angular/core';
import { Credentials } from '../types/credentials';
import { ToastService } from './toast.service';

@Service()
export class AuthService {

  private toast = inject(ToastService);
  credentials = signal<Credentials | null>(null);

  login(email : string, password : string) {
    this.credentials.set({email, password});
    this.toast.show('Authentification réussie, vous allez être redirigé(e)', { level: 'success' });
  }

  logout() {
    this.credentials.set(null);
    this.toast.show('Déconnexion réussie, vous allez être redirigé(e)', { level: 'success' });
  }
} 