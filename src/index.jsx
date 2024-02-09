import React, {useReducer} from 'react';
import {createRoot} from 'react-dom/client';

import Action from './actions';
import InputForm from './components/InputForm.jsx';
import Main from './components/Main.jsx';
import {hideWindow} from './libs/IPC';
import Storage from './libs/Storage';
import {reducer} from './store';

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const root = createRoot(container);
    root.render(<Container />);

    window.addEventListener('keydown', (event) => {
        //if (event.metaKey) event.preventDefault();
        if (event.metaKey && event.shiftKey && event.key === 'h') hideWindow();
        if (event.metaKey && event.shiftKey && event.key === 'i') Action.toggleInputForm();
    });
});

const Container = () => {
    console.log('container');
    const initData = {inputForm: false, data: Storage.getInitial()};
    const [state, dispatch] = useReducer(reducer, initData);
    Action.dispatch = dispatch;

    return (
        <>
            <InputForm isOpen={state.inputForm} />
            <Main data={state.data} />
        </>
    );
};
