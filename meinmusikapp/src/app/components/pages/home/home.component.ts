import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestTypes } from 'src/app/models/enums/enums';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';
import { UserService } from 'src/app/services/user/user.service';
import { getSavedTrackList, getTopTrackList, setSavedTrackList, setTopTrackList } from 'src/app/shared/helpers/localStorage';

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
    let route = this.router.url.split('?')[0];
    if(route === "/saved") this.loadUserSavedTracks()
    else this.loadUserTopTracks();
  }

  loadUserTopTracks(): void {

    let cached = getTopTrackList();
    if (cached != null) {
      this.displayTracks = cached;
      return;
    }

    this.userService.getTopItems(RequestTypes.Tracks).subscribe(res => {
      this.displayTracks = res.items;
      this.displayTracks.forEach(track => {
        track.isSaved = false;
      });
      this.updateDisplayTracksIsSaved()

    });
  }

  updateDisplayTracksIsSaved(): void {

    this.trackService.checkUserSavedTracks(this.displayTracks).subscribe(res => {
      res.forEach((isSaved, i) => {
        this.displayTracks[i].isSaved = isSaved;
      })

      if(getTopTrackList() === null){
        setTopTrackList(this.displayTracks);
      }
    })
  }

  loadUserSavedTracks() {
    let cached = getSavedTrackList();
    if (cached != null) {
      this.displayTracks = cached;
      return;
    }

    this.trackService.getSavedTracks().subscribe(res => {
      res.items.forEach((item,i) => {

        this.displayTracks.push(item.track as Track);
        this.displayTracks[i].isSaved = true;
      });

      //Cache
      if(getSavedTrackList() === null){
        setSavedTrackList(this.displayTracks);
      }
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
