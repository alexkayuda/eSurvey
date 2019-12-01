/**
 * This is for validating emails
 */

const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 export default (listOfEmails) => {
    const invalidEmails = 
        listOfEmails
        .split(',')
        .map( (splittedEmail) => { 
                return splittedEmail.trim(); 
            })
        .filter( (trimmedEmail) => {
            return (regularExpression.test(trimmedEmail) === false);
        });

    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    } 
    else return;
 };