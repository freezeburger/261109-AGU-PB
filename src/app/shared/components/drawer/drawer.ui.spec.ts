import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerUi } from './drawer.ui';

describe('DrawerUi', () => {
  let fixture: ComponentFixture<DrawerUi>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DrawerUi] }).compileComponents();
    fixture = TestBed.createComponent(DrawerUi);
    fixture.componentRef.setInput('header', 'Filtres');
    fixture.componentRef.setInput('position', 'left');
    element = fixture.nativeElement;
  });

  it('should open on the requested side', async () => {
    fixture.componentInstance.open.set(true);
    await fixture.whenStable();

    const drawer = element.querySelector('.drawer') as HTMLElement;
    expect(drawer.classList).toContain('left');
    expect(drawer.style.width).toBe('360px');
    expect(element.querySelector('h2')?.textContent).toBe('Filtres');
  });

  it('should close with the close button', async () => {
    fixture.componentInstance.open.set(true);
    await fixture.whenStable();

    (element.querySelector('.close') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(element.querySelector('.drawer')).toBeNull();
  });
});
