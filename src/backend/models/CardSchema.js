const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
    text: String,
    doneStatus: Boolean,
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Card', cardSchema);