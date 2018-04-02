import Immutable from 'immutable';

export default token => {
  const options = { headers: { Authorization: `Bearer ${token}` } };

  return new Promise((resolve, reject) =>
    Promise.all([
      fetch('/api/camps', options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      ),
      // fetch('/api/uploads.json', options)
      //   .then(res => (res.status !== 200 ? reject(res) : res.json())),
      fetch('/api/camp-activities', options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      ),
      fetch('/api/camp-regions', options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      ),
      fetch('/api/camp-types', options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      ),
      fetch('/api/periods', options).then(
        res => (res.status !== 200 ? reject(res) : res.json())
      )
    ])
      .then(([camps, activities, places, types, periods]) =>
        resolve(
          Immutable.fromJS({
            camps,
            activities,
            places,
            types,
            periods
          })
        ))
      .catch(error => reject(error)));
};
