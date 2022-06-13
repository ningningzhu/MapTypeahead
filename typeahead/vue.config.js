module.exports = {
    devServer: {
        proxy: {
            '/graphql': {
                target: 'http://localhost:4000', // paste the copied API url here
                ws: true
            }
        }
    }
};