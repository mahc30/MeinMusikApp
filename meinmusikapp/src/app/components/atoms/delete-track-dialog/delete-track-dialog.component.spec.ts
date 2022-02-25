import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTrackDialogComponent } from './delete-track-dialog.component';

describe('DeleteTrackDialogComponent', () => {
  let component: DeleteTrackDialogComponent;
  let fixture: ComponentFixture<DeleteTrackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTrackDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
