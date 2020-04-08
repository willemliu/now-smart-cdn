module.exports = {
    experimental: {
        modern: true,
        polyfillsOptimization: true,
        async rewrites() {
            return [
                {
                    source: "/api/clock2",
                    destination: "/api/clock",
                },
            ];
        },
    },
};
