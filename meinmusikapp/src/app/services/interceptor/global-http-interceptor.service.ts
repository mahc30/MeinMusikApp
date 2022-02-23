import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { startRefreshTokenTimeout } from 'src/app/shared/helpers/requests/refreshTokenTimeout';
import { AuthService } from '../auth/auth.service';
import { setToken } from '../../shared/helpers/localStorage';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        console.log("CATCH", error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) console.error("Error Event");
          console.log(`AAAAAAAAAAAAAAAAAAAA error status : ${error.error.status} ${error.error.statusText}`);
            if (error.error.status === 400 || error.error.status === 401) {
              console.log(error, "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
              if (this.authService.isAuth()) {
                console.log("IS AUTH", error)
                this.authService.refreshToken().subscribe(res => {
                  setToken(res.access_token);
                  startRefreshTokenTimeout(this.authService, res.expires_in);
                  window.location.reload()
                  return
                })
              }

              this.router.navigate(["login"]);
            } else this.router.navigate(["login"]);
        } else {
          this.router.navigate(["login"]);
          //console.error("some thing else happened");
        }
        return throwError(() => error);
      })
    )
  }
}
