const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    // Extrai o caminho da URL (ex: /api/config → /config)
    const path = event.path.replace('/.netlify/functions/api', '');
    
    // URL do seu backend local (substitua pelo seu ngrok ou IP público)
    const backendUrl = `https://0114-187-62-33-42.ngrok-free.app${path}`;
    
    // Encaminha a requisição para seu backend local
    const response = await fetch(backendUrl, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.httpMethod === 'GET' ? null : event.body
    });

    // Retorna a resposta do backend para o frontend
    const data = await response.text();
    
    return {
      statusCode: response.status,
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro no proxy: " + error.message })
    };
  }
};