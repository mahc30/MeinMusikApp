export function getToken() : string | null {
    return localStorage.getItem("authToken");
}

export function setToken(token: string) {
    localStorage.setItem("authToken", token);
}

export function deleteToken(){
    localStorage.removeItem("authToken")
}

export function setRefreshToken(token: string){
    localStorage.setItem("refreshToken", token);
}

export function getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken")
}

export function setUsername(username: string){
    localStorage.setItem("username", username);
}

export function getUsername(){
    return localStorage.getItem("username");
}

export function setUserImgUrl(url: string){
    localStorage.setItem("userImgUrl", url);
}

export function getUserImgUrl(){
    return localStorage.getItem("userImgUrl");
}