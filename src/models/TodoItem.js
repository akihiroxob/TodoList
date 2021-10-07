import shortid from 'shortid';

export default class TodoItem {
    constructor(data = {}) {
        this.id = data.id || shortid.generate();
        this.text = data.text || '';
        this.status = data.status || TodoItem.TODO;
    }
}

TodoItem.TODO = 'todo';
TodoItem.DOING = 'doing';
TodoItem.DONE = 'done';
