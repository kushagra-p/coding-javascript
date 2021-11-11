import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamToolbarComponent } from './team-toolbar.component';

describe('TeamToolbarComponent', () => {
  let component: TeamToolbarComponent;
  let fixture: ComponentFixture<TeamToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
