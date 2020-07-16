module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
    },
};