
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

/**
 * Testing frameworks might show us an error if we directly 
 * require /models/survey.js file
 * Instead, use approach below to avoid possible errors.
 * We are doing same thing but appoaching it differently
 */
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

/**
 * This is Mailer from SendGrid
 */
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

/**
 * For parsing data comming from SendGrid to detect distincts records that we need from 
 * the entire data set that we get
 */
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');


module.exports = (app) => {

    app.get('/api/surveys', requireLogin, async (request,response) => {
        const surveys = await Survey.find( { _user: request.user.id } )
                                    .select({recipients: false});
        response.send(surveys);
    });

    /**
     * 
     */
    app.post('/api/surveys/webhooks' , (request, response) => {
        // console.log(request.body);
        // response.send();

        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(request.body)
        .map((event) => {
            const match = p.test(new URL(event.url).pathname);  //math is null || Object
            if(match){
                return {
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }
        })
        .compact() //go throught array and removes all elements that are 'undefined'
        .uniqBy('email', 'surveyId') //get rid of all duplicated valued inside array.
        .each( ({surveyId, email, choice}) => {
            Survey.updateOne({
                _id: surveyId, //in Mongo, id of each id is prefixed with '_'
                recipients: {
                    $elemMatch: {
                        email: email,
                        responded: false
                    }
                }
            }, {
                $inc: { [choice] : 1 }, //choice is Yes/No
                $set: { 'recipients.$.responded': true},
                lastResponded: new Date()
            })
            .exec();
        })
        .value();

        response.send({});
    });


    app.get('/api/surveys/:surveyId/:choice', (request, response) => {
        //response.send("Thanks for voting!");
        response.redirect('/feedback');
    });
    

    app.post('/api/survey/delete', requireLogin, async (request, response) => {
        try{
            await Survey.deleteOne( { _id: request.body.surveyId } );
        }catch(error){
            response.status(500).send( {error: 'Survey Routes Error!'} );
        }
        response.redirect('/api/surveys');
    }); 

    /**
     * Responsible for creating NEW servey and SENDING it out
     * 
     * Note: order in with middlewares are listed matters!!!!
     * First, check if user is logged in (custom middleware - requireLogin.js file)
     * Second, check if user has enough credits to send a survey
     */
    app.post('/api/surveys', requireLogin, requireCredits, async (request, response) => {

        //need to make sure needed data will be send to the backend
        const { title, subject, body, recipients } = request.body;

        //creating new instance of the survey
        const survey = new Survey({
            title: title, //bacause names are identical, title: title  ->  title
            subject: subject,
            body: body,

            /**
             * transform array of strings (separated by comma) to array of objects with property 'email'
             * Example: [ {email: me@sample.com}, {him@google.com}, ... ]
             * 
             *  1) take array of strings that represents a list of strings of email addresses separated by comma
             *  2) .split(',') returns new array of individual elements splitted by comma
             *  3) .map(  ) loops through array created in step 2) and then creates and returns 
             *              a new array of Objects where each email called 'emailElement' from step 2 
             *              is mapped to property called 'email'
             *  4) .trim() - make sure that we delete extra white spaces from emails provided to us
             *  5) assign newly create array of Objects to property called 'recipients'
             */
            recipients: recipients.split(',').map( (emailElement) => {return { email: emailElement.trim() }}),
            _user: request.user.id,
            dateSent: Date.now()

        });

        /**
         * Send that email
         */
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();

            request.user.credits -= 1;
            const user = await request.user.save();
            response.send(user);
        } catch(error){
            response.status(422).send( {error: 'Survey Routes Error!'} );
        }
    });
}

