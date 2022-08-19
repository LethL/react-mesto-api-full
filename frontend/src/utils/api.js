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
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
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
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        }).then((res) => {
            return this._handleResponse(res)
        })
    }

    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
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
    url: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
      authorization: '34ba8aa0-fdc8-4f70-8c18-1ea7527a281e',
      'Content-Type': 'application/json'
    }
});

export default api;
