import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastUi } from '../shared/components/toast/toast.ui';

@Component({
  imports: [RouterOutlet, ToastUi],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
