import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonUi } from './button.ui';

describe('ButtonUi', () => {
  let component: ButtonUi;
  let fixture: ComponentFixture<ButtonUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ButtonUi] }).compileComponents();
    fixture = TestBed.createComponent(ButtonUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should emit "click" when clicked', () => {
    const events: string[] = [];
    component.action.subscribe((event) => events.push(event));

    fixture.nativeElement.querySelector('button').click();

    expect(events).toEqual(['click']);
  });

  it('should apply level, variant and size classes', async () => {
    fixture.componentRef.setInput('level', 'error');
    fixture.componentRef.setInput('variant', 'outlined');
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(Array.from(button.classList).sort()).toEqual(['error', 'normal', 'outlined']);
  });

  it('should be disabled and show a spinner while loading', async () => {
    fixture.componentRef.setInput('loading', true);
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.querySelector('.spinner')).not.toBeNull();
  });
});
