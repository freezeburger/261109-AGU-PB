import { Component, computed, input, output, signal } from '@angular/core';

export type ButtonLevel = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
export type ButtonVariant = 'solid' | 'outlined' | 'text';

/**
 * Bouton de l'application.
 * <app-button level="primary" (action)="save()">Enregistrer</app-button>
 * <app-button variant="outlined" [loading]="saving()">Enregistrer</app-button>
 */
@Component({
  selector: 'app-button',
  styleUrl: './button.ui.scss',
  templateUrl: './button.ui.html',
  host: {
    '(mousedown)': 'handleMousedown()',
    '(mouseleave)': 'handleMouseup()',
    '(mouseup)': 'handleMouseup()',
    '[class.pulse]': 'longPressAnimation()',
    '[class.full-width]': 'fullWidth()',
  },
})
export class ButtonUi {
  static readonly LONG_PRESS_DURATION_MS = 2000;

  action = output<'click' | 'doubleclick' | 'longpress'>();

  disabled = input(false);
  loading = input(false);
  fullWidth = input(false);
  type = input<'submit' | 'button'>('button');
  level = input<ButtonLevel>('primary');
  variant = input<ButtonVariant>('solid');
  size = input<'small' | 'normal' | 'large'>('normal');
  ariaLabel = input<string>();

  protected isDisabled = computed(() => this.disabled() || this.loading());
  protected cssClasses = computed(() => `${this.level()} ${this.variant()} ${this.size()}`);
  protected longPressAnimation = signal(false);

  private timerId?: ReturnType<typeof setTimeout>;

  protected handleMousedown() {
    if (this.isDisabled()) {
      return;
    }
    this.longPressAnimation.set(true);
    this.timerId = setTimeout(() => {
      this.action.emit('longpress');
      this.longPressAnimation.set(false);
    }, ButtonUi.LONG_PRESS_DURATION_MS);
  }

  protected handleMouseup() {
    clearTimeout(this.timerId);
    this.longPressAnimation.set(false);
  }
}
