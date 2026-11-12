import { Component, input } from '@angular/core';

/**
 * Bloc gris animé affiché pendant un chargement.
 * <app-skeleton width="60%" height="1rem" />
 */
@Component({
  selector: 'app-skeleton',
  styleUrl: './skeleton.ui.scss',
  template: '',
  host: {
    'aria-hidden': 'true',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[class.circle]': 'shape() === "circle"',
  },
})
export class SkeletonUi {
  width = input('100%');
  height = input('1rem');
  shape = input<'rectangle' | 'circle'>('rectangle');
}
