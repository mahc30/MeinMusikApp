import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/tracks/track.i';

@Component({
  selector: 'app-tracks-grid',
  templateUrl: './tracks-grid.component.html',
  styleUrls: ['./tracks-grid.component.css']
})
export class TracksGridComponent implements OnInit {

  @Input() public displayTracks: Track[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  deleteTrack(index: number) : void {
    
    console.log(index)
    console.log(this.displayTracks[index])
    console.log("Deleted: ", this.displayTracks.splice(index, 1)[0].name);
    //Track Service Delete )? TODO
  }

}
