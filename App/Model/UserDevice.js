import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

export default class UserDeviceData {
  @persist @observable scaphold_username = ''
  @persist @observable scaphold_user_id = ''
  @persist @observable scaphold_access_token = ''
}
