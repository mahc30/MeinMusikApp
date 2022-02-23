import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, retryWhen, throwError } from 'rxjs';
import { setToken } from 'src/app/helpers/localStorage';
import { getAuthorizationHeaders } from 'src/app/helpers/requests/httpHeaders';
import { startRefreshTokenTimeout } from 'src/app/helpers/requests/refreshTokenTimeout';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            //console.error("Error Event");
          } else {
            //console.log(`error status : ${error.status} ${error.statusText}`);
            if (error.status === 400 || error.status === 401) {
              if (this.authService.isAuth()) {
                this.authService.refreshToken().subscribe(res => {
                  setToken(res.access_token);
                  startRefreshTokenTimeout(this.authService, res.expires_in);
                  window.location.reload()
                })
              }
              else {
                this.router.navigate(["login"]);
              }
            } else this.router.navigate(["login"]);
          }
        } else {
          console.error("some thing else happened");
        }
        return throwError(() => error);
      })
    )
  }
}
