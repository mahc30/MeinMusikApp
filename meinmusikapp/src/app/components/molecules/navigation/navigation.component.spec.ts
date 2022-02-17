import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { getToken, setToken } from 'src/app/helpers/localStorage';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ NavigationComponent ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to Saved component', () => {
    spyOn(router, 'navigate');
    component.goToSaved();
    expect(router.navigate).toHaveBeenCalledOnceWith(["saved"])
  });

  it('should delete token on exit', ()=> {
    setToken("Falsy");
    expect(getToken()).toBe("Falsy")

    component.exit();
    expect(getToken()).toBeFalsy();
  })
  
  it('should redirect to login on exit', () => {
    spyOn(router, 'navigate');
    component.exit()

    expect(router.navigate).toHaveBeenCalledOnceWith(["login"])
  })
});
