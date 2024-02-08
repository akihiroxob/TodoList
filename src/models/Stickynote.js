import shortid from 'shortid';

export default class Stickynote {
    constructor(data = {}) {
        this.id = data.id || shortid.generate();
        this.text = data.text || '';
        this.status = data.status || Stickynote.TODO;
        this.position = data.position || { x: 0, y: 0 };
    }
}

Stickynote.TODO = 'todo';
Stickynote.DOING = 'doing';
Stickynote.DONE = 'done';
