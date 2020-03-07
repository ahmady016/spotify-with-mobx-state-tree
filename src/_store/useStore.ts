import React from 'react'
import { onSnapshot } from 'mobx-state-tree'

import { initialRootInstance } from './rootInstance'

export default function useStore() {
	const [snapshot, setSnapshot] = React.useState<any>(initialRootInstance)
	onSnapshot(initialRootInstance, newSnapshot => void setSnapshot(newSnapshot))
	return { snapshot }
}
