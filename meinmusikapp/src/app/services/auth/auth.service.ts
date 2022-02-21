import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { queryBuilder } from 'src/app/helpers/queryBuilder'
import { getAuthorizationHeaders } from 'src/app/helpers/requests/httpHeaders';
import { AuthResponse } from 'src/app/models/auth/auth-response.i';
import { AccessTokenResponse } from 'src/app/models/auth/access-token-response.i';
import { getAuthorizationParams, getRefreshTokenParams } from 'src/app/helpers/requests/authorizationParams';
import { getToken, setToken } from 'src/app/helpers/localStorage';
import { startRefreshTokenTimeout } from 'src/app/helpers/requests/refreshTokenTimeout';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private reqAuthUrl: string = environment.SPOTIFY_AUTH_URL + environment.SPOTIFY_API_ENDPOINTS.authorize;
  private reqTokenUrl: string = environment.SPOTIFY_AUTH_URL + environment.SPOTIFY_API_ENDPOINTS.requestToken;

  constructor(private http: HttpClient) { }

  requestAuthorization() {
    let authConfig = {
      client_id: environment.CLIENT_ID,
      response_type: "code",
      redirect_uri: encodeURI(environment.REDIRECT_URI),
      state: "12345",
      show_dialog: true,
      scope: environment.SCOPES
    }

    let authUrl: string = queryBuilder(this.reqAuthUrl, authConfig)
    window.location.href = authUrl
  }

  requestToken(options: AuthResponse) : Observable<AccessTokenResponse> {

    let accessTokenRequest = getAuthorizationParams(options);
    let httpOptions = getAuthorizationHeaders();

    return this.http.post<AccessTokenResponse>(this.reqTokenUrl, accessTokenRequest, httpOptions)
  }

  refreshToken(): Observable<AccessTokenResponse> {
    let refreshTokenRequest = getRefreshTokenParams();
    let httpOptions = getAuthorizationHeaders();

    return this.http.post<AccessTokenResponse>(this.reqTokenUrl, refreshTokenRequest, httpOptions);
  }

  isAuth(){
    return getToken() !== null;
  }
}
