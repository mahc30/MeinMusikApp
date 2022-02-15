import { meResponse } from "src/app/models/user/me-response.i";

export const mockMeResponse: meResponse = {
  country: "CO",
  display_name: "Angel",
  email: 'angel@angel.com',
  explicit_content: {
    filter_enabled: false,
    filter_locked: false
  },
  external_urls: {
    spotify: ''
  },
  followers: {
    href: '',
    total: 0
  },
  href: '',
  id: '',
  images: [],
  product: '',
  type: '',
  uri: ''
}

export const mockFollowedArtistsResponse: any = {
  artists: {
    href: "string",
    items: [{
      genres: ["string"],
      href: "string",
      id: "string",
      name: "Hannah Montana",
      popularity: 15,
      type: "string",
      uri: "string",
    }],
    limit: 15,
    next: "string",
    total: 15,
  }
}