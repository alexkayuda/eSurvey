
/**
 * This is an email template that will be sent to a user.
 * Contains to <a> tags to capture a vote result.
 */

const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
        <body>
            <div style="text-align: center">
                <h3>I would love to get a feedback from you!</h3>
                <p>Please answer the following question</p>
                <p> ${survey.body} </p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                </div>
            </div>
        </body>
    </html>
  `;  
};