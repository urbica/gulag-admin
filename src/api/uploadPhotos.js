// import Immutable from 'immutable';

export default (token, prisonId, photos) => {
  const uploads = new FormData();
  uploads.append('camp_id', prisonId);
  Array.from(photos)
    .forEach(photo => uploads.append('path', photo));

  const options = {
    body: uploads,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return (
    new Promise((resolve, reject) => (
      fetch('/api/public/uploads/id', options)
        .then(res => (res.status !== 200 ? reject(res) : resolve(res.json())))
        .catch(err => reject(err))
    ))
  );
};
