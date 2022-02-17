import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/tracks/track.i';

@Component({
  selector: 'app-tracks-grid',
  templateUrl: './tracks-grid.component.html',
  styleUrls: ['./tracks-grid.component.css']
})
export class TracksGridComponent implements OnInit {

  @Input() displayTracks: Track[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
