import {
    observable,
    computed
} from 'mobx'

class Store {
    @observable price = 0;
    @observable amount = 1;

    @computed getTotal() {
        return this.price * this.amount;
    }
}

export default Store
