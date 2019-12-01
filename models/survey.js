const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./receipient');

const surveySchema = new Schema({
    /**
     * IMPORTANT! 
     * Line above establishes the relationship between survey and user
     * Each survey belongs to a user
     * 
     * prefixed because, by convention, it shows that this is a relationship field
     */
    _user: { type: Schema.Types.ObjectId, ref: 'user'},
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema], //see receipient.js file for more info (sub doc collection)
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);