import React, { useState } from 'react';

import TodoItem from '../models/TodoItem.js';
import Todo from './Todo.jsx';
import InputForm from './InputForm.jsx';
import Storage from '../models/Storage';

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, new TodoItem(action.payload)];
        case 'del':
            return state.filter((todo) => todo.id !== action.payload.id);
        default:
            return state;
    }
};

export const useReducer = (resducer, initialState = []) => {
    const [state, setState] = useState(initialState);
    function dispatch(action) {
        const nextState = reducer(state, action);
        Storage.set(nextState);
        setState(nextState);
    }

    return [state, dispatch];
};

export default (props) => {
    const [todo, dispatch] = useReducer(reducer, Storage.get());
    console.log(todo);
    return (
        <main>
            <InputForm add={(text) => dispatch({ type: 'add', payload: { text } })} />
            <div className="list">
                {todo.map(function (data) {
                    return (
                        <Todo
                            key={data.id}
                            {...data}
                            del={(id) => dispatch({ type: 'del', payload: { id } })}
                        />
                    );
                }, this)}
            </div>
        </main>
    );
};
