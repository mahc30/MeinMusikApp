import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getToken } from 'src/app/helpers/localStorage';
import { getHttpOptions } from 'src/app/helpers/requests/httpHeaders';
import { meResponse } from 'src/app/models/me-response.i';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.user
  
  constructor(private http: HttpClient) { }

  getCurrentUserProfile() : Observable<meResponse>{
    return this.http.get<meResponse>(this.baseURL, getHttpOptions());
  }
}
