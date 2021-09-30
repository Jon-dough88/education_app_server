const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    groupName: String,
    groupActive: Boolean,
    students: [
        {
        studentName: String,
        scores: [
                {
                exerciseTitle: String,
                dateStarted: Date,
                score: Number
                }
            ],    
        startDate: Date
        }
    ],

            
})


const Group = mongoose.model('Group', groupSchema);
module.exports = Group;