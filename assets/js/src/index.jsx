import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList.jsx';

window.addEventListener('load', () => {
    ReactDOM.render(<TodoList />, document.getElementById('container'));
});

