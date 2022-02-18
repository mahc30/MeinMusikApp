import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { getToken, getUserImgUrl, getUsername, setToken } from 'src/app/helpers/localStorage';
import { mockMeResponse } from 'src/app/services/user/test-data/mockResponses';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from '../../login/login.component';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;
  let userService : UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: 'login', component: LoginComponent}
      ])],
      providers: [UserService],
      declarations: [ NavigationComponent ]
    })
    .compileComponents();
    userService = TestBed.inject(UserService);
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
  
  it('should load user when created', ()=>{
    spyOn(component, 'loadUser');
    component.ngOnInit();
    expect(component.loadUser).toHaveBeenCalled();
  })

  it('should navigate to Saved component', () => {
    spyOn(router, 'navigate');
    component.goToSaved();
    expect(router.navigate).toHaveBeenCalledOnceWith(["saved"])
  });

  it('should navigate to Home component', () => {
    spyOn(router, 'navigate');
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledOnceWith(["home"])
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
  });

  it('should set local storage items when loading user', ()=>{
    spyOn(userService, 'getCurrentUserProfile').and.returnValue(of(mockMeResponse));
    expect(getUsername()).toBeFalsy();
    expect(getUserImgUrl()).toBeFalsy();
    component.loadUser();

    expect(getUsername()).toBeTruthy();
    expect(getUserImgUrl()).toBeTruthy();
    expect(userService.getCurrentUserProfile).toHaveBeenCalled();
  });

  it('should initialize default values on init', () => {
    const defaultValues = {
      display_name: getUsername() || "USERNAME",
      images: [{url: getUserImgUrl() || "", width: 0, height: 0}],
    };

    expect(component.userInfo).toEqual(defaultValues);
  })
});
