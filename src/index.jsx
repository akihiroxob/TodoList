import React, {useReducer} from 'react';
import {createRoot} from 'react-dom/client';

import Action from './actions';
import Storage from './libs/Storage';
import {reducer} from './store';
import Main from './components/Main.jsx';

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const root = createRoot(container);
    root.render(<Container />);
});

const Container = () => {
    const initData = Storage.getInitial();
    const [state, dispatch] = useReducer(reducer, initData);
    Action.dispatch = dispatch;
    return <Main data={state} />;
};
