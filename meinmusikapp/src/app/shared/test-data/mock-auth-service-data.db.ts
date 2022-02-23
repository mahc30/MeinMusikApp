import { AccessTokenResponse } from "src/app/models/auth/access-token-response.i";
import { AuthResponse } from "src/app/models/auth/auth-response.i";

export const mockAccessTokenResponse: AccessTokenResponse = {
    access_token: "12345",
    token_type: "e",
    scope: "e",
    expires_in: 0,
    refresh_token: "e"
}

export const mockAuthResponse: AuthResponse = {
    code: "123",
    state: "123"
}