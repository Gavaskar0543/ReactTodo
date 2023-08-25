const ROOT_URL = 'http://localhost:8000/api/v1';

//api urls
export const API_URLS = {
todos : () => `${ROOT_URL}/tasks`,
addtodos: () =>`${ROOT_URL}/newTask`,
deletetodos :(id) => `${ROOT_URL}/destroy/${id}`,
toggleCompleted:(id) => `${ROOT_URL}/taskDone/${id}`,
updateTask:(id) => `${ROOT_URL}/updateTask/${id}`
}