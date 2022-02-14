import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { setToken } from 'src/app/helpers/localStorage';
import { AuthResponse } from 'src/app/models/auth/auth-response.i';
import { AuthService } from 'src/app/services/auth/auth.service';


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
    if(code.length === 0 || state.length === 0) alert("Error in params")
    const authResponse: AuthResponse = {code: code, state: state}

    this.authService.requestToken(authResponse).subscribe(tokenResponse => {
      setToken(tokenResponse.access_token);
      this.router.navigate(['home'])
    });
  }

}
