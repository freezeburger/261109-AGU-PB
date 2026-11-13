import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastUi } from '../shared/components/toast/toast.ui';
import { NavigationService } from '../core/services/navigation.service';

@Component({
  imports: [RouterOutlet, ToastUi],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private navigation = inject(NavigationService);
}
