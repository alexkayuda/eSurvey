/**
 * This Middleware responsible to checking 
 * if current user is logged in before doing any operations.
 */
module.exports = (request, response, next) => {

    if(!request.user){
        return response.status(401).send({error: 'You must be logged in!'});
    }

    next();
}