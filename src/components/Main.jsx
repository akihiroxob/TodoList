import React from 'react';
import Stickynote from './Stickynote.jsx';

export default (props) => (
    <main>
        {props.data.map((item) => {
            return <Stickynote key={item.id} {...item} />;
        })}
    </main>
);
