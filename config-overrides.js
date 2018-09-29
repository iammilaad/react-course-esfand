const path = require('path');

module.exports = {
    webpack: function(config, env) {
        const rewireLess = require('react-app-rewire-less');
        config = rewireLess(config, env);
        config = rewireLess.withLoaderOptions({
            javascriptEnabled: true
        })(config, env);
        config.resolve.alias = {
            components: path.resolve(__dirname, "./src/components"),
            containers: path.resolve(__dirname, "./src/containers"),
            pages: path.resolve(__dirname, "./src/pages"),
            utils: path.resolve(__dirname, "./src/utils"),
            helpers: path.resolve(__dirname, "./src/utils/helpers"),
            hoc: path.resolve(__dirname, "./src/utils/higherOrderComponents"),
            settings: path.resolve(__dirname, "./src/settings"),
            layouts: path.resolve(__dirname, "./src/layouts"),
            languageProvider: path.resolve(__dirname, "./src/languageProvider"),
            src: path.resolve(__dirname, "./src"),
        };
        return config;
    }
};

