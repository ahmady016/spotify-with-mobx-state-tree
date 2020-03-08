import { Playlist } from './../_store/index'

export default (playlist: any) : Playlist => ({
  id: playlist.id,
  name: playlist.name,
  description: playlist.description,
  owner: playlist.owner.display_name,
  tracksCount: playlist.tracks.total,
  imageUrl: playlist.images[0].url,
  collaborative: playlist.collaborative
})
