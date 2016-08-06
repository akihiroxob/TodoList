import React from 'react';

class InputForm extends React.Component {

    constructor(props) {
        super(props);
    }

    addTodo() {
        let todo = this.refs.todo.value;
        if (!todo) { return; }

        this.refs.todo.value = '';
        this.props.add(todo, true);
    }

    checkEnter(event) {
        var keyCode = event.keyCode || event.charCode;
        if (keyCode === 13) { event.target.blur(); }
    }

    render() {
        return (
            <div className="addForm">
                <div>
                    <input type="text"
                        ref="todo"
                        onBlur={this.addTodo.bind(this)}
                        onKeyDown={this.checkEnter.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default InputForm;
