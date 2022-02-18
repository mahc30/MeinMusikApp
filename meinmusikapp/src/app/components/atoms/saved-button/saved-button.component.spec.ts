import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedButtonComponent } from './saved-button.component';

describe('SavedButtonComponent', () => {
  let component: SavedButtonComponent;
  let fixture: ComponentFixture<SavedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Toggle isSaved property on Toggle call', () => {
    //Default value is false
    expect(component.isSaved).toBeFalse();
    component.toggle();
    expect(component.isSaved).toBeTrue();
  })
});
