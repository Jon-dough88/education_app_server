const mongoose = require("mongoose");


const studentSchema = mongoose.Schema({
    userType: {
        type: String,
        enum: ['student']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
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
    class: [{
        type: String
    }],
    group: [{
        type: String
    }],
    Level: {
        type: String
    },
    recommendedLevel: String,
    teachers: [],
    exercises: [{
        title: String,
        subject: String,
        type: String,
        level: String,
        score: Number,
        completion: Number,
        errors: [{}],
        startDate: Date,
        lastActive: Date
    }],
    lastActive: Date,
    accountActive: Boolean,
    completedExercises: [{
        title: String,
        level: String,
        completedOn: Date,
        score: Number
    }]
}, {collection: 'studentData'})


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;