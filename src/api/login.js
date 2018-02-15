export default (password) => {
  const options = {
    body: JSON.stringify({ email: 'hello@urbica.co', password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  return (
    new Promise((resolve, reject) => (
      fetch('/login', options)
        .then(res => (res.status !== 200 ? reject(res) : res.json()))
        .then(json => resolve(json.token))
        .catch(error => reject(error))
    ))
  );
};
