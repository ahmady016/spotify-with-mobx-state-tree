/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Playlist } from '../_store/PlaylistsResponse'
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

const PlaylistImg = styled.img`
  width: 100px !important;
  height: 100px !important;
`

const PlaylistItem : React.FC<any> = ({
 id, name, description, owner, tracksCount, imageUrl, history
}) => {
  return (
    <>
      <ListItem dense button onClick={e => history.push(`/playlists/${id}`)}>
        <ListItemAvatar className='mr-1'>
          <PlaylistImg alt={name} src={imageUrl} />
        </ListItemAvatar>
        <ListItemText
          id={id}
          primary={name}
          secondary={
            <>
              <div>description: {description}</div>
              <div>owner:  {owner}</div>
              <div>tracksCount:  {tracksCount}</div>
            </>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  )
}

const Playlists: React.FC<any> = observer(({ history }) => {

  const { store } = useStore()
  const [offset, setOffset] = React.useState(0)
  const [playlists, setPlaylists] = React.useState<Playlist[]>([])

  React.useEffect(() => {
    const handleScroll = (e: any) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
        setOffset((offset: number) => offset + 5)
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  React.useEffect(
    () => void store?.getPlaylists(offset),
    [offset]
  )

  React.useEffect(
    () => {
      if(store?.playlistsResponse.data.length)
        setPlaylists(playlists => [...playlists, ...store?.playlistsResponse.data])
    },
    [store?.playlistsResponse.data.length]
  )

  React.useEffect(
    () => void console.log("Playlists -> playlists", playlists.length),
    [playlists]
  )

  return (
    <>
      <Paper className='flex-between p-05'>
        <Chip
          color='primary'
          variant="outlined"
          avatar={<Avatar>{playlists.length}</Avatar>}
          label='Playlists Count'
        />
      </Paper>
      {store?.playlistsResponse.loading
        ? <div className='flex-center mt-1'><CircularProgress /></div>
        : store?.playlistsResponse.error
          ? <Chip
              color='secondary'
              icon={<i className='fas fa-exclamation-circle font-s-11'></i>}
              label='Sorry, an error occurred when trying to get the data'
            />
          : !playlists.length
            ? <Chip
                color='secondary'
                icon={<i className='fas fa-exclamation-circle font-s-11'></i>}
                label='Sorry, there is no data'
              />
            : <List>
                {playlists.map(playlist => <PlaylistItem key={playlist.id} {...playlist} history={history} />)}
              </List>
      }
    </>
  )
})

export default Playlists
