import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deleteToken } from 'src/app/helpers/localStorage';
import { SeveralTracksResponse } from 'src/app/models/tracks/several-tracks-response';
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
  tracks : SeveralTracksResponse[] = [];
  searchTracksIds: string[] = [];

  constructor(private userService: UserService, 
    private trackService: TrackService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadUsersSavedTracks();
  }

  loadUser(): void {
    this.userService.getCurrentUserProfile().subscribe(res => {
      this.username = res.display_name
      this.userImg = res.images[0].url
    });
  }

  loadUsersSavedTracks(){
    this.trackService.getSavedTracks().subscribe(res => {
      console.log(res);
    })
  }
  
  searchTracks(): void {

    this.trackService.getSeveralTracks(this.searchTracksIds).subscribe(res => {
      this.tracks = res;
    });
  }
  
  exit(): void {
    deleteToken();
    this.router.navigate(["login"])
  }
}
