class Api {
    constructor(option) {
        this._url = option.url;
        this._headers = option.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            credentials: 'include',
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })
        }).then((res) => {
            return this._handleResponse(res)
        })
    }
}

const api = new Api({
    url: 'https://api.dmitry.mesto.nomoredomains.sbs',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
});

export default api;
