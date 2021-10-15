const express = require('express');
const bcrypt = require('bcrypt');

const userRouter = express.Router();

const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');

// ****** CRUD operations ******


// Signing up

userRouter.post('/signup', async (req, res) => {

    const {firstName, lastName, userName, email, password, userType} = req.body;
    // console.log(`Backend values: ${values}`);

    try{
        // const hashedPassword = await bcrypt.hash(values.password, 10)

        let user = {}
        user.firstName = firstName
        user.lastName = lastName
        user.userName = userName
        user.email = email
        user.userType = userType

        const hashedPassword = await bcrypt.hash(password, 10)
        
        let newUser = {...user, password: hashedPassword}
        const role = findUserRole(newUser.email);
        console.log({"The user is a ": role});

        res.status(200).send("Data received")
    }catch(err){
        res.status(500).send({message: "Bad username or password"})
    }
})

const findUserRole = (email) => {
    
    try{
        // const email = data
        Teacher.findOne(email).then((user) => {
            if (user && user.userType === 'teacher' || 'admin'){
                return "teacher"
            }else {
                return "student"
            }
        })
    }catch (err){
        res.status(500).send({message: "Bad username or password"})
    }
}


// Login



// Fetching user data



// Editing an existing user




module.exports = userRouter;