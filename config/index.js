module.exports = {
    server: {
        port: process.env.PORT || 5000,
    },
    secret: process.env.SECRET || 'secret',
    database:  process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
}
