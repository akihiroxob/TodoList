import React, { useState } from 'react';

export default (props) => {
    const [text, setText] = useState('');

    return (
        <div className="addForm">
            <div>
                <input
                    type="text"
                    value={text}
                    onInput={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            props.add(text) & setText('');
                        }
                    }}
                />
            </div>
        </div>
    );
};
