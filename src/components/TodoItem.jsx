import React from 'react';
import Action from '../actions';
import Item from '../models/Item';

const LINK_REG = /https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g;
const textToLink = (text) =>
    text.replace(LINK_REG, (link) => {
        return (
            <a href="${link}" target="_blank">
                ${link}
            </a>
        );
    });

export default (props) => {
    const item = new Item(props);
    return (
        <div className={`list__todo ${item.status}`}>
            <div className="list__todo__text">{item.text}</div>
            <div className="util__close" onClick={() => Action.del(props.listId, props.id)}></div>
        </div>
    );
};
