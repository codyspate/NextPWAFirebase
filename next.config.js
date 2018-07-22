const withOffline = require('next-offline')
var path = require('path');

module.exports = withOffline({
    generateSw: false,
    workboxOpts: {
        swSrc: path.join('worker', 'service-worker.js')
    },
    webpack: (config) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }

        return config
    }
})