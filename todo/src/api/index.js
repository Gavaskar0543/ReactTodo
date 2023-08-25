import { API_URLS } from "../utils/constants";

const customFetch = async (url, { body, ...customConfig }) => {
  // Headers
  /* The `const headers` block is creating an object that represents the headers for the HTTP request.
  It includes a default header `'Content-Type'` with the value
  `'application/x-www-form-urlencoded'`. This header specifies the format of the data being sent in
  the request body. */
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded', // Change to x-www-form-urlencoded
    ...customConfig.headers,
  };

 /* The `config` object is being created to store the configuration options for the HTTP request. It is
 a combination of the `customConfig` object passed as an argument to the `customFetch` function and
 the `headers` object. */
  // Config
  const config = {
    ...customConfig,
    headers: headers,
  };

  // Body
 /* The code block is responsible for converting the `body` object into a URL-encoded string and
 assigning it to the `config.body` property. */
  if (body) {
    const formData = new URLSearchParams();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    config.body = formData.toString();
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (response.ok) {
      return {
        data: data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};



//show todos from db
export const getTodos = () => {
  return customFetch(API_URLS.todos(), {
    method: 'GET',
  });
};



/**
 * The function `postTodos` sends a POST request to add a new todo with the specified task.
 * @param task - The `task` parameter is the object that represents the new todo item to be added. It
 * should have a `title` property that specifies the title of the todo item.
 * @returns The function `postTodos` is returning the result of the `customFetch` function.
 */
// Add new todos
export const postTodos = (task) => {
  return customFetch(API_URLS.addtodos(), {
    method: 'POST',
    body: { title:task,completed:false }, // Wrap the 'task' object in curly braces for clarity
  });
};


/**
 * The function `destroyTodos` is used to delete todos by making a DELETE request to the specified API
 * URL.
 * @param id - The `id` parameter represents the unique identifier of the todo item that you want to
 * delete.
 * @returns The `destroyTodos` function is returning the result of the `customFetch` function, which is
 * a promise.
 */
//delte todos

export const destroyTodos = (id) => {
  return customFetch(API_URLS.deletetodos(id),{
    method:'DELETE'
  })
}
//mark done
export const markDone = (id) => {
  return customFetch(API_URLS.toggleCompleted(id),{
    method:'POST'
  })
}

//update task
export const updateTodoTitle = (id,task) =>{
  return customFetch(API_URLS.updateTask(id),{
    method: 'PUT',
    body: { title:task,completed:false },
  })
}