import React      from 'react';
import Todo       from './Todo.jsx';
import InputForm  from './InputForm.jsx';
import Storage    from '../lib/Storage' ;

const STORAGE_KEY = 'TODO_DATA';
class TodoList extends React.Component {
    constructor() {
        super();

        //  [{
        //      "text":  String,
        //      "done":  Bool
        //  }]
        this.stage   = window.require('remote').getCurrentWindow();
        console.log(this.stage);
        let tododata = Storage.get(STORAGE_KEY) || [];
        this.state = { tododata };
    }

    componentDidUpdate() {
        this.componentDidMount();
    }
    componentDidMount() {
        let height = document.body.scrollHeight;
        this.stage.setSize(300, +height);
    }

    addTodoData(text, done) {
        if (!text) { return; }

        let id = "xxxxxx".replace(/x/g, () => Math.floor(Math.random()*10));
        let tododata = this.state.tododata;

        tododata.push({id, text, done});
        Storage.set(STORAGE_KEY, tododata);
        this.setState({tododata});
    }

    doneTodoData(id) {
        let tododata = this.state.tododata;
        let index = tododata.map((d) => d.id).indexOf(id);
        if (index === -1) { return; }

        tododata.splice(index, 1);
        Storage.set(STORAGE_KEY, tododata);
        this.setState({tododata});
    }

    render() {
        return (
            <div ref="wrapper">
                <InputForm add={this.addTodoData.bind(this)} />
                <div className="list">
                    {this.state.tododata.map(function(data){
                        return (
                            <Todo key={data.id}
                                id={data.id}
                                text={data.text}
                                done={data.done}
                                del={this.doneTodoData.bind(this)}
                            />
                        );
                    }, this)}
                </div>
            </div>
        )
    }
}

export default TodoList;
