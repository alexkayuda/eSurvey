
/**
 * List of routes related to auth processes
 * that will be exported/attached to app (express)
 */

const passport = require('passport');

module.exports = (app) => {
   
    app.get('/auth/google',passport.authenticate('google',{ scope: ['profile', 'email']})); 

    app.get('/auth/google/callback', passport.authenticate('google'), (request, response) => {
            response.redirect('/surveys');
        }
     );

    app.get('/api/logout', (request, response) => {
        request.logout();
        response.redirect('/');
    });

    app.get('/api/current_user', (request, response) => {
        response.send(request.user);
    });
};
