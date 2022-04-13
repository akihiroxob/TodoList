import * as Const from '../constants';
import Storage from '../libs/Storage';
import List from '../models/List';

/**
 * state: [{id: '', litems: []}];
 */
export const reducer = (state, action) => {
    switch (action.type) {
        case Const.ADD_LIST: {
            const nextState = [...state, action.payload];
            Storage.set(nextState);
            return nextState;
        }
        case Const.MOVE_LIST: {
        }
        case Const.REMOVE_LIST: {
            const nextState = state.filter((list) => list.id != action.payload.targetId);
            if (nextState.length === 0) nextState.push(new List());
            return nextState;
        }

        case Const.ADD_ITEM: {
            const nextState = state.map((list) => {
                if (list.id !== action.payload.listId) return list;
                list.items.push(action.payload.item);
                return list;
            });
            Storage.set(nextState);
            return nextState;
        }
        case Const.UPDATE_ITEM: {
        }
        case Const.DELETE_ITEM: {
            const nextState = state.map((list) => {
                if (list.id !== action.payload.listId) return list;
                list.items = list.items.filter((item) => item.id !== action.payload.targetId);
                return list;
            });
            Storage.set(nextState);
            return nextState;
        }
        default:
            throw new Error();
    }
};
