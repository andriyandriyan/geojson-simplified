'use strict';

const fastify = require('fastify');
const simplify = require('simplify-geojson');

const build = () => {
  const app = fastify();

  const defaultTolerance = 0.00015;

  app.get('/', () => ({ hello: 'world' }));
  app.post('/', ({ body }) => {
    const geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: body.paths,
        },
      }],
    };
    const tolerance = body.tolerance || defaultTolerance;
    const simplified = simplify(geojson, tolerance);
    return { paths: simplified.features[0].geometry.coordinates };
  });

  return app;
};

module.exports = build;
