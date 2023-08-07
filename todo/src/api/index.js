import { API_URLS } from "../utils/constants";

const customFetch = async (url, { body, ...customConfig }) => {
  //header
  const headers = {
    "content-type": "Application/x-www-form-urlencoded", // Removed the extra space after "content-type"
  };

  //config
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  //body
  if (body) {
    config.body = JSON.stringify(body); // Corrected the typo here, should be JSON.stringify
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
console.log('data',data)
    if (response.ok) {
      return {
        data: data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getTodos = () => {
  return customFetch(API_URLS.todos(), {
    method: 'GET',
  });
};
