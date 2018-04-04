export default (token, id) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) =>
    fetch(`/api/camp-location/${id}`, options)
      .then(res => (res.status !== 200 ? reject(res) : resolve(res.json())))
      .catch(error => reject(error)));
};
