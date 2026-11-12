import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxUi } from './checkbox.ui';

describe('CheckboxUi', () => {
  let fixture: ComponentFixture<CheckboxUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CheckboxUi] }).compileComponents();
    fixture = TestBed.createComponent(CheckboxUi);
    fixture.componentRef.setInput('label', 'Rester connecté');
    await fixture.whenStable();
  });

  it('should toggle the checked model when clicked', async () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    input.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.checked()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Rester connecté');
  });
});
