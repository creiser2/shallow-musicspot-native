export default class Song {
    constructor(id, name, artistId, uri, duration_ms, explicit, imageURL) {
        this.id = id;
        this.name = name;
        this.artistId = artistId;
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
}