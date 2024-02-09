import * as Const from '../constants';
import Stickynote from '../models/Stickynote';

class Action {
    constructor() {
        this.dispatch;
    }

    add(data) {
        this.dispatch({
            type: Const.ADD_ITEM,
            payload: new Stickynote({
                ...data,
                position: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                },
            }),
        });
    }

    update(id, next) {
        this.dispatch({
            type: Const.UPDATE_ITEM,
            payload: {id, next},
        });
    }

    del(targetId) {
        this.dispatch({
            type: Const.DELETE_ITEM,
            payload: {targetId},
        });
    }

    toggleInputForm() {
        this.dispatch({type: Const.TOGGLE_INPUT_FORM});
    }
}

export default new Action();
