import {
    observable,
    action
} from 'mobx'

class Store {
    @observable isLogin = false
    @observable userId = null

    @action setLogin() {
        this.isLogin = true
    }
    @action setUserId(data){
        this.userId = data
    }
}

export default new Store()
