import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BreadcrumbUi } from './breadcrumb.ui';

describe('BreadcrumbUi', () => {
  let fixture: ComponentFixture<BreadcrumbUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbUi],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(BreadcrumbUi);
  });

  it('should render links and mark the last item as current page', async () => {
    fixture.componentRef.setInput('items', [
      { label: 'Produits', link: '/products' },
      { label: 'Crème visage' },
    ]);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('a')?.getAttribute('href')).toBe('/products');
    expect(element.querySelector('[aria-current="page"]')?.textContent).toBe('Crème visage');
  });
});
