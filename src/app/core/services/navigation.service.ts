import { effect, inject, Service } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
@Service()
export class NavigationService {
  private authentication = inject(AuthService);
  private router = inject(Router);
  private location = inject(Location);

  loginRedirection = effect(() => {

    const redirect = this.location.path() !== '/login' ? this.location.path() : '/home';

    if (this.authentication.token()) {
      setTimeout(() => {
        this.router.navigate([redirect]);
      }, 2000);
    } else {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  });
}