import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CardUi } from './card.ui';

@Component({
  imports: [CardUi],
  template: `
    <app-card header="Informations" subtitle="Produit n° 12">
      <p class="content">Contenu</p>
      <button card-actions>Modifier</button>
    </app-card>
  `,
})
class HostComponent {}

describe('CardUi', () => {
  it('should render title, subtitle, content and actions', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h2')?.textContent).toBe('Informations');
    expect(element.querySelector('.subtitle')?.textContent).toBe('Produit n° 12');
    expect(element.querySelector('.card-body .content')).not.toBeNull();
    expect(element.querySelector('.card-actions button')?.textContent).toBe('Modifier');
  });
});
