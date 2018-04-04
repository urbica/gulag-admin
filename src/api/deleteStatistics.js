export default (token, id, campId) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ campId })
  };

  return new Promise((resolve, reject) =>
    fetch(`/api/camp-statistics/${id}`, options)
      .then(res => (res.status !== 200 ? reject(res) : resolve(res.json())))
      .catch(error => reject(error)));
};
