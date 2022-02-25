import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track/track.service';

@Component({
  selector: 'app-music-embed',
  templateUrl: './music-embed.component.html'
})
export class MusicEmbedComponent implements OnInit {

  
  public id: string = ""
  
  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.trackService.playTrackEvent.subscribe(event => {
      this.id = event
    })
  }

}
