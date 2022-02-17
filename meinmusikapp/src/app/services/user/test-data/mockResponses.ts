import { UserInfo } from "src/app/models/user/user-info.i";
import { TopItemsResponse } from "src/app/models/user/top-items-response.i";

export const mockMeResponse: UserInfo = {
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
  images: [{
    url: "url.com",
    height: 12,
    width: 12
  }],
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

export const mockTopItemsResponse: TopItemsResponse = {
  href: "",
  items: [{
    id: "string",
    name: "Piel Canela",
  }],
  limit: 0,
  next: "",
  offset: 0,
  previous: "",
  total: 0
}