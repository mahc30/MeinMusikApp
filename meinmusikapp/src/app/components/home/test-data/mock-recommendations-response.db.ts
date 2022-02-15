import { RecommendationsResponse } from "src/app/models/tracks/recommendations-response.i";

export const mockRecommendations: any = {
    seeds: [],
    tracks: [{
        id: "123",
        name: "Track1",
        album: {
            name: "Album1",
            images: [{url: "url1"}]
        },

    }]
}