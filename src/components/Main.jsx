import React, {useEffect, useRef} from 'react';
import {ignoreMouse, setSize} from '../libs/IPC';
import TodoList from './TodoList.jsx';

const BODY_MARGIN = 16;
export default (props) => {
    const mainElement = useRef(null);

    useEffect(() => {
        if (!mainElement.current) return;
        const height = mainElement.current.clientHeight + BODY_MARGIN;
        const width = props.data.length * 240 + (props.data.length - 1) * 8 + BODY_MARGIN;
        setSize(height, wi);
    }, [props.data]); // <-- here put the parameter to listen

    return (
        <main ref={mainElement} onMouseEnter={() => ignoreMouse(false)} onMouseLeave={() => ignoreMouse(true)}>
            {props.data.map((list) => (
                <TodoList key={list.id} {...list} />
            ))}
        </main>
    );
};
