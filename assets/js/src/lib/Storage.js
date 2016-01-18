class Storage {

    constructor() {
        this.storage = window.localStorage || false;
    }

    /**
     * get
     * localStorageからデータを取得する
     *
     * @access  public
     * @param   String  key
     * @return  Object
     */
    get(key) {
        if (!this.storage) {
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        var item = this.storage.getItem(key);
        return item ? JSON.parse(item) : false;
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
    set(key, data) {

        if (!this.storage) {
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        this.storage.setItem(key, JSON.stringify(data));
        return true;
    }

    /**
     * remove
     * localStorageからデータを削除する
     *
     * @access  public
     * @param   String  key
     * @return  boolean
     */
    remove(key) {

        if (!this.storage) {
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        this.storage.removeItem(key);
        return true;
    }

    /**
     * clear
     * localStorageから全てのデータを削除する
     *
     * @access  public
     * @return  boolean
     */
    clear() {
        if (!this.storage) {
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        this.storage.clear();
        return true;
    }

    /**
     * size
     * LocalStorageの情報がどれくらいあるかを見る
     *
     * @access  public
     * @return  Number
     */
    size() {

        if (!this.storage) {
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        return this.storage.length;
    }

    /**
     * keys
     * localStorageのKey一覧を取得する
     *
     * @access  public
     * @return  Array
     */
    keys() {

        if (!this.storage) {
            console.warn('this browser is not supported the LocalStorage.');
            return false;
        }

        var size = this.size();
        var resultArray = [];
        for (var i = 0; i < size; i++ ) {
            resultArray.push(storage.key(i));
        }

        return resultArray;
    }
};


module.exports = new Storage();
