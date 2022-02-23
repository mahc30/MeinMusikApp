import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-response.i';
import { AuthService } from 'src/app/services/auth/auth.service';
import { setRefreshToken, setToken } from 'src/app/shared/helpers/localStorage';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code') || "";
    const state = this.route.snapshot.queryParamMap.get('state') || "";
    if(!code.length || !state.length) this.redirect('login')
    const authResponse: AuthResponse = {code: code, state: state}
    this.requestToken(authResponse);
  }

  redirect(route: string): void {
    this.router.navigate([route])
  }

  requestToken(authResponse: AuthResponse): void{
    this.authService.requestToken(authResponse).subscribe(tokenResponse => {

      setToken(tokenResponse.access_token);
      setRefreshToken(tokenResponse.refresh_token)

      setTimeout(()=> this.authService.refreshToken(), tokenResponse.expires_in - 100 * 1000); //Refresh in expire time - 100 seconds. In millis

      this.redirect('home')
    });
  }
}
