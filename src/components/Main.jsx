import React, {useEffect, useRef} from 'react';
import {setSize} from '../libs/IPC';
import TodoList from './TodoList.jsx';

const BODY_MARGIN = 16;
export default (props) => {
    const mainElement = useRef(null);

    useEffect(() => {
        if (!mainElement.current) return;
        const height = mainElement.current.clientHeight + 20;
        const width = props.data.length * 240 + (props.data.length - 1) * 8 + BODY_MARGIN;
        setSize(height, width);
    }, [props.data]);

    return (
        <main ref={mainElement}>
            {props.data.map((list) => (
                <TodoList key={list.id} {...list} />
            ))}
        </main>
    );
};
