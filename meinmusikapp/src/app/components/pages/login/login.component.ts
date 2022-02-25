import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { deleteToken } from 'src/app/shared/helpers/localStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuth()) this.router.navigate(['home'])
    else deleteToken()
  }

  requestAuthorization(){
    this.authService.requestAuthorization();
  }
}
