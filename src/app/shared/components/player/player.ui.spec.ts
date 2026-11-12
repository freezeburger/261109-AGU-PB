import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerUi } from './player.ui';

describe('PlayerUi', () => {
  let component: PlayerUi;
  let fixture: ComponentFixture<PlayerUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerUi],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
