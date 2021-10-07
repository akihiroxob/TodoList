import React from 'react';

const LINK_REG = /https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g;
const textToLink = (text) =>
    text.replace(LINK_REG, (link) => {
        return (
            <a href="${link}" target="_blank">
                ${link}
            </a>
        );
    });

export default (props) => (
    <div className={`todo ${props.status}`}>
        <div className="text">{props.text}</div>
        <div className="close" onClick={() => props.del(props.id)}></div>
    </div>
);
