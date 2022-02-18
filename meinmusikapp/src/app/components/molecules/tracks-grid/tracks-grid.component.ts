import { Component, Input, OnInit } from '@angular/core';
import { TracksQueryById } from 'src/app/models/tracks-query-byId.i';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';

@Component({
  selector: 'app-tracks-grid',
  templateUrl: './tracks-grid.component.html',
  styleUrls: ['./tracks-grid.component.css']
})
export class TracksGridComponent implements OnInit {

  @Input() public displayTracks: Track[] = [];

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
  }

  handleTrackEvent(index: number): void {


    let track = this.displayTracks[index]
    track.isSaved ? this.deleteTrack(track) : this.saveTrack(track);
    track.isSaved = !track.isSaved;

    //console.log(index)
    //console.log(this.displayTracks[index])
    //);
    //Track Service Delete )? TODO
  }

  deleteTrack(track: Track): void {
    let deleteQuery: TracksQueryById = {
      ids: track.id
    };

    this.trackService.deleteTracks(deleteQuery).subscribe(res => {
      console.log("Track DELETED: ", track)
    });
  }

  saveTrack(track: Track): void {
    let saveQuery: TracksQueryById = {
      ids: track.id
    };

    this.trackService.saveTracks(saveQuery).subscribe(res => {
      console.log("Track saved: ", track)
    });
  }
}
