import shortid from 'shortid';
import TodoItem from './Item';

export default class List {
    constructor(data = {}) {
        this.id = data.id || shortid.generate();
        this.title = data.title || '';
        this.items = (data.items || []).map((item) => new TodoItem(item));
    }
}
