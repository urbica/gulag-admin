import Immutable from 'immutable';
import prisonTemplate from '../utils/prisonTemplate';

export default (token) => {
  const options = {
    body: JSON.stringify(prisonTemplate),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) =>
    fetch('/api/camps', options)
      .then(res => (res.status !== 200 ? reject(res) : res.json()))
      .then(newCamp => resolve(Immutable.fromJS(newCamp)))
      .catch(err => reject(err)));
};
