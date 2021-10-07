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
    get() {
        if (!this.storage) {
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        var item = this.storage.getItem(STORAGE_KEY);
        return item ? JSON.parse(item) : [];
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
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        this.storage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    }
}

module.exports = new Storage();
