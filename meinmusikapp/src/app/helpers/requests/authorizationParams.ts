import { HttpParams } from '@angular/common/http';
import { AuthResponse } from 'src/app/models/auth/auth-response.i';
import { environment } from 'src/environments/environment';
import { getRefreshToken } from '../localStorage';

export function getAuthorizationParams(options: AuthResponse) {
    return new HttpParams().set("grant_type", "authorization_code").set("code", options.code).set("redirect_uri", environment.REDIRECT_URI);
}

export function getRefreshTokenParams(){
    let refreshToken = getRefreshToken();
    if(refreshToken === null) throw new Error("No refresh token")
    return new HttpParams().set("grant_type", "refresh_token").set("refresh_token", refreshToken);
  }