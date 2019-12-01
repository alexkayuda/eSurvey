const keys = require('./config/keys.js');

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const passport = require('passport');

const cookieSession = require('cookie-session');

require('./models/user.js');

require('./models/survey');

require('./services/passport.js');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//Experess Framework
const app = express();

/**
 * Middlewares
 */
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in miliseconds
        keys: [keys.cookieKey] //just random string. can use multiple strings
    })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Attaching routes to Express
 */
require('./routes/authRoutes.js')(app); 

require('./routes/billingRoutes')(app);

require('./routes/surveyRoutes')(app);

/**
 * Dev vs Production Environment Route Handling
 */
if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

/**
 * Dev vs Prod Port
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);