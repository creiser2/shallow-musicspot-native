export default class Song {
    constructor(id, name, artistId, artistName, uri, duration_ms, explicit, imageURL) {
        this.id = id;
        this.name = name;
        this.artistId = artistId;
        this.artistName = artistName;
        this.uri = uri;
        this.duration_ms = duration_ms;
        this.explicit = explicit;
        this.imageURL = imageURL;
        this.numVotes = 0;
    }

    // Adding a method to the constructor
    upVote() {
        return ++this.numVotes;
    }
    downVote() {
        return --this.numVotes;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            artistId: this.artistId,
            artistName: this.artistName,
            uri: this.uri,
            duration_ms: this.duration_ms,
            explicit: (this.explicit == null ? "" : this.explicit),
            imageURL: (this.imageURL == null ? "" : this.imageURL),
            numVotes: this.numVotes
        }
    }
}