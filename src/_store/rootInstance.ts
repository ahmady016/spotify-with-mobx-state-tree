import { RootModel } from './index'

export const initialRootState = RootModel.create({
  playlists: [{
    id: '37i9dQZF1DXaXB8fQg7xif',
    name: 'Dance Party',
    description: 'Disclosure take over <a href="spotify:genre:edm_dance">Dance</a> Party with new music!',
    owner: 'Spotify',
    tracksCount: 37,
    imageUrl: 'https://i.scdn.co/image/ab67706f0000000243295547c709f63d30589ecd',
    collaborative: false
  }],
  tracks: [{
    id: '7lTTElkM1yHrLk9RFOlQcp',
    name: 'Ecstasy',
    added_at: new Date('2020-02-28T16:08:56Z'),
    primary_color: '#b6c8d0',
    popularity: 45,
    duration_ms: 303706,
    is_local: false,
    artists: [{
      id: '6nS5roXSAGhTGr34W6n7Et',
      name: 'Disclosure',
      type: 'artist'
    }]
  }]
})
