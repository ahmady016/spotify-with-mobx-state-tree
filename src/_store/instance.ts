import React from 'react'
import { onSnapshot, Instance } from 'mobx-state-tree'

import { RootModel } from './index'
import { INITIAL_RESPONSE } from '../_helpers/http'

const initialState = {
  playlistsResponse: { ...INITIAL_RESPONSE },
  tracksResponse: { ...INITIAL_RESPONSE }
}

export const initialRootInstance = RootModel.create(initialState)
onSnapshot(initialRootInstance, snapshot => console.log("Snapshot: ", snapshot))

export const MSTContext = React.createContext<null | Instance<typeof RootModel>>(null)
export const MSTProvider = MSTContext.Provider
