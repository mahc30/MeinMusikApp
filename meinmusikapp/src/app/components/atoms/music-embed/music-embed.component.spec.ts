import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicEmbedComponent } from './music-embed.component';

describe('MusicEmbedComponent', () => {
  let component: MusicEmbedComponent;
  let fixture: ComponentFixture<MusicEmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicEmbedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
