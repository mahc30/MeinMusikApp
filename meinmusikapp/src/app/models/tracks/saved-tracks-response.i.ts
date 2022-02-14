export interface SavedTracksResponse {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

interface Item {
}