import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastUi } from './toast.ui';

describe('ToastUi', () => {
  let fixture: ComponentFixture<ToastUi>;
  let service: ToastService;
  let element: HTMLElement;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({ imports: [ToastUi] }).compileComponents();
    fixture = TestBed.createComponent(ToastUi);
    service = TestBed.inject(ToastService);
    element = fixture.nativeElement;
  });

  afterEach(() => vi.useRealTimers());

  it('should display a toast then remove it after its duration', () => {
    service.show('Identifiant copié', { level: 'success', duration: 1000 });
    fixture.detectChanges();
    expect(element.querySelector('.toast.success')?.textContent).toContain('Identifiant copié');

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(element.querySelector('.toast')).toBeNull();
  });

  it('should run the action and dismiss the toast', () => {
    const onAction = vi.fn();
    service.show('Notification supprimée.', { actionLabel: 'Annuler', onAction });
    fixture.detectChanges();

    (element.querySelector('.action') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(onAction).toHaveBeenCalled();
    expect(service.toasts()).toEqual([]);
  });
});
