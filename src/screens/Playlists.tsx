import React from 'react'
import { observer } from 'mobx-react-lite'

import { Root } from '../_store'
import useStore from '../_store/useStore'

const newPlaylist = {
  id: '37i9dQZF1DXcxvFzl58uP7',
  name: 'Bedroom Pop',
  description: 'Dreamy jams from the best bedroom producers. Cover: SALES',
  owner: 'Spotify',
  tracksCount: 100,
  imageUrl: 'https://i.scdn.co/image/ab67706f0000000243295547c709f63d30589ecd',
  collaborative: false
}

const Playlists = observer(() => {
  const { snapshot } = useStore()
  return (
    <>
      <h3>Playlists</h3>
      <button onClick={e => (snapshot as Root).addPlaylist(newPlaylist)}>
        Add Playlist
      </button>
      <ul>
        {(snapshot as Root)?.playlists?.map(
          playlist => (
            <li key={playlist.id}>
              <p>{playlist.id}</p>
              <p>{playlist.name}</p>
              <p>{playlist.description}</p>
            </li>
          )
        )}
      </ul>
    </>
  )
})

export default Playlists
