import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/tracks/several-tracks-response';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  //@Input() track: Track;

  constructor() { }

  ngOnInit(): void {
  }

}
