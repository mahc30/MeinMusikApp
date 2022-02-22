import { Track } from "../models/tracks/track.i";

export function getToken(): string | null {
    return localStorage.getItem("authToken");
}

export function setToken(token: string) {
    localStorage.setItem("authToken", token);
}

export function deleteToken() {
    localStorage.removeItem("authToken")
}

export function setRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token);
}

export function getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken")
}

export function setUsername(username: string) {
    localStorage.setItem("username", username);
}

export function getUsername() {
    return localStorage.getItem("username");
}

export function setUserImgUrl(url: string) {
    localStorage.setItem("userImgUrl", url);
}

export function getUserImgUrl() {
    return localStorage.getItem("userImgUrl");
}

export function setSavedTrackList(tracks: Track[]) {
    let obj = JSON.stringify(tracks);
    localStorage.setItem("savedTracks", obj);
}

export function getSavedTrackList(): Track[] | null {
    let obj = localStorage.getItem("savedTracks");
    if(obj === null) return null;
    else  return JSON.parse(obj) as Track[];
}

export function deleteSavedTrackList(): void{
    localStorage.removeItem("savedTracks");
}

export function setTopTrackList(tracks: Track[]) {
    let obj = JSON.stringify(tracks);
    localStorage.setItem("topTracks", obj);
}

export function getTopTrackList(): Track[] | null {
    let obj = localStorage.getItem("topTracks");
    if(obj === null) return null;
    else  return JSON.parse(obj) as Track[];
}

export function deleteTopTrackList(): void{
    localStorage.removeItem("topTracks");
}