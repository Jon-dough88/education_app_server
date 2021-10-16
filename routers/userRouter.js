const express = require('express');
const bcrypt = require('bcrypt');

const userRouter = express.Router();

const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');

// ****** CRUD operations ******


// Signing up

userRouter.post('/signup', async (req, res) => {

    const values = req.body;
    console.log(`Backend values: ${values}`);

    try{
        // const hashedPassword = await bcrypt.hash(values.password, 10)

        let user = {}
        user.firstName = values.firstName
        user.lastName = values.lastName
        user.userName = values.userName
        user.email = values.email
        user.userType = values.userType

        const hashedPassword = await bcrypt.hash(values.password, 10)
        
        let newUser = {...user, password: hashedPassword}
        const userType = findUserRole(newUser);
        console.log({"The user is a ": userType});

        res.status(200).send("Data received")
    }catch(err){
        res.status(500).send({message: "Bad username or password"})
    }
})

const findUserRole = (user) => {
    
    try{
        const email = user.email
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