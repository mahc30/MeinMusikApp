import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { setUserImgUrl, setUsername } from 'src/app/helpers/localStorage';
import { queryBuilder } from 'src/app/helpers/queryBuilder';
import { RequestTypes } from 'src/app/models/enums/enums';
import { Track } from 'src/app/models/tracks/track.i';
import { UserInfo } from 'src/app/models/user/user-info.i';
import { TrackService } from 'src/app/services/track/track.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayTracks: Track[] = [];

  constructor(private userService: UserService, 
    private trackService: TrackService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUserTopTracks();
  }

  loadUserTopTracks(): void {
    this.userService.getTopItems(RequestTypes.Tracks).subscribe(res => {
      this.displayTracks = res.items;

      this.trackService.checkUserSavedTracks(this.displayTracks).subscribe(res => {
        res.forEach((isSaved, i) => {
          this.displayTracks[i].isSaved = isSaved;
        })
      })
    });
  }
  /*
  searchTracks(): void {

    this.trackService.getSeveralTracks(this.searchTracksIds).subscribe(res => {
      this.tracks = res;
    });
  }

  loadUsersRecommendedTracks(){
    
    let genres = this.trackService.getGenres()
    let artists = this.userService.getFollowedArtists();
    let tracks = this.trackService.getSavedTracks();

    forkJoin([genres, artists, tracks]).subscribe(results => {
     
      let artistIds : string[] = []
      results[1].artists.items.slice(0,2).forEach(artist => { //Get first 2 artist ids
        artistIds.push(artist.id)
      })

      let tracksIds : string[] = [];
      results[2].items.slice(0,2).forEach(item => {
        tracksIds.push(item.track.id)
      })

      let seedGenres = results[0].genres.slice(0,1).join(",");
      let seedArtists = artistIds.join(",");
      let seedTracks = tracksIds.join(",");

      let query = queryBuilder("", {seed_artists: seedArtists, seed_genres: seedGenres, seed_tracks: seedTracks});
      
      this.trackService.getRecommendations(query).subscribe(res => {
        res.tracks.forEach(track => {
          this.displayTracks.push(track as unknown as Track); 
        })
      })

    }, err => {
      console.log(err)
    });
    
  }
  */

  
}
