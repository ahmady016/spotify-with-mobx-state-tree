import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import AppHeader from './components/AppHeader'
import Playlists from './screens/Playlists'
import PlaylistTracks from './screens/PlaylistTracks'


function App() {
	return (
		<>
			<AppHeader />
			<Container maxWidth="md">
				<Switch>
					<Route path="/playlists/:id" component={PlaylistTracks} />
					<Route path="/playlists" component={Playlists} />
					<Redirect to="/playlists" />
				</Switch>
			</Container>
		</>
	)
}

export default withRouter(App)
