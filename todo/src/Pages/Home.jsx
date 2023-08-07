
import React from 'react';

function Home({todo}) {
   
    return (
        <>
      
             {todo.map((todo) => 
           
                <h1 key={todo.id}>{todo.title}</h1>

             
             )}

     
        </>
    );
}

export default Home;