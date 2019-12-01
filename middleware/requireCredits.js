/**
 * This Middleware responsible to checking 
 * if current user has enough credits to send a survey.
 */
module.exports = (request, response, next) => {

    if(request.user.credits < 1){
        return response.status(403).send( { error: 'Not enough credits!' });
    }

    next();
};