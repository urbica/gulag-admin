export default (token, id) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) =>
    fetch(`/api/camps/${id}`, options)
      .then(res => (res.status !== 204 ? reject(res) : resolve(res)))
      .catch(error => reject(error)));
};
