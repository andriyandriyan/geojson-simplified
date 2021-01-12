const fastify = require('fastify');
const simplify = require('simplify-geojson');

const app = fastify();
const port = 3000;

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

const start = async () => {
  try {
    await app.listen(port);
    console.log('App is listening');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
