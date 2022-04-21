import React, {useState} from 'react';
import List from '../models/List';
import TodoItem from './TodoItem.jsx';
import InputForm from './InputForm.jsx';
import {ignoreMouse} from '../libs/IPC';
import Action from '../actions/index';

export default (props) => {
    const list = new List(props);
    const [editTitle, setEditTitle] = useState(false);
    return (
        <section className="list" onMouseEnter={() => ignoreMouse(false)} onMouseLeave={() => ignoreMouse(false)}>
            <div className="list__title" onDoubleClick={() => setEditTitle(true)}>
                {editTitle ? (
                    <input
                        type="text"
                        defaultValue={list.title || '無名のリスト'}
                        onKeyDown={(event) => {
                            if ((event.metaKey && event.key == 'Enter') || (event.ctrlKey && event.key == 'Enter')) {
                                event.target.blur();
                            }
                        }}
                        onBlur={(event) => {
                            Action.changeTitle(list.id, event.target.value);
                            setEditTitle(false);
                        }}
                    />
                ) : (
                    <span>{list.title || '無名のリスト'}</span>
                )}
            </div>
            {list.items.map((item) => (
                <TodoItem key={item.id} listId={list.id} {...item} />
            ))}
            <InputForm listId={list.id} />
        </section>
    );
};
