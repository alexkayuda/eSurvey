const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   googleID : String,
   credits: { type: Number, default: 0 }
});

/**
 * this loads a schema into mongoose
 * 
 * @param users - name of the collection
 * @param userSchema - one that was created above
 */
mongoose.model('users', userSchema);