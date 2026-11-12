import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationUi } from './notification.ui';

describe('NotificationUi', () => {
  let fixture: ComponentFixture<NotificationUi>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NotificationUi] }).compileComponents();
    fixture = TestBed.createComponent(NotificationUi);
    element = fixture.nativeElement;
  });

  it('should use role="alert" for errors', async () => {
    fixture.componentRef.setInput('level', 'error');
    fixture.componentRef.setInput('header', 'Erreur');
    await fixture.whenStable();

    expect(element.querySelector('[role="alert"]')).not.toBeNull();
    expect(element.querySelector('.title')?.textContent).toBe('Erreur');
  });

  it('should hide itself when the close button is clicked', async () => {
    fixture.componentRef.setInput('closable', true);
    await fixture.whenStable();

    (element.querySelector('.close') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(element.querySelector('.notification')).toBeNull();
    expect(fixture.componentInstance.visible()).toBe(false);
  });
});
