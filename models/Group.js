const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    groupId: mongoose.Types.ObjectId,
    groupName: String,
    groupLevel: String,
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

// })
}, {collection: 'groupData'})



module.exports = Group = mongoose.model('Group', groupSchema);