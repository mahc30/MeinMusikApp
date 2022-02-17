import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/tracks/track.i';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit {

  @Input() track: Track | any;

  constructor() { 
    this.track = {
      id: -1,
      name: "loading name",
      album : {name: "loading album name", images: [{url: "loadint album image"}]},
      isSaved: false
    };
  }

  ngOnInit(): void {
  }

}
