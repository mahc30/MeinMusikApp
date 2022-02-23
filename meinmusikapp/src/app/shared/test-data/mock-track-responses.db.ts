import { SavedTracksResponse } from "src/app/models/tracks/saved-tracks-response.i";

export const mockDeleteTrackResponse = {}, mockSaveTrackResponse = {};

export const mockCheckSavedTracksResponse = [true, false, true, true]
export const mockSavedTracksResponse = {
    href: "aaa",
    items: [{
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
    }],
    limit: 0,
    next: "aaaa",
    offset: 0,
    previous: "aaa",
    total: 0
}