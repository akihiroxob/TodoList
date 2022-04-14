import React from 'react';
import List from '../models/List';
import TodoItem from './TodoItem.jsx';
import InputForm from './InputForm.jsx';
import { ignoreMouse } from '../libs/IPC';

export default (props) => {
    const list = new List(props);
    return (
        <section className="list" onMouseEnter={() => ignoreMouse(false)} onMouseLeave={() => ignoreMouse(true)}
        >
            {list.items.map((item) => (
                <TodoItem key={item.id} listId={list.id} {...item} />
            ))}
            <InputForm listId={list.id} />
        </section>
    );
};
