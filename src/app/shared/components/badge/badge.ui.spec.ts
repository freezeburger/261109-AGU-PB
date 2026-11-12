import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeUi } from './badge.ui';

describe('BadgeUi', () => {
  let fixture: ComponentFixture<BadgeUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BadgeUi] }).compileComponents();
    fixture = TestBed.createComponent(BadgeUi);
  });

  it('should display the value with the level class', async () => {
    fixture.componentRef.setInput('value', 3);
    fixture.componentRef.setInput('level', 'error');
    await fixture.whenStable();

    const badge = fixture.nativeElement.querySelector('.badge') as HTMLElement;
    expect(badge.textContent?.trim()).toBe('3');
    expect(badge.classList).toContain('error');
  });
});
