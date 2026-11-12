import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogUi } from './dialog.ui';

describe('DialogUi', () => {
  let fixture: ComponentFixture<DialogUi>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DialogUi] }).compileComponents();
    fixture = TestBed.createComponent(DialogUi);
    fixture.componentRef.setInput('header', 'Quitter sans enregistrer ?');
    element = fixture.nativeElement;
  });

  it('should render nothing while closed', async () => {
    await fixture.whenStable();
    expect(element.querySelector('[role="dialog"]')).toBeNull();
  });

  it('should open and close on backdrop click', async () => {
    fixture.componentInstance.open.set(true);
    await fixture.whenStable();
    expect(element.querySelector('h2')?.textContent).toBe('Quitter sans enregistrer ?');

    (element.querySelector('.backdrop') as HTMLElement).click();
    await fixture.whenStable();

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('should close on Escape', async () => {
    fixture.componentInstance.open.set(true);
    await fixture.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(fixture.componentInstance.open()).toBe(false);
  });
});
