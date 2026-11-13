import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../types/credentials';
import { ToastService } from './toast.service';


const API = 'http://localhost:5050/auth/login';
const EMAIL = 'paul.martin@atelier.dev';
const PASSWORD = 'Atelier2026!';

const TOKEN_KEY = 'auth_token';

@Service()
export class AuthService {

  private toast = inject(ToastService);
  private http = inject(HttpClient);

  token = signal<string | null>(null);

  constructor() {
    console.log('AuthService initialized', this.http);

    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      this.token.set(storedToken);
      this.toast.show('Bienvenue redirection en cours...', { level: 'success' });
    }
  }

  login(email: string, password: string) {
    this.http.post(API, { username: email, password: password }).subscribe({
      next: (response: any) => {
        this.token.set(response.token);
        localStorage.setItem(TOKEN_KEY, response.token);
        this.toast.show('Authentification réussie, vous allez être redirigé(e)', { level: 'success' });
      },
      error: (error) => {
        this.token.set(null);
        this.toast.show('Authentification refusée !', { level: 'error' });
      }
    });
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem(TOKEN_KEY);
    this.toast.show('Déconnexion réussie, vous allez être redirigé(e)', { level: 'success' });
  }
} 