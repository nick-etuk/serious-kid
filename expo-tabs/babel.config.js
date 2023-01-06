module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            [
                "@babel/plugin-transform-runtime",
                {
                    helpers: true,
                    regenerator: true,
                },
            ],
            [
                "module-resolver",
                {
                    root: ["."],
                    alias: {
                        assets: "./assets",
                        components: "./components",
                        services: "./services",
                        store: "./store",
                        utils: "./utils",
                        constants: "./constants",
                        styles: "./styles",
                    },
                },
            ],
        ],
    };
};
