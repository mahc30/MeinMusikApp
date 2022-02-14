import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { getToken } from "../localStorage";

export function getAuthorizationHeaders(){
  return {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": 'Basic ' + btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET)
    })
  }
}

export function getHttpOptions(){
  return {
    headers: new HttpHeaders({
      "Authorization": 'Bearer ' + getToken()
    })
  }
} 