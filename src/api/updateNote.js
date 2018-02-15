// import Immutable from 'immutable';
//
// export default (token, newCamp) => {
//   const options = {
//     body: JSON.stringify(newCamp.toJS()),
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   };
//
//   return (
//     new Promise((resolve, reject) => (
//       fetch(`/api/public/camps/id/${newCamp.get('id')}`, options)
//         .then(res => (res.status !== 200 ? reject(res) : res.json()))
//         .then(([submittedPrison]) => resolve(Immutable.fromJS(submittedPrison)))
//         .catch(err => reject(err))
//     ))
//   );
// };
