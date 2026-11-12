import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderUi } from './header.ui';

describe('HeaderUi', () => {
  let fixture: ComponentFixture<HeaderUi>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HeaderUi] }).compileComponents();
    fixture = TestBed.createComponent(HeaderUi);
    element = fixture.nativeElement;
  });

  it('should display the default title', async () => {
    await fixture.whenStable();
    expect(element.querySelector('h1')?.textContent).toBe('Paradigm Soundbox');
    expect(element.querySelector('.user')).toBeNull();
  });

  it('should emit logout and menuToggle', async () => {
    fixture.componentRef.setInput('userName', 'M. Laurent');
    fixture.componentRef.setInput('showMenuToggle', true);
    await fixture.whenStable();
    let logouts = 0;
    let toggles = 0;
    fixture.componentInstance.logout.subscribe(() => logouts++);
    fixture.componentInstance.menuToggle.subscribe(() => toggles++);

    (element.querySelector('.logout') as HTMLButtonElement).click();
    (element.querySelector('.menu-toggle') as HTMLButtonElement).click();

    expect(element.querySelector('.avatar')?.textContent).toBe('M');
    expect(logouts).toBe(1);
    expect(toggles).toBe(1);
  });
});
