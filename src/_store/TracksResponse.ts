import { types, Instance } from 'mobx-state-tree'

const ArtistModel = types.model("Artist", {
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

export const tracksResponseModel = types.model("tracksResponse", {
  loading: types.boolean,
  error: types.string,
  data: types.array(TrackModel)
})

export type Artist = Instance<typeof ArtistModel>
export type Track = Instance<typeof TrackModel>
export type TracksResponse = Instance<typeof tracksResponseModel>
