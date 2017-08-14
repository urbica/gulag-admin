#!/usr/bin/env node
/* eslint no-param-reassign: ["error", { "props": false }]*/

const fs = require('fs');
const path = require('path');

const citiesPath = path.join(__dirname, 'allCities.geojson');
const outputFilePath = path.join(__dirname, 'newCities.geojson');

const cities = JSON.parse(fs.readFileSync(citiesPath));

const filtredCities = cities.features.filter(feature => feature.properties.historical_name !== '');
const result = {
  type: 'FeatureCollection',
  features: filtredCities
};

result.features.forEach(
  (feature) => {
    delete feature.properties.lat;
    delete feature.properties.lon;
    delete feature.properties.city;
  }
);


fs.writeFileSync(outputFilePath, JSON.stringify(result));
