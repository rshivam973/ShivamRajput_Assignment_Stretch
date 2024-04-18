const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    email: { type: String, unique: true, required: true},
    password: {type: String, required: true},
    techStack:  [{ type: String }],
    location: {type: String},
    fieldOfInterest : [{type:String}],
    seeking: [{type: String}],
    bio: String,
    githubURL : {type: String},
    twitterURL : {type: String},
    websiteURL : {type: String},
    linkedinURL : {type: String},
});

module.exports = mongoose.model('Student', studentSchema);
