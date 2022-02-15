import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { deleteToken } from 'src/app/helpers/localStorage';
import { queryBuilder } from 'src/app/helpers/queryBuilder';
import { SeveralTracksResponse } from 'src/app/models/tracks/several-tracks-response';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = "username";
  userImg = "";
  displayTracks: Track[] = [];
  //tracks : SeveralTracksResponse[] = [];
  searchTracksIds: string[] = [];

  constructor(private userService: UserService, 
    private trackService: TrackService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadUsersRecommendedTracks();
  }

  loadUser(): void {
    this.userService.getCurrentUserProfile().subscribe(res => {
      this.username = res.display_name
      this.userImg = res.images[0].url
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

  /*
  searchTracks(): void {

    this.trackService.getSeveralTracks(this.searchTracksIds).subscribe(res => {
      this.tracks = res;
    });
  }
  */

  goToSaved(): void{
    this.router.navigate(["saved"])
  }
  
  exit(): void {
    deleteToken();
    this.router.navigate(["login"])
  }
}
