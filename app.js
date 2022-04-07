if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Import/Require Express, Override, EJS, Session and Path
const express = require('express');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const path = require('path');

// Setting Routes
const userRoutes = require('./routes/users');
const iDrinksRoutes = require('./routes/iDrinks');
const reviewsRoutes = require('./routes/reviews');

// Middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
const mongoSanitize = require('express-mongo-sanitize');

// Database
const { db } = require('./configs/dbSetup');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected!!');
});

// Initialize App
const app = express();

// Configs For The App
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.locals.moment = require('moment');

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session
const { store } = require('./configs/sessionSetup');
store.on('error', function (e) {
  console.log('SESSION ERROR', e);
});
const { sessionConfig } = require('./configs/sessionSetup');
app.use(session(sessionConfig));

// Helmet
require('./configs/helmetSetup')(app);

// Passport
require('./configs/passportSetup')(app);

// Flash
require('./configs/flashSetup')(app);

// Route Handlers
app.get('/', (req, res) => res.render('home'));
app.use('/', userRoutes);
app.use('/iDrinks', iDrinksRoutes);
app.use('/iDrinks/:id/reviews', reviewsRoutes);

// Error Handlers
require('./routes/errors')(app);

// Starting Up Server
const port = process.env.PORT || 3000;
//const port = 3000;
app.listen(port, () => console.log(`Serving on port ${port}!`));
