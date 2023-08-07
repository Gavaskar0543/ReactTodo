const customFetch = async (url, { body, ...customConfig }) => {
  //header
  const headers = {
    "content-type ": "Application/x-www-form-urlencoded",
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
    config.body = json.stringfy(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (error) {
    console.log("error in fetching api");
    return {
      message: error.message,
      success: false,
    };
  }
};
