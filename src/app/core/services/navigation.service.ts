import { effect, inject, Service } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Service()
export class NavigationService {
  private authentication = inject(AuthService);
  private router = inject(Router);
  loginRedirection = effect(() => {
      if (this.authentication.credentials()) {
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      } else {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
  });
}