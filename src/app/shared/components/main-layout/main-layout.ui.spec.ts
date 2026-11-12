import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MainLayoutUi } from './main-layout.ui';
import { MenuEntry } from '../menu-item/menu-item.ui';

@Component({
  imports: [MainLayoutUi],
  template: `
    <app-main-layout appTitle="Atelier" userName="M. Laurent" [menu]="menu">
      <p class="page">Contenu</p>
    </app-main-layout>
  `,
})
class HostComponent {
  menu: MenuEntry[] = [
    { label: 'Produits', link: '/products' },
    { label: 'Notifications', link: '/notifications', badge: 3 },
  ];
}

describe('MainLayoutUi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('should render header, menu entries and projected content', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toBe('Atelier');
    expect(element.querySelectorAll('app-menu-item').length).toBe(2);
    expect(element.querySelector('main .page')?.textContent).toBe('Contenu');
  });

  it('should open the sidebar with the menu button', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    (element.querySelector('.menu-toggle') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(element.querySelector('.sidebar')?.classList).toContain('open');
    expect(element.querySelector('.backdrop')).not.toBeNull();
  });
});
