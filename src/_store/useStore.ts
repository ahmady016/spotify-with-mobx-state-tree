import React from 'react'

import { MSTContext } from './instance'

export default function useStore() {
	const store = React.useContext(MSTContext)
	if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
	return { store }
}
