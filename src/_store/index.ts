import { types, Instance } from 'mobx-state-tree'

import { playlistsResponseModel, Playlist } from './PlaylistsResponse'
import { tracksResponseModel, Track } from './TracksResponse'

import { request } from '../_helpers/http'
import mapPlaylist from '../_helpers/mapPlaylist'
import mapTrack from '../_helpers/mapTrack'

export const RootModel = types.model("Root", {
  playlistsResponse: playlistsResponseModel,
  tracksResponse: tracksResponseModel
})
.views(state => ({
  get playlistArtists() : any[] {
    return state.tracksResponse.data.length
      ? state.tracksResponse.data
        .reduce<any[]>((artists: any, track: Track) => [...artists, ...track.artists], [])
        .sort((a: any, b: any) => (a.name > b.name) ? 1 : -1)
      : []
  }
}))
.actions(state => ({
  setPlaylistsToPending() : any {
    (state.playlistsResponse as any) = { loading: true, error: '', data: [] }
  },
  setPlaylistsToFulfilled(status: string, response: any) : any {
    state.playlistsResponse.loading = false
    if(status === 'error')
      state.playlistsResponse.error = response
    if(status === 'success')
    (state.playlistsResponse.data as any) = (response.playlists.items as []).map(mapPlaylist)
  },
  async getPlaylists(offset: number) {
    this.setPlaylistsToPending()
    const { status, response } = await request<Playlist>(['get', `/browse/featured-playlists?limit=5&offset=${offset}`])
    this.setPlaylistsToFulfilled(status, response)
  },
  setTracksToPending() : any {
    (state.tracksResponse as any) = { loading: true, error: '', data: [] }
  },
  setTracksToFulfilled(status: string, response: any) : any {
    state.tracksResponse.loading = false
    if(status === 'error')
      state.tracksResponse.error = response
    if(status === 'success')
    (state.tracksResponse.data as any) = (response.items as []).map(mapTrack).filter(Boolean)
  },
  async getTracks(id: string) {
    this.setTracksToPending()
    const { status, response } = await request<Track>(['get', `/playlists/${id}/tracks`])
    this.setTracksToFulfilled(status, response)
  },
}))

export type Root = Instance<typeof RootModel>
