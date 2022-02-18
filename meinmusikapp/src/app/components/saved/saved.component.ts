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

  savedTracks: Track[] = [];

  constructor( private trackService: TrackService) { }

  ngOnInit(): void {
    this.loadUsersSavedTracks();
  }

  loadUsersSavedTracks(){
    this.trackService.getSavedTracks().subscribe(res => {
      res.items.forEach(item => {
        this.savedTracks.push(item.track as Track);
        item.track.isSaved = true;
      });
    });
  }


}
