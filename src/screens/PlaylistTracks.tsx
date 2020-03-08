/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Artist } from '../_store/TracksResponse'
import useStore from '../_store/useStore'

import CircularProgress from '@material-ui/core/CircularProgress'

import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const ArtistImg = styled.img`
	width: 100px !important;
	height: 100px !important;
`

const ArtistItem : React.FC<Artist> = ({
  id, name, type
}) => {
  return (
    <>
      <ListItem dense button>
        <ListItemAvatar className='mr-1'>
          <ArtistImg alt={name} src='https://cdn.iconscout.com/icon/premium/png-256-thumb/artist-1650835-1401754.png' />
        </ListItemAvatar>
        <ListItemText
          id={id}
          primary={name}
          secondary={<div>type: {type}</div>}
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  )
}

const PlaylistTracks : React.FC<any> = observer(({ match }) => {
	const { store } = useStore()

  React.useEffect(
    () => void store?.getTracks(match.params.id),
    []
  )

	return (
		<>
			<Paper className="flex-between p-05">
				<Chip
					color="primary"
					variant="outlined"
					avatar={<Avatar>{store.playlistArtists.length}</Avatar>}
					label="Artists Count"
				/>
			</Paper>
      {store?.tracksResponse.loading
        ? <div className='flex-center mt-1'><CircularProgress /></div>
        : store?.tracksResponse.error
          ? <Chip
              color="secondary"
              icon={<i className="fas fa-exclamation-circle font-s-11"></i>}
              label="Sorry, an error occurred when trying to get the data"
            />
          : !store.playlistArtists.length
            ? <Chip
                color="secondary"
                icon={<i className="fas fa-exclamation-circle font-s-11"></i>}
                label="Sorry, there is no data"
              />
            : <List>
						    {store.playlistArtists.map(artist => <ArtistItem key={artist.id} {...artist} />)}
					    </List>
			}
		</>
	)
})

export default PlaylistTracks
