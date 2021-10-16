const express = require('express');
const bodyParser = require('body-parser');

// let jsonParser = bodyParser.json();

const bcrypt = require('bcrypt');

const userRouter = express.Router();

const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');

// ****** CRUD operations ******


// Signing up

userRouter.post('/signup', async (req, res) => {

    try{

        const values = req.body;
        // console.log(`Backend values: ${values}`);
        // console.log(values.email)

        let user = {}
        user.firstName = values.firstName
        user.lastName = values.lastName
        user.userName = values.userName
        user.email = values.email
        user.userType = values.userType

        const hashedPassword = await bcrypt.hash(values.password, 10)
        
        let newUser = {...user, password: hashedPassword}
        // const userType = findUserRole(newUser);
        // console.log({"The user is a ": userType});

        console.log(newUser.userType)

        saveData(newUser)
        res.status(200).send("Data has been saved")
    }catch(err){
        res.status(500).send({err, message: "Bad username or password"})
    }
})

const saveData = async (user) => {
    
    try{
      switch (user.userType) {
            case 'teacher' || 'admin':
               let newTeacher = new Teacher(user)
               await newTeacher.save()
              break;
            case 'student':
               let newStudent = new Student(user)
               await newStudent.save()
              break  
            case null:
                return "User unauthorized"
            
          default: 
              break;
      }
    }catch (err){
        res.status(500).send({message: "Bad username or password"})
    }
}


// Login



// Fetching user data



// Editing an existing user




module.exports = userRouter;