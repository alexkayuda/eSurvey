
/**
 * The Most Complicated File! ;) 
 * File Responsible to Creating Mail Object, Sending it to SendGrid,
 * where SendGrid will take care of the process of sending it to the end user.
 * Also, SendGrid replaced all <a> tags with there own in order to track who clicked the linked.
 */

const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{

    constructor( { subject, recipients }, content){
        super();

        this.sgApi = sendGrid(keys.sendGridKey);

        this.recipients = this.formatAddresses(recipients);
        this.from_email = new helper.Email('no-reply@eSurvey-support.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        
        //Provided by helper function (add that html doc to the body of the email. Like add element to the stage)
        this.addContent(this.body);
        
        //We only care about click events on links.
        this.addClickTracking();

        // process that list of recipients (an array of strings of recipients)
        this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map( ({email}) => {
            return new helper.Email(email);
        })
    }

    addClickTracking(){
        const trackingSetting = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSetting.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSetting);
    }

    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach( recipient => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);
    }

    //to actually send to SendGrid
    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer; 