import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TagUi } from './tag.ui';

@Component({
  imports: [TagUi],
  template: `<app-tag level="success" [rounded]="true">Succès</app-tag>`,
})
class HostComponent {}

describe('TagUi', () => {
  it('should project the text and apply the level', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    const tag = fixture.nativeElement.querySelector('.tag') as HTMLElement;
    expect(tag.textContent?.trim()).toBe('Succès');
    expect(tag.classList).toContain('success');
    expect(tag.classList).toContain('rounded');
  });
});
