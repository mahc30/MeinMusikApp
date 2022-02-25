import { Component, Input, OnInit } from '@angular/core';
import { TracksQueryById } from 'src/app/models/tracks-query-byId.i';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';
import { deleteSavedTrackList, deleteTopTrackList } from 'src/app/shared/helpers/localStorage';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTrackDialogComponent } from '../../atoms/delete-track-dialog/delete-track-dialog.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-tracks-grid',
  templateUrl: './tracks-grid.component.html',
  styleUrls: ['./tracks-grid.component.css']
})
export class TracksGridComponent implements OnInit {

  @Input() public displayTracks: Track[] = [];
  private removeTimeout: { id: string, timeout: NodeJS.Timeout }[] = [];

  constructor(private trackService: TrackService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleTrackPlay(id: string) {
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

    this.deleteTrackTimeout(track, index);

    this.trackService.deleteTracks(deleteQuery).subscribe(res => {
      deleteTopTrackList()
      deleteSavedTrackList()

      //this.openDialog(track)
    });
  }

  saveTrack(track: Track): void {
    let saveQuery: TracksQueryById = {
      ids: track.id
    };

    this.trackService.saveTracks(saveQuery).subscribe(res => {
      this.cancelDeleteTrackTimeout(track);
      deleteTopTrackList()
      deleteSavedTrackList()
    });
  }

  openDialog(track: Track) {
    let dialogRef = this.dialog.open(DeleteTrackDialogComponent, {
      width: '250px',
      data: { name: track.name }
    });
  }

  deleteTrackTimeout(track: Track, index: number) {
    this.removeTimeout.push(
      {
        id: track.id,
        timeout: setTimeout(() => {
          this.displayTracks.splice(index, 1);

          this.removeTimeout.forEach((timeout, i) => {
            if (timeout.id === track.id) this.removeTimeout.splice(i, 1);
          })
        }, 5000)
      })
  }

  cancelDeleteTrackTimeout(track: Track) {
    this.removeTimeout.forEach((timeout, i) => {

      if (timeout.id === track.id) {

        clearTimeout(timeout.timeout)
        this.removeTimeout.splice(i, 1);
      }
    });
  }
}
