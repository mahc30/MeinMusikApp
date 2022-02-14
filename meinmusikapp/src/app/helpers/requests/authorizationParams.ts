import { HttpParams } from '@angular/common/http';
import { AuthResponse } from 'src/app/models/auth/auth-response.i';
import { environment } from 'src/environments/environment';

export function getAuthorizationParams(options: AuthResponse) {
    return new HttpParams().set("grant_type", "authorization_code").set("code", options.code).set("redirect_uri", environment.REDIRECT_URI);
}

