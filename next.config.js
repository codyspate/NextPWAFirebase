module.exports = {
    webpack: (config) => {
        // Fixes npm packages that depend on `fs` module

        if (process.env.NODE_ENV === 'production') {
            console.log('MAMAGUEBO')
        }

        config.node = {
            fs: 'empty'
        }

        return config
    }
}