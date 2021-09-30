const mongoose = require('mongoose');


const exerciseSchema = mongoose.Schema({
    title: String,
    subject: String,
    type: String,
    templateNum: Number,
    numberOfQuestions: Number,
    dateCreated: Date,
    level: String,
    groups: [],
    score: Number,
    levelAssessment: String,
    errors: []

})

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;