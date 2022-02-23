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
import { MatButtonModule} from '@angular/material/button';
import { GlobalHttpInterceptorService } from './shared/interceptor/global-http-interceptor.service';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
