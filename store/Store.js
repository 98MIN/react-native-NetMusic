import {
    observable,
    action
} from 'mobx'

class Store {
    @observable isLogin = false
    @observable userId = null
    @observable musicTime = null
    @observable musicUrl = null
    @observable musicId = null

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
