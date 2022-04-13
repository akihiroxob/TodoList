import React from 'react';
import List from '../models/List';
import TodoItem from './TodoItem.jsx';
import InputForm from './InputForm.jsx';

export default (props) => {
    const list = new List(props);
    return (
        <section className="list">
            {list.items.map((item) => (
                <TodoItem key={item.id} listId={list.id} {...item} />
            ))}
            <InputForm listId={list.id} />
        </section>
    );
};
