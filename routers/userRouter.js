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
        const hashedPassword = await bcrypt.hash(values.password, 10)

        let user = {}
        user.firstName = values.firstName
        user.lastName = values.lastName
        user.userName = values.userName
        user.email = values.email


        let newUser = {...user, password: hashedPassword}
        res.status(200).send("Data received")
    }catch(err){
        res.status(500).send({message: "Bad username or password"})
    }
})


// Login



// Fetching user data



// Editing an existing user




module.exports = userRouter;