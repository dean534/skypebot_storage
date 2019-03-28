const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
    title: String,    
    detail: String,
    username: String,
    updateDate: { type: Date, default: Date.now }
});



var Bulletin = mongoose.model('Bulletin', bulletinSchema);

module.exports = Bulletin;