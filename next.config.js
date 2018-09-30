const path = require('path')

const Plugins = require('next-compose-plugins');
const ProgressBar = require('next-progressbar')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = Plugins([ProgressBar], {
  webpack: (config, { buildId, dev }) => {
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        entries['main.js'].unshift(path.resolve('./client/polyfills.js'));
        entries['main.js'].push(path.resolve('./utils/offline'))
      }

      return entries;
    };

    /* Enable only in Production */
    if (!dev) {
      // Service Worker

      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: path.join(__dirname, 'utils', 'service-worker.js'),
          swDest: path.join(__dirname, '.next', 'service-worker.js'),
          globDirectory: __dirname,
          globPatterns: [
            'static/**/*.{png,jpg,ico}' // Precache all static assets by default
          ]
        })
      )
    }

    return config
  }
})
