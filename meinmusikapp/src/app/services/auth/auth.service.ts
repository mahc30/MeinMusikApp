import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAuthorizationHeaders } from 'src/app/shared/helpers/requests/httpHeaders';
import { AuthResponse } from 'src/app/models/auth/auth-response.i';
import { AccessTokenResponse } from 'src/app/models/auth/access-token-response.i';
import { getAuthorizationConfig, getAuthorizationParams, getRefreshTokenParams } from 'src/app/shared/helpers/requests/authorizationParams';
import { queryBuilder } from 'src/app/shared/helpers/queryBuilder';
import { getToken } from 'src/app/shared/helpers/localStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private reqAuthUrl: string = environment.SPOTIFY_AUTH_URL + environment.SPOTIFY_API_ENDPOINTS.authorize;
  private reqTokenUrl: string = environment.SPOTIFY_AUTH_URL + environment.SPOTIFY_API_ENDPOINTS.requestToken;

  constructor(private http: HttpClient) { }

  requestAuthorization() {

    let authUrl: string = queryBuilder(this.reqAuthUrl, getAuthorizationConfig())
    window.location.href = authUrl
  }

  requestToken(options: AuthResponse): Observable<AccessTokenResponse> {

    let accessTokenRequest = getAuthorizationParams(options);
    let httpOptions = getAuthorizationHeaders();

    return this.http.post<AccessTokenResponse>(this.reqTokenUrl, accessTokenRequest, httpOptions)
  }

  refreshToken(): Observable<AccessTokenResponse> {
    let refreshTokenRequest = getRefreshTokenParams();
    let httpOptions = getAuthorizationHeaders();

    return this.http.post<AccessTokenResponse>(this.reqTokenUrl, refreshTokenRequest, httpOptions);
  }

  isAuth() {
    return getToken() !== null;
  }
}
