import React, { useState } from 'react';
import Action from '../actions';
import { ignoreMouse } from '../libs/IPC';

export default (props) => {
    const [text, setText] = useState('');
    return (
        <div
            className={`input-form ${props.isOpen ? 'is-show' : ''}`}
            onMouseEnter={() => ignoreMouse(false)}
            onMouseLeave={() => ignoreMouse(true)}
        >
            <div className="input-form__header">Add Your New Todo Note</div>
            <textarea
                className="input-form__textinput"
                type="text"
                value={text}
                onInput={(e) => setText(e.target.value)}
                onBlur={() => {
                    setText('');
                    Action.toggleInputForm();
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !!text) {
                        Action.add({ text });
                        setText('');
                    }
                }}
            />
        </div>
    );
};
