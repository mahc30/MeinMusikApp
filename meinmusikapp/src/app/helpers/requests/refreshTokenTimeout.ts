import { AuthService } from "src/app/services/auth/auth.service"

export function startRefreshTokenTimeout(authServie: AuthService, time: number) {
    setTimeout(() => {
        authServie.refreshToken()
        console.log("Yet another refresh")
    }, (time - 100) * 1000) //Refresh in expire time - 100 seconds. In millis
}
