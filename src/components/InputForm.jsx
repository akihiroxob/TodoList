import React, {useState} from 'react';
import Action from '../actions';

export default (props) => {
    const [text, setText] = useState('');
    const [canInput, permit] = useState(false);

    return (
        <div className="list__form">
            {canInput ? (
                <input
                    className="list__form__input"
                    type="text"
                    value={text}
                    onInput={(e) => setText(e.target.value)}
                    onBlur={() => setText('') & permit(false)}
                    onKeyDown={(e) => {
                        if (e.metaKey || e.ctrlKey) {
                            switch (e.key) {
                                case 'Enter': {
                                    if (!text) return;
                                    Action.add(props.listId, {text});
                                    return setText('') & permit(false);
                                }
                                case '=': {
                                    e.preventDefault();
                                    Action.addList();
                                    return setText('');
                                }
                                case '-': {
                                    e.preventDefault();
                                    Action.removeList(props.listId);
                                    return setText('');
                                }
                            }
                        }
                    }}
                />
            ) : (
                <div className="list__form__button" onClick={() => permit(true)} />
            )}
        </div>
    );
};
