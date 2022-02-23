import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { deleteToken } from 'src/app/shared/helpers/localStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    deleteToken()
  }

  requestAuthorization(){
    this.authService.requestAuthorization();
  }
}
