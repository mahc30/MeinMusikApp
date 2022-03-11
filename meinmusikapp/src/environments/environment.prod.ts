export const environment = {
  production: true,
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
  REDIRECT_URI: "http://localhost:80/auth",
  SCOPES: 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state user-library-modify user-library-read user-follow-read user-top-read user-library-modify'
};
