import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "../../app.component";
import { AuthService } from "../../services/auth/auth.service";
import { getRefreshTokenParams } from "./requests/authorizationParams";
import { startRefreshTokenTimeout } from "./requests/refreshTokenTimeout";

describe('Helpers', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>
    let authService: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [AuthService],
            declarations: [
                AppComponent
            ],
        })
            .compileComponents();
        authService = TestBed.inject(AuthService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })

    afterEach(() => {
    })

    it('get refresh token params should throw error if no refresh token exists', () => {
        localStorage.clear()
        expect(getRefreshTokenParams).toThrowError("No refresh token");
    });

    it('set refresh token timeout should call auth service refresh token', fakeAsync(() => {
        spyOn(authService, 'refreshToken')
        startRefreshTokenTimeout(authService, 360);
 
        tick(500*1000);
        fixture.detectChanges()

        fixture.whenStable().then(() => {
            expect(authService.refreshToken).toHaveBeenCalled()
        })

        flush()
    }));


});
