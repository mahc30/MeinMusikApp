import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/pages/auth/auth.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TrackComponent } from './components/molecules/track/track.component';
import { TracksGridComponent } from './components/organisms/tracks-grid/tracks-grid.component';
import { NavigationComponent } from './components/organisms/navigation/navigation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SavedButtonComponent } from './components/atoms/saved-button/saved-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GlobalHttpInterceptorService } from './services/interceptor/global-http-interceptor.service';
import { DomseguroPipe } from './pipes/domSeguroPipe';
import { MusicEmbedComponent } from './components/atoms/music-embed/music-embed.component';
import { DeleteTrackDialogComponent } from './components/atoms/delete-track-dialog/delete-track-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    TrackComponent,
    TracksGridComponent,
    NavigationComponent,
    SavedButtonComponent,
    DomseguroPipe,
    MusicEmbedComponent,
    DeleteTrackDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
