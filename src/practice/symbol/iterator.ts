class Song {
  name: string
  artist: string
  duration: string
  constructor(name: string, artist: string, duration: string) {
    this.name = name
    this.artist = artist
    this.duration = duration
  }
}

class Playlist {
  songs: Song[]
  constructor() {
    this.songs = []
  }

  addSong(song: Song) {
    this.songs.push(song)
  }

  [Symbol.iterator]() {
    let i = 0
    const songs = this.songs
    return {
      next: () => ({
        value: songs[i++],
        done: i > songs.length
      })
    }
  }
}

const playlist = new Playlist()
playlist.addSong(new Song('Song 1', 'Artist 1', '3:45'))
playlist.addSong(new Song('Song 2', 'Artist 2', '4:20'))
playlist.addSong(new Song('Song 3', 'Artist 3', '5:10'))

for (const song of playlist) {
  console.log(song.name)
}
