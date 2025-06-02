const BASE_URL = "http://localhost:5000/galipulse/app-1.0";

const apiRequest = async (method = 'GET', route, body = null, headers = {}) => {
   console.log('api request running');
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const finalHeaders = { ...defaultHeaders, ...headers };

    const options = {
      method: method.toUpperCase(),
      headers: finalHeaders,
      credentials: 'include', // Ensures cookies are sent with requests
    };

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase()) && body) {
      options.body = JSON.stringify(body);
    }

    console.log(options);

    const response = await fetch(`${BASE_URL}${route}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error.message);
    throw error;
  }
};

export default apiRequest;
