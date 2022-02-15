import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  displayTracks: Track[] = [];

  constructor(private userService: UserService, 
    private trackService: TrackService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUsersSavedTracks();
  }

  loadUsersSavedTracks(){
    this.trackService.getSavedTracks().subscribe(res => {

      res.items.forEach((item, i) => {
        i % 2 === 0 ? item.track.isSaved = true: item.track.isSaved = false;
        this.displayTracks.push(item.track as Track);
      });
    });
  }
}
