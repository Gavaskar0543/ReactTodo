import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import NewTask from '../Components/NewTask';
import { destroyTodos } from '../api';
import Style from '../Styles/Home.module.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: props.todo,
        };
    }

    DeleteTask = async (id) => {
        const response = await destroyTodos(id);

        if (response.success) {
            console.log('deleted !');
            const updatedTodo = this.state.todo.filter(todo => todo.id !== id);
            this.setState({ todo: updatedTodo });
        } else {
            console.log('not deleted');
        }
    };

    render() {
        return (
            <>
                <h1 className={Style.brand}>ToDos!</h1>
                <NewTask />
                <h1 className={Style.popins}>Tasks</h1>
                {this.state.todo.map((todo) =>
                    <div className={Style.taskDiv} key={todo.id}>
                        <FontAwesomeIcon onClick={() => this.DeleteTask(todo.id)} icon={faTrash} />
                        <p>{todo.title}</p>
                        {todo.completed ? <h4 className={Style.taskDone}>done</h4> : <h4 className={Style.taskNotDone}>not Done</h4>}
                    </div>
                )}
            </>
        );
    }
}

export default Home;
