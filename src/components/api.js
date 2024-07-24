const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
  headers: {
    authorization: 'a3298925-26aa-460c-a193-8527045c2876',
    'Content-Type': 'application/json'
  }
}

const getDataPromise = (url, setup) => fetch(url, setup)
.then(result => {
  if (result.ok) {
    return result.json()
  }
  return Promise.reject(`Ошибка: ${result.status}`);
});

export const getUserInfo = () => {
  return getDataPromise(`${config.baseUrl}/users/me`, {headers: config.headers})
}

export const getCards = () => {
  return Promise.all(
    [getDataPromise(`${config.baseUrl}/users/me`, {headers: config.headers}), 
      getDataPromise(`${config.baseUrl}/cards`, {headers: config.headers})]
  )
}

export const editProfile = (newName, newAbout) => {
  return getDataPromise(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers, 
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
  })
  .then(newData => console.log(`profile updated succesfull, new name / about: ${newData.name}, ${newData.about}`))
  .catch((err) => console.log(err));
}

export const addNewCard = (cardName, cardLink) => {
  return getDataPromise(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  });
}

export const removeCard = (cardId) => {
  return getDataPromise(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(console.log(`${cardId} deleted`));
}

export const addLike = (cardId) => {
  return getDataPromise(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
}

export const removeLike = (cardId) => {
  return getDataPromise(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export const updateAvatar = (newProfilePhotoLink) => {
  return getDataPromise(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newProfilePhotoLink,
    })
  })
}