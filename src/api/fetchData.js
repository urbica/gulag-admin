import Immutable from 'immutable';
import { fillMaxPrisoners } from '../utils/utils';

export default (token) => {
  const options = { headers: { Authorization: `Bearer ${token}` } };

  return (
    new Promise((resolve, reject) => (
      Promise.all([
        fetch('/api/public/camps.json', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json()))
          .then(camps => fillMaxPrisoners(camps)),
        fetch('/api/public/uploads.json', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/public/activities.json', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/public/places.json', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/public/types.json', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/public/periods.json', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json())),
        fetch('/api/public/notes.json', options)
          .then(res => (res.status !== 200 ? reject(res) : res.json()))
      ])
        .then(([camps, uploads, activities, places, types, periods, notes]) =>
          resolve(Immutable.fromJS({
            camps, uploads, activities, places, types, periods, notes
          })))
        .catch(error => reject(error))
    ))
  );
};
