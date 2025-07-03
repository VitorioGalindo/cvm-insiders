const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const localApiUrl = "http://localhost:5000/api" + event.path.replace('/.netlify/functions/api', '');
    
    const response = await fetch(localApiUrl, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy error" })
    };
  }
};