import { AccessTokenResponse } from "src/app/models/auth/access-token-response.i";

export const MockRequestTokenResponse : AccessTokenResponse = {
    access_token: "mockToken",
    token_type: "sisa",
    scope: "123",
    expires_in: 100,
    refresh_token: ""
}