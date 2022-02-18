import { SavedTracksResponse } from "src/app/models/tracks/saved-tracks-response.i";

export const mockDeleteTrackResponse = {}, mockSaveTrackResponse = {};

export const mockCheckSavedTracksResponse = [true, false, true, true]
export const mockSavedTracksResponse = {
    href: "aaa",
    items: [{
        item: {
            track: {
                id: "1"
            }
        }
    }],
    limit: 0,
    next: "aaaa",
    offset: 0,
    previous: "aaa",
    total: 0
}