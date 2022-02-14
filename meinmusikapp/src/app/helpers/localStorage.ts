export function getToken() : string | null {
    return localStorage.getItem("authToken");
}

export function setToken(token: string) {
    localStorage.setItem("authToken", token);
}

export function deleteToken(){
    localStorage.removeItem("authToken")
}