import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorUi } from './paginator.ui';

describe('PaginatorUi', () => {
  let fixture: ComponentFixture<PaginatorUi>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PaginatorUi] }).compileComponents();
    fixture = TestBed.createComponent(PaginatorUi);
    fixture.componentRef.setInput('total', 128);
    fixture.componentRef.setInput('pageSize', 20);
    await fixture.whenStable();
    element = fixture.nativeElement;
  });

  it('should show the summary and pages with an ellipsis', () => {
    const pages = Array.from(element.querySelectorAll('.page')).map((b) => b.textContent?.trim());

    expect(element.querySelector('.summary')?.textContent).toBe('1–20 sur 128');
    expect(pages).toEqual(['1', '2', '7']);
    expect(element.querySelector('.ellipsis')).not.toBeNull();
  });

  it('should go to the next page and disable "previous" on the first page', async () => {
    const buttons = element.querySelectorAll('button');
    const previous = buttons[0] as HTMLButtonElement;
    const next = buttons[buttons.length - 1] as HTMLButtonElement;
    expect(previous.disabled).toBe(true);

    next.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.page()).toBe(2);
    expect(element.querySelector('.summary')?.textContent).toBe('21–40 sur 128');
  });
});
