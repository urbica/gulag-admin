import Immutable from 'immutable';
import { fillMaxPrisoners } from '../utils/utils';

export default (token) => {
  const options = { headers: { Authorization: `Bearer ${token}` } };

  return (
    new Promise((resolve, reject) => (
      Promise.all([
        // fetch('/api/camps.json', options)
        //   .then(res => (res.status !== 200 ? reject(res) : res.json()))
        //   .then(camps => fillMaxPrisoners(camps)),
        // fetch('/api/uploads.json', options)
        //   .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/camp-activities', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/camp-regions', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/camp-types', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/periods', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json()))
      ])
        .then(([activities, places, types, periods]) =>
          resolve(Immutable.fromJS({
            activities, places, types, periods
          })))
        .catch(error => reject(error))
    ))
  );
};
