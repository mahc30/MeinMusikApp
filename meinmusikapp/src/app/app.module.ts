import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TrackComponent } from './components/molecules/track/track.component';
import { SavedComponent } from './components/saved/saved.component';
import { TracksGridComponent } from './components/molecules/tracks-grid/tracks-grid.component';
import { NavigationComponent } from './components/molecules/navigation/navigation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SavedButtonComponent } from './components/atoms/saved-button/saved-button.component';
import {MatIconModule} from '@angular/material/icon';
import { GlobalHttpInterceptorService } from './services/interceptor/global-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    TrackComponent,
    SavedComponent,
    TracksGridComponent,
    NavigationComponent,
    SavedButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
