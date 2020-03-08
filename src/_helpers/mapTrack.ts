import { Track, Artist} from './../_store/index'

const mapArtist = (artist: any) : Artist => ({
  id: artist.id,
  name: artist.name,
  type: artist.type
})

export default (track: any) : Track | null => {
  return track.track
    ? {
      id: track.track.id,
      name: track.track.name,
      added_at: new Date(track.added_at),
      primary_color: track.primary_color ?? '',
      popularity: track.track.popularity,
      duration_ms: track.track.duration_ms,
      is_local: track.track.is_local,
      artists: track.track.artists.map(mapArtist)
    }
    : null
}
