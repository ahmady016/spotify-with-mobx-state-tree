import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import Playlists from './screens/Playlists'
import PlaylistTracks from './screens/PlaylistTracks'

function App() {
  return (
    <>
      <header>Spotify Viewer App</header>
      <Switch>
        <Route path="/playlists/:id" component={PlaylistTracks} />
        <Route path="/playlists" component={Playlists} />
        <Redirect to="/playlists" />
      </Switch>
    </>
  );
}

export default withRouter(App)
