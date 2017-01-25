import UserDevice from './UserDevice.js'

import { AsyncStorage } from 'react-native'
import { create } from 'mobx-persist'

const persistStore = create({
  storage: AsyncStorage
})

let store = {
  userDevice: persistStore('userDevice', new UserDevice())
}

export default store
