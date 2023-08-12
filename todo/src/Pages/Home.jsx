import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
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
            const updatedTodo = this.state.todo.filter(todo => todo._id !== id);
            this.setState({ todo: updatedTodo });
        } else {
            console.log('not deleted');
        }
    };

    render() {
      
        return (
            <>
                <h1 className={Style.brand}>ToDos!</h1>
                <NewTask todos={this.state.todo}/>
                <h1 className={Style.popins}>Tasks</h1>
                {this.state.todo.map((todo) =>
                    <div className={Style.taskDiv} key={todo._id}>
                        <FontAwesomeIcon onClick={() => this.DeleteTask(todo._id)} icon={faTrash} />
                        <p>{todo.title}</p>
                        {todo.completed ? <h4 className={Style.taskDone}><FontAwesomeIcon icon={faFingerprint} /></h4> : <h4 className={Style.taskNotDone}><FontAwesomeIcon icon={faWindowClose} /></h4>}
                    </div>
                )}
            </>
        );
    }
}

export default Home;
