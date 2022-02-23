import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { getHttpOptions } from 'src/app/shared/helpers/requests/httpHeaders';
import { RequestTypes } from 'src/app/models/enums/enums';
import { FollowedArtistsResponse } from 'src/app/models/user/followed-artists-response.i';
import { UserInfo } from 'src/app/models/user/user-info.i';
import { TopItemsResponse } from 'src/app/models/user/top-items-response.i';
import { environment } from 'src/environments/environment';
import { queryBuilder } from 'src/app/shared/helpers/queryBuilder';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.SPOTIFY_BASE_URL;
  
  constructor(private http: HttpClient) { }

  getCurrentUserProfile() : Observable<UserInfo>{
    let url = this.baseUrl + environment.SPOTIFY_API_ENDPOINTS.user
    return this.http.get<UserInfo>(url, getHttpOptions());
  }

  getFollowedArtists() : Observable<FollowedArtistsResponse>{
    let url = this.baseUrl + environment.SPOTIFY_API_ENDPOINTS.artists
    url = queryBuilder(url, {type: "artist"})
    return this.http.get<FollowedArtistsResponse>(url, getHttpOptions())
  }

  getTopItems(type: RequestTypes): Observable<TopItemsResponse>{
    let url = this.baseUrl + environment.SPOTIFY_API_ENDPOINTS.topItems + '/' + type;
    return this.http.get<TopItemsResponse>(url, getHttpOptions())
  }
}
