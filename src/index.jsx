import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList.jsx';

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<TodoList />, document.getElementById('container'));
});

