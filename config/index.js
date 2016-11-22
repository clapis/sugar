module.exports = {
    server: {
        port: process.env.PORT || 5000,
    },
    auth: {
        local: {
            secret: process.env.SECRET || 'secret'
        },
        facebook: {
            clientID: '221992414888218',
            clientSecret: 'e8d76f46d8e420923fe2263056ae5ec7',
            callbackURL: 'http://localhost:5000/auth/facebook/callback'
        }
    },
    database:  process.env.MONGODB_URI || 'mongodb://localhost:27017/sugar',
    sendgrid: {
        username: process.env.SENDGRID_USERNAME,
        password: process.env.SENDGRID_PASSWORD
    }
}
