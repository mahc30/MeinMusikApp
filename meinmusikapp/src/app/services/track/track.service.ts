import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getHttpOptions } from 'src/app/helpers/requests/httpHeaders';
import { SavedTracksResponse } from 'src/app/models/tracks/saved-tracks-response.i';
import { SeveralTracksResponse } from 'src/app/models/tracks/several-tracks-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private reqTracksUrl = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.tracks
  private reqUserTracksUrl = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.user + '/' + environment.SPOTIFY_API_ENDPOINTS.tracks

  constructor(private http: HttpClient) { }

  getSeveralTracks(ids: string[]) : Observable<SeveralTracksResponse[]>{

    let query = ids.join(",")
    this.reqTracksUrl += "/" + query
    return this.http.get<SeveralTracksResponse[]>(this.reqTracksUrl, getHttpOptions());
  }

  getSavedTracks(): Observable<SavedTracksResponse>{
    return this.http.get<SavedTracksResponse>(this.reqUserTracksUrl, getHttpOptions());
  }
}
