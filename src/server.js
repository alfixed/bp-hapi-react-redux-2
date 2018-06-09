import Hapi from 'hapi';
import mongoose from 'mongoose';
import Vision from 'vision';
import Handlebars from 'handlebars';
import Inert from 'inert';
import StaticAssets from './plugins/pages/static-assets';
import getPlugins from './plugins';
import getConfig from './config/config';

const config = getConfig();
const {
  mongoDbHost,
  mongoDbUser,
  mongoDbPass,
  mongoDbName
} = config.server;
if (mongoDbUser && mongoDbPass) {
  mongoose.connect(`mongodb://${mongoDbUser}:${mongoDbPass}@${mongoDbHost}/${mongoDbName}`);
} else {
  mongoose.connect(`mongodb://${mongoDbHost}/${mongoDbName}`);
}

const db = mongoose.connection;

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.serviceHost
  });

  if (config.useMocks) {
        require('./mock/mock'); // eslint-disable-line
  }

  // Vision is used for adding templating engine
  await server.register(Vision);
  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    path: 'plugins/pages'
  });

  // Plugin for serving static content
  await server.register(Inert);
  await server.register(StaticAssets);

  const plugins = getPlugins(config);
  await server.register(plugins);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
  console.log(`Config: ${JSON.stringify(config)}`); // eslint-disable-line
};

process.on('unhandledRejection', (err) => {
    console.error(err); // eslint-disable-line
  process.exit(1);
});

db.on('error', (e) => {
  console.error('MongoDB connection error:', e); // eslint-disable-line no-console
});
db.once('open', () => {
  console.log(`MongoDB connection success`); // eslint-disable-line
  init();
});
