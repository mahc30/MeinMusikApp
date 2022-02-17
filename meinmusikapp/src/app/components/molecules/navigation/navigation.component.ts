import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deleteToken } from 'src/app/helpers/localStorage';
import { UserInfo } from 'src/app/models/user/user-info.i';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() public userInfo: UserInfo | any;

  constructor(private router: Router) { 
    this.userInfo = {
      display_name: "USERNAME",
      images: [{url: "", width: 0, height: 0}],
    };
  }

  ngOnInit(): void {
  }

  goToSaved(): void{
    this.router.navigate(["saved"])
  }
  
  exit(): void {
    deleteToken();
    this.router.navigate(["login"])
  }
}
