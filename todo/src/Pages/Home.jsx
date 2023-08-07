
import React from 'react';
import Style from '../Styles/Home.module.css';
function Home({todo}) {
   
    return (
        <>
            <h1 className={Style.popins}>Tasks</h1>
             {todo.map((todo) => 
           

              <div className={Style.taskDiv} key={todo.id}>
                <p>{todo.title}</p>
                {todo.completed ? <h4 className={Style.taskDone}>done</h4> : <h4 className={Style.taskNotDone}>not Done</h4>}
                </div>

             
             )}

     
        </>
    );
}

export default Home;