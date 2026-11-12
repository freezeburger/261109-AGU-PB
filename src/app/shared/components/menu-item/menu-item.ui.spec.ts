import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MenuItemUi } from './menu-item.ui';

describe('MenuItemUi', () => {
  let fixture: ComponentFixture<MenuItemUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemUi],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(MenuItemUi);
    fixture.componentRef.setInput('label', 'Notifications');
    fixture.componentRef.setInput('link', '/notifications');
  });

  it('should render a link with its badge', async () => {
    fixture.componentRef.setInput('badge', 3);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('a')?.getAttribute('href')).toBe('/notifications');
    expect(element.querySelector('.label')?.textContent).toBe('Notifications');
    expect(element.querySelector('app-badge')?.textContent?.trim()).toBe('3');
  });

  it('should hide the badge when there is no value', async () => {
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-badge')).toBeNull();
  });
});
