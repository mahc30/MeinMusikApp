import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-button',
  templateUrl: './saved-button.component.html',
  styleUrls: ['./saved-button.component.css']
})
export class SavedButtonComponent implements OnInit {

  @Input() isSaved;

  constructor() { 
    this.isSaved = false;
  }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isSaved = !this.isSaved;
  }

}
