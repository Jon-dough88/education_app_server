const mongoose = require('mongoose');


const teacherSchema = mongoose.Schema({
    // isTeacher: Boolean,
    userType: {
        type: String,
        enum: ['teacher', 'admin']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    groups: [
        {
            groupName: String,
            groupActive: Boolean,
            students: [
                {
                    studentName: String,
                    scores: [
                        {
                            exercise: String,
                            dateStarted: Date,
                            score: Number
                        }
                    ],    
                    startDate: Date
                }
        ]
        }
    ],
    exercises: [
        {
            title: String,
            type: String,
            // type: {enum:["grammar", "vocabulary", "reading", "language", "writing"]},
            numberOfQuestions: Number,
            level: String,
            groups: [],

        }
    ]
}, {collection: 'teacherData'})

module.exports = Teacher = mongoose.model('Teacher', teacherSchema);
