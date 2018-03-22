import Immutable from 'immutable';

export default (token, periods) => {
  const options = {
    body: JSON.stringify(periods),
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) =>
    fetch('/api/periods', options)
      .then(res => (res.status !== 201 ? reject(res) : res.json()))
      .then(updatedPeriods => resolve(Immutable.fromJS(updatedPeriods)))
      .catch(error => reject(error)));
};
