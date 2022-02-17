import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deleteToken, getUserImgUrl, getUsername, setUserImgUrl, setUsername } from 'src/app/helpers/localStorage';
import { UserInfo } from 'src/app/models/user/user-info.i';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() public userInfo: any;

  constructor(private userService: UserService, private router: Router) { 
    this.userInfo = {
      display_name: getUsername() || "USERNAME",
      images: [{url: getUserImgUrl || "", width: 0, height: 0}],
    };
  }

  ngOnInit(): void {
    this.loadUser();
  }

  goToSaved(): void{
    this.router.navigate(["saved"])
  }

  goToHome(): void{
    this.router.navigate(["home"]);
  }
  
  exit(): void {
    localStorage.clear();
    this.router.navigate(["login"])
  }
  
  loadUser(): void {
    this.userService.getCurrentUserProfile().subscribe(res => {
      setUsername(res.display_name)
      setUserImgUrl(res.images[0].url)
      this.userInfo = {
        display_name: getUsername() || "USERNAME",
        images: [{url: getUserImgUrl || "", width: 0, height: 0}],
      };
    });
  }
}
