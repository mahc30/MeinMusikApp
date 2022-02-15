import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getToken } from 'src/app/helpers/localStorage';
import { queryBuilder } from 'src/app/helpers/queryBuilder';
import { getHttpOptions } from 'src/app/helpers/requests/httpHeaders';
import { FollowedArtistsResponse } from 'src/app/models/user/followed-artists-response.i';
import { meResponse } from 'src/app/models/user/me-response.i';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.SPOTIFY_BASE_URL;
  
  constructor(private http: HttpClient) { }

  getCurrentUserProfile() : Observable<meResponse>{
    let baseURL = this.baseURL + environment.SPOTIFY_API_ENDPOINTS.user
    return this.http.get<meResponse>(baseURL, getHttpOptions());
  }

  getFollowedArtists() : Observable<FollowedArtistsResponse>{
    let baseURL = this.baseURL + environment.SPOTIFY_API_ENDPOINTS.artists
    baseURL = queryBuilder(baseURL, {type: "artist"})
    return this.http.get<FollowedArtistsResponse>(baseURL, getHttpOptions())
  }
}
