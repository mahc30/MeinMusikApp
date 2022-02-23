import { RecommendationsResponse } from "src/app/models/tracks/recommendations-response.i";
import { Track } from "src/app/models/tracks/track.i";

export const mockRecommendations: any = {
    seeds: [],
    tracks: [{
        id: "123",
        name: "Track1",
        album: {
            name: "Album1",
            images: [{ url: "url1" }]
        },
        isSaved: false
    },
    {
        id: "123",
        name: "Track2",
        album: {
            name: "Album2",
            images: [{ url: "url2" }]
        },
        isSaved: true
    }]
}

export const mockDisplayTracks = [{
    id: "string",
    name: "Piel Canela",
},
{
    id: "string",
    name: "Pain",
}
]