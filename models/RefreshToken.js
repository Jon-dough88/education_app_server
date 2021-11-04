const mongoose = require('mongoose');
const Teacher = require('../models/teacherSchema');
const Student = require('../models/studentSchema');

const refreshTokenSchema = mongoose.Schema({
    // userId: {
    //     type: Mongoose.Schema.Types.ObjectiD,
    //     ref: Teacher || Student
    // }
})



module.exports = RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)