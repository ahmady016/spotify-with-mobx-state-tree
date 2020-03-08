import { types, Instance } from 'mobx-state-tree'

const PlaylistModel = types.model("Playlist", {
  id: types.identifier,
  name: types.string,
  description: types.string,
  owner: types.string,
  tracksCount: types.number,
  imageUrl: types.string,
  collaborative: types.boolean
})

export const playlistsResponseModel = types.model("playlistsResponse", {
  loading: types.boolean,
  error: types.string,
  data: types.array(PlaylistModel)
})

export type Playlist = Instance<typeof PlaylistModel>
export type PlaylistsResponse = Instance<typeof playlistsResponseModel>
