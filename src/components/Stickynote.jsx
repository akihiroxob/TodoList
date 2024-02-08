import React, { useState } from 'react';
import Action from '../actions';
import { ignoreMouse } from '../libs/IPC';

const LINK_REG = /https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g;
const MDLINK_REG = /\[.*?\]\(.*?\)/g;
const textToLink = (text) => {
    const MdLinks = (text.match(MDLINK_REG) || []).map((text) => {
        const matcher = text.match(/\[(.*)\]\((.*)\)/);
        if (!matcher) return text;
        return `<a href="${matcher[2]}" target="_blank">${matcher[1]}</a>`;
    });

    const texts = text.split(MDLINK_REG);
    const linkTexts = texts.map((text) =>
        text.replace(LINK_REG, (link) => `<a href=${link} target="_blank">${link}</a>`)
    );

    let convertMdLink = '';
    for (let linkText of linkTexts) {
        convertMdLink += linkText + (MdLinks.shift() || '');
    }

    return convertMdLink.split('\n').join('<br/>');
};

const PAD = 24;
const STICKY_WIDTH = 320;
export default (props) => {
    const [startDrag, setStartDrag] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [startEdit, setStartEdit] = useState(false);

    const updatePosition = (e) => {
        if (!startDrag) return;
        const position = {
            x: e.clientX - startPosition.x,
            y: e.clientY - startPosition.y,
        };

        const { innerHeight, innerWidth } = window;
        if (position.x < PAD) position.x = PAD;
        else if (position.x + STICKY_WIDTH + PAD > innerWidth) position.x = innerWidth - (STICKY_WIDTH + PAD);
        if (position.y < PAD) position.y = PAD;
        else if (position.y + PAD > innerHeight) position.y = innerHeight - PAD;

        const next = Object.assign({}, props, { position });
        Action.update(props.id, next);
    };
    return (
        <div
            className={`stickynote ${props.status}`}
            style={{ top: props.position.y, left: props.position.x }}
            onMouseDown={(e) => {
                const targetRect = e.target.getBoundingClientRect();
                setStartPosition({ x: e.clientX - targetRect.left, y: e.clientY - targetRect.top });
                setStartDrag(true);
            }}
            onMouseMove={updatePosition}
            onMouseUp={(e) => setStartDrag(false)}
            onDoubleClick={(e) => setStartEdit(true)}
            onMouseEnter={() => ignoreMouse(false)}
            onMouseLeave={() => ignoreMouse(true)}
        >
            {startEdit ? (
                <textarea
                    value={props.text}
                    onInput={(e) => {
                        const next = Object.assign({}, props, { text: e.target.value });
                        Action.update(props.id, next);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) setStartEdit(false);
                    }}
                    onBlur={() => setStartEdit(false)}
                />
            ) : (
                <>
                    <div
                        className="stickynote__text"
                        dangerouslySetInnerHTML={{ __html: textToLink(props.text) }}
                    ></div>
                    <div
                        className="stickynote__delete"
                        onClick={() => window.confirm('are you sure to delete?') && Action.del(props.id)}
                    ></div>
                </>
            )}
        </div>
    );
};
