export const BASE_URL = 'https://api.dmitry.mesto.nomoredomains.sbs';

function handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
    }).then((res) => {
        return handleResponse(res)
    })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({password, email})
    }).then((res) => {
        return handleResponse(res)
    })
    .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        } else {
          return;
        }
    }) 
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      return handleResponse(res)
    })
    // .then(data => data)
}; 