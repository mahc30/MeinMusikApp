import { Component, Input, OnInit } from '@angular/core';
import { TracksQueryById } from 'src/app/models/tracks-query-byId.i';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';
import { deleteSavedTrackList, deleteTopTrackList } from 'src/app/shared/helpers/localStorage';

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

  handleTrackPlay(id: string){
    this.trackService.emitPlayTrackEvent(id);
  }

  handleTrackDelete(index: number): void {
    let track = this.displayTracks[index]
    track.isSaved ? this.deleteTrack(track, index) : this.saveTrack(track);
    track.isSaved = !track.isSaved;
  }

  deleteTrack(track: Track, index: number): void {
    let deleteQuery: TracksQueryById = {
      ids: track.id
    };

    this.trackService.deleteTracks(deleteQuery).subscribe(res => {
      deleteTopTrackList()
      deleteSavedTrackList()
      setTimeout(() => {
        this.displayTracks.splice(index, 1);
      }, 4000)
    });
  }

  saveTrack(track: Track): void {
    let saveQuery: TracksQueryById = {
      ids: track.id
    };

    this.trackService.saveTracks(saveQuery).subscribe(res => {
      deleteTopTrackList()
      deleteSavedTrackList()
    });
  }
}
