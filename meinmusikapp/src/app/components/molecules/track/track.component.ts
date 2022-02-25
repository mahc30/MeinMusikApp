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
  @Output() playTrackEvent = new EventEmitter<string>();

  props: Object = {}

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

  emitTrackDeleteEvent(){
    this.deleteTrackEvent.emit(this.index);
  }

  emitTrackPlayEvent(){
    this.playTrackEvent.emit(this.track.id)
  }

}
