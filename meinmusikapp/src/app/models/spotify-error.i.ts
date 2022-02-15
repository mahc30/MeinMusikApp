export interface SpotifyError {
  error: Error;
}

interface Error {
  status: number;
  message: string;
}