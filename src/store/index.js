import * as Const from '../constants';
import Storage from '../libs/Storage';

/**
 * state: {modal: {}, data: [{id: '', litems: []}]};
 */
export const reducer = (state, action) => {
    switch (action.type) {
        case Const.ADD_ITEM: {
            const nextState = Object.assign({}, state);
            nextState.data = [...state.data, action.payload];
            Storage.set(nextState.data);
            return nextState;
        }
        case Const.UPDATE_ITEM: {
            const nextState = Object.assign({}, state);
            nextState.data = state.data.map((item) => {
                if (item.id !== action.payload.id) return item;
                console.log(action.payload.next.position);
                return action.payload.next;
            });
            Storage.set(nextState.data);
            return nextState;
        }
        case Const.DELETE_ITEM: {
            const nextState = Object.assign({}, state);
            nextState.data = state.data.filter((item) => item.id !== action.payload.targetId);
            Storage.set(nextState.data);
            return nextState;
        }

        case Const.TOGGLE_INPUT_FORM: {
            const nextState = Object.assign({}, state);
            nextState.inputForm = !state.inputForm;
            console.log(nextState.inputForm, state.inputForm, state);
            return nextState;
        }

        default:
            throw new Error();
    }
};
