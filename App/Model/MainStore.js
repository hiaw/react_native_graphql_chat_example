import UserDevice from './UserDevice.js'
import NavigationState from './NavigationState.js'

import { AsyncStorage } from 'react-native'
import { create } from 'mobx-persist'

const persistStore = create({
  storage: AsyncStorage
})

let store = {
  userDevice: persistStore('userDevice', new UserDevice()),
  navigationState: new NavigationState()
}

export default store
