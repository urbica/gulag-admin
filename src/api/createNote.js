import Immutable from 'immutable';

export default (token, prisonId, note) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ note, prison_id: prisonId })
  };

  return (
    new Promise((resolve, reject) => (
      fetch('/api/public/notes/id/', options)
        .then(res => (res.status !== 200 ? reject(res) : res.json()))
        .then(([newNote]) => resolve(Immutable.fromJS(newNote)))
        .catch(err => reject(err))
    ))
  );
};
