export default (token, photoId) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) =>
    fetch(`/api/photos/${photoId}`, options)
      .then(res => (res.status !== 204 ? reject(res) : resolve(res)))
      .catch(error => reject(error)));
};
