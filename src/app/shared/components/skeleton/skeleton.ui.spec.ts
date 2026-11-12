import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonUi } from './skeleton.ui';

describe('SkeletonUi', () => {
  let fixture: ComponentFixture<SkeletonUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SkeletonUi] }).compileComponents();
    fixture = TestBed.createComponent(SkeletonUi);
  });

  it('should apply the size and the circle shape', async () => {
    fixture.componentRef.setInput('width', '36px');
    fixture.componentRef.setInput('height', '36px');
    fixture.componentRef.setInput('shape', 'circle');
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.width).toBe('36px');
    expect(host.classList).toContain('circle');
    expect(host.getAttribute('aria-hidden')).toBe('true');
  });
});
