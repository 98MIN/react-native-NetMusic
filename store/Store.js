import {
    observable,
    action
} from 'mobx'

class Store {
    @observable isLogin = false
    @observable userId = null
    @observable musicTime = null
    @observable musicId = null
    @observable picUrl = ''

    @action setLogin() {
        this.isLogin = true
    }
    @action setUserId(data){
        this.userId = data
    }
    @action setMusic(key,data){
      this[key] = data
    }
}

export default new Store()
