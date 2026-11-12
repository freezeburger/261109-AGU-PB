import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormFieldUi } from './form-field.ui';

@Component({
  imports: [FormFieldUi],
  template: `
    <app-form-field
      label="Titre"
      forId="title"
      hint="3 à 100 caractères."
      [required]="true"
      [error]="error()"
      [length]="23"
      [maxLength]="100"
    >
      <input id="title" />
    </app-form-field>
  `,
})
class HostComponent {
  error = signal<string | null>(null);
}

describe('FormFieldUi', () => {
  it('should show label, hint and counter', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('label')?.getAttribute('for')).toBe('title');
    expect(element.querySelector('.ff-required')).not.toBeNull();
    expect(element.querySelector('.ff-hint')?.textContent).toBe('3 à 100 caractères.');
    expect(element.querySelector('.ff-counter')?.textContent?.trim()).toBe('23 / 100');
  });

  it('should replace the hint by the error', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.error.set('Champ obligatoire.');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.ff-hint')).toBeNull();
    expect(element.querySelector('.ff-error')?.textContent).toBe('Champ obligatoire.');
    expect(element.querySelector('app-form-field')?.classList).toContain('has-error');
  });
});
