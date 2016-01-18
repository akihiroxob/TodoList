import React from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteTodo() {
        this.props.del(this.props.id);
    }

    render() {
        console.log('todo')
        console.log(this.props, "TODO");
        return (
            <div className="todo">
                <div className="text">
                    {this.props.text}
                </div>
                <div className="close" onClick={this.deleteTodo.bind(this)}></div>
            </div>
        );
    }
}

export default Todo;
