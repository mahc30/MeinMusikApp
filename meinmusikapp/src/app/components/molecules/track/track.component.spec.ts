import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TrackComponent } from './track.component';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ TrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event with default index', () => {
    spyOn(component.deleteTrackEvent, 'emit');

    component.emitTrackDeleteEvent();

    expect(component.deleteTrackEvent.emit).toHaveBeenCalledOnceWith(-1)
  })

  it('should emit event using track service', () =>{
    spyOn(component.playTrackEvent, 'emit')
    component.emitTrackPlayEvent();
    expect(component.playTrackEvent.emit).toHaveBeenCalled()
  });
});
