import React from 'react';
import {updateTodoTitle} from '../api';
import Styled from 'styled-components';
function UpdateWindow({editedTitle,setEditedTitle,todos,setTodos,setShowUpdateWindow ,selectedTodo,setShowEditWindow}) {
    const handleUpdate = async () => {
        try {
          const response = await updateTodoTitle(selectedTodo._id, editedTitle);
          if (response.success) {
            // Update the title in the todos array
            const updatedTodos = todos.map((todoItem) => {
              if (todoItem._id === selectedTodo._id) {
                return { ...todoItem, title: editedTitle };
              }
              return todoItem;
            });
            setTodos(updatedTodos);
            // Close the update window
            setShowUpdateWindow(false);
            setShowEditWindow(false);
          }
        } catch (error) {
          console.log(error.message);
          // Handle error
        }
      };
      
    return (
        
        <StyledDiv >
            <StyledHeading className="text-6xl text-center mb-10">Update your task</StyledHeading>
        <div>
          <input
  type="text"
  value={editedTitle}
  onChange={(e) => setEditedTitle(e.target.value)}
  /* ...other attributes */
/>
<button className="text-2xl text-center" onClick={handleUpdate}>Update</button>

        </div>
        </StyledDiv>
    );
}
const StyledHeading = Styled.h1`


`
const StyledDiv = Styled.div`
width:100vw;
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:wheat;
div{
   
    width:60%;
   display:flex;
   flex-direction:column;
input{
   width:100%;
   height:3.4rem;
   padding:2%;
   font-size:2rem;
}
button{
    border:2px solid wheat;
    margin-top:2%;
    color:white;
    background:linear-gradient(45deg,white,red,yellow);
    
    &:hover{
        color:pink;
       font-size:1rem;
       font-weight:500;
       letter-spacing:4px;
       text-transform:uppercase;
    }
    
}
}
`
export default UpdateWindow;