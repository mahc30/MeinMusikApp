// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SPOTIFY_AUTH_URL: "https://accounts.spotify.com/",
  SPOTIFY_BASE_URL: "https://api.spotify.com/v1/",
  SPOTIFY_API_ENDPOINTS: {
    authorize: "authorize",
    requestToken: "api/token",
    refreshToken: "refresh_token",
    tracks: "tracks",
    user: "me",
    topItems: "me/top",
    artists: "me/following",
    genres: "recommendations/available-genre-seeds",
    recommendations: "recommendations",
    checkSavedTracks: "me/tracks/contains",
    savedTracks: "me/tracks/"
  },
  CLIENT_ID: "4d39e9f66e4f4c6caa51e493d05884d2",
  CLIENT_SECRET: "9179239329744668bac18bf2e14b3ffa",
  REDIRECT_URI: "http://localhost:4200/auth",
  SCOPES: 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state user-library-modify user-library-read user-follow-read user-top-read user-library-modify'  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
