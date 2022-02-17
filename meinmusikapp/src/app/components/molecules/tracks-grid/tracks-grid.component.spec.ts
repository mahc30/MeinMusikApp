import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksGridComponent } from './tracks-grid.component';

describe('TracksGridComponent', () => {
  let component: TracksGridComponent;
  let fixture: ComponentFixture<TracksGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
