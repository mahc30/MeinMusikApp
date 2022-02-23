import { AuthService } from "src/app/services/auth/auth.service"

export function startRefreshTokenTimeout(authService: AuthService, time: number) {
    setTimeout(() => {
        authService.refreshToken()
    }, (time - 100) * 1000) //Refresh in expire time - 100 seconds. In millis
}
