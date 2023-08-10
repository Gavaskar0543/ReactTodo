const ROOT_URL = ' https://jsonplaceholder.typicode.com/todos';

//api urls
export const API_URLS = {
todos : () => ROOT_URL,
addtodos: () =>`${ROOT_URL}`,
deletetodos :(id) => `${ROOT_URL}/${id}`
}