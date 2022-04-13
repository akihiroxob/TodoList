import List from '../models/List';
const STORAGE_KEY = 'TODO_LIST_DATA_KEY';
class Storage {
    constructor() {
        this.storage = window.localStorage || false;
    }

    /**
     * get
     * localStorageからデータを取得する
     *
     * @access  public
     * @return  Object
     */
    getInitial() {
        if (!this.storage) {
            throw new Error('this browser is not supported the LocalStorage.');
        }

        const item = this.storage.getItem(STORAGE_KEY);
        if (!item) return [new List()];
        if (item === '[]') return [new List()];
        return JSON.parse(item);
    }

    /**
     * set
     * localStorageにデータをセットする
     *
     * @access  public
     * @param   String  key
     * @param   Object  data
     * @return  boolean
     */
    set(data) {
        if (!this.storage) {
            throw new Error('this browser is not supported the LocalStorage.');
        }

        this.storage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    }
}

export default new Storage();
