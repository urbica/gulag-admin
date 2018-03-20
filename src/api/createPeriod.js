import Immutable from 'immutable';

const periodTemplate = {
  year: 1918,
  title: {
    ru: '',
    en: '',
    de: ''
  },
  description: {
    ru: '',
    en: '',
    de: ''
  }
};

export default (token) => {
  const options = {
    body: JSON.stringify(periodTemplate),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) =>
    fetch('/api/periods', options)
      .then(res => (res.status !== 201 ? reject(res) : res.json()))
      .then(newPeriod => resolve(Immutable.fromJS(newPeriod)))
      .catch(err => reject(err)));
};
