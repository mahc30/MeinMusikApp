import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { deleteToken, getToken } from 'src/app/helpers/localStorage';
import { AuthService } from 'src/app/services/auth/auth.service';

import { AuthComponent } from './auth.component';
import { mockAccessTokenResponse, mockAuthResponse } from './test-data/mock-auth-service-data.db';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService],
      declarations: [ AuthComponent ]
    })
    .compileComponents();
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    deleteToken()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if no request params exist', () => {
    spyOn(route.snapshot.queryParamMap, 'get').and.returnValue(null)
    spyOn(component, 'redirect');
    component.ngOnInit();
    expect(component.redirect).toHaveBeenCalledOnceWith("login");
    expect()
  })

it('should request Token if valid request params exists', () => {
    spyOn(route.snapshot.queryParamMap, 'get').withArgs('code').and.returnValue('123').withArgs('state').and.returnValue('12345');

    spyOn(component, 'requestToken');
    component.ngOnInit();
    expect(component.requestToken).toHaveBeenCalled();
    
  })

  it('should redirect to home if valid request token succeeds', () => {
    expect(getToken()).toBeFalsy()
    spyOn(component, 'redirect');
    spyOn(authService, 'requestToken').withArgs(mockAuthResponse).and.returnValue(of(mockAccessTokenResponse));

    component.requestToken(mockAuthResponse);
    expect(getToken()).toBeTruthy()
    expect(component.redirect).toHaveBeenCalledOnceWith("home");

  })

});
