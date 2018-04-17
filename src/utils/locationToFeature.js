export default location => ({
  type: 'Feature',
  properties: {},
  geometry: location.get('geometry').toJS()
});
