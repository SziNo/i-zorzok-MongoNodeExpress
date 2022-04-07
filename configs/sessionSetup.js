const MongoStore = require('connect-mongo');
const secret = process.env.SECRET || 'babyyoda';
const { dbUrl } = require('./dbSetup');

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};
module.exports = {
    store,
    sessionConfig
};