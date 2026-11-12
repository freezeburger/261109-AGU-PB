import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateUi } from './empty-state.ui';

describe('EmptyStateUi', () => {
  let fixture: ComponentFixture<EmptyStateUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmptyStateUi] }).compileComponents();
    fixture = TestBed.createComponent(EmptyStateUi);
  });

  it('should render an error state as an alert', async () => {
    fixture.componentRef.setInput('header', 'Impossible de charger les produits.');
    fixture.componentRef.setInput('level', 'error');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h3')?.textContent).toBe('Impossible de charger les produits.');
    expect(element.querySelector('[role="alert"]')).not.toBeNull();
  });
});
