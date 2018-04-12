import Immutable from 'immutable';

export default (token, prisonId, photos) => {
  const uploads = new FormData();
  uploads.append('campId', prisonId);
  Array.from(photos).forEach(photo => uploads.append('path', photo));
  uploads.append('title', '{"ru": "title", "en": "title", "de": "title"}');
  uploads.append(
    'description',
    '{"ru": "description", "en": "description", "de": "description"}'
  );

  const options = {
    body: uploads,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) =>
    fetch('/api/photos', options)
      .then(res => (res.status !== 200 ? reject(res) : res.json()))
      .then(newPhoto => resolve(Immutable.fromJS(newPhoto)))
      .catch(err => reject(err)));
};
