export interface FollowedArtistsResponse {
    artists: Artists;
}

interface Artists {
    href: string;
    items: Artist[];
    limit: number;
    next: string;
    cursors: Cursors;
    total: number;
}

interface Cursors {
    after: string;
}

interface Artist {
    external_urls: Externalurls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface Followers {
    href?: any;
    total: number;
}

interface Externalurls {
    spotify: string;
}