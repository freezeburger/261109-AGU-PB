import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MenuUi } from './menu.ui';

@Component({
  imports: [MenuUi],
  template: `<app-menu header="Navigation"><a class="entry">Produits</a></app-menu>`,
})
class HostComponent {}

describe('MenuUi', () => {
  it('should render the title and the projected entries', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('nav')?.getAttribute('aria-label')).toBe('Navigation');
    expect(element.querySelector('.menu-title')?.textContent).toBe('Navigation');
    expect(element.querySelector('nav .entry')).not.toBeNull();
  });
});
