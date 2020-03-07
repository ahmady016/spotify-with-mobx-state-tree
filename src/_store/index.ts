import { types, Instance } from 'mobx-state-tree'

const ArtistModel = types.model("artist", {
  id: types.identifier,
  name: types.string,
  type: types.string
})

const TrackModel = types.model("Track", {
  id: types.identifier,
  name: types.string,
  added_at: types.Date,
  primary_color: types.string,
  popularity: types.number,
  duration_ms: types.number,
  is_local: types.boolean,
  artists: types.array(ArtistModel)
})

const PlaylistModel = types.model("Playlist", {
  id: types.identifier,
  name: types.string,
  description: types.string,
  owner: types.string,
  tracksCount: types.number,
  imageUrl: types.string,
  collaborative: types.boolean
})

const RootModel = types.model("Root", {
  playlists: types.array(PlaylistModel),
  tracks: types.array(TrackModel)
})

export { RootModel }

export type Artist = Instance<typeof ArtistModel>
export type Track = Instance<typeof TrackModel>
export type Playlist = Instance<typeof PlaylistModel>
export type Root = Instance<typeof RootModel>
