import { inject, Service, signal } from '@angular/core';
import { CountdownService } from './countdown.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';


const API = 'http://localhost:5050/auth/login';
const EMAIL = 'paul.martin@atelier.dev';
const PASSWORD = 'Atelier2026!';
const API_VERIFY_TOKEN = 'http://localhost:5050/auth/verify';

const TOKEN_KEY = 'auth_token';

export type User={
  email:string
  name:string
}


@Service()
export class AuthService {
  private toast = inject(ToastService);
  private http = inject(HttpClient);

  token = signal<string | null>(null);
  user = signal<User | null>(null)
  constructor() {
    this.verifyToken()
  }

  verifyToken() {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      this.http.post(API_VERIFY_TOKEN,{token: storedToken}).subscribe(
        {
          next:(response:any) => {
            if (response.valid){
              this.token.set(storedToken);
              this.user.set(response.user);
              this.toast.show(`Bienvenue ${this.user()?.name}`, { level: 'success' });
            }
          }
        }
      )

    }
  }

  login(email: string, password: string) {
    this.http.post(API, { username: email, password: password }).subscribe({
      next: (response: any) => {
        this.token.set(response.token);
        localStorage.setItem(TOKEN_KEY, response.token);
        this.user.set(response.user);

        this.toast.show(`Authentification réussie, vous allez être redirigé(e)`, {
          level: 'success',
        });
      },
      error: (error) => {
        this.token.set(null);
        this.user.set(null);
        this.toast.show('Authentification refusée !', { level: 'error' });
      },
    });
  }

  logout() {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem(TOKEN_KEY);
    this.toast.show('Déconnexion réussie, vous allez être redirigé(e)', { level: 'success' });
  }
}
 