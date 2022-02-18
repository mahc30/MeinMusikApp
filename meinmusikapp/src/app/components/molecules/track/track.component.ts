import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Track } from 'src/app/models/tracks/track.i';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit {

  @Input() track: Track | any;
  @Input() index: number;

  @Output() deleteTrackEvent = new EventEmitter<number>();

  constructor() { 
    this.track = {
      id: -1,
      name: "loading name",
      album : {name: "loading album name", images: [{url: "loading album image"}]},
      isSaved: false
    };

    this.index = -1;
  }

  ngOnInit(): void {
  }

  deleteTrack(){
    this.deleteTrackEvent.emit(this.index);
  }

}
