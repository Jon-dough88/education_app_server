const express = require('express');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


const userRouter = express.Router();

const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');
const randomString = require('../utils/string');




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
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Credentials',true);

        if(newUser.userType === 'teacher') {
            let teacherData = new Teacher(newUser)
            await teacherData.save() 
            res.status(200).send("New teacher added to the system")
        }else if(newUser.userType === 'student'){
            let studentData = new Student(newUser)
            await studentData.save()
            res.status(200).send("New student added to the system")
        }else{
            res.status(400).send("Error: User not created")
        }
        // saveData(newUser)
        
    }catch(err){
        res.status(500).send({err, message: "Bad username or password"})
    }
})


// Login

userRouter.post('/login', async (req, res) => {
    try {
        const loginValues = req.body;
        console.log(loginValues.userName)

        findUserByName(loginValues.userName, loginValues.password, res)
        

    } catch (error) {
        console.log(error)
    }
})

const findUserByName = async (userName, loginPassword, res) => {
    try{
        await Teacher.find({userName}).then((userData) => {
            
            const [user] = userData;

            if (user && user.userType === 'teacher' || 'admin'){
                console.log(`User ${userName} is a teacher!`)
                passwordCheck(user, loginPassword, res) 

            }else if(user && user.userType === 'student'){
                Student.find(userName).then((user) => {
                    if(user && user.userType === 'student') {
                        console.log(`User ${userName} is a student!`)
                        passwordCheck(user, password, res)  
                    }
                })
            }else{
                return res.status(400).json({message: "Username or password failed"})
            }
        })
        .catch(error => {
            console.log(error)
            return res(400).json({message: "Bad username or password"})
        })
    }catch(error){
        console.log(error)
    }
}

const passwordCheck = async (user, password, res) => {

        // console.log({"Request password: ": password})
        // console.log(user.password)
    
        bcrypt.compare(password, user.password, (err, passwordsMatch) => {
            if(err) {
               return res.status(400).json({message: "Wrong username or password"})
            }
            if (passwordsMatch){
                const token = jwt.sign({
                    id: user._id,
                    userName: user.userName,
                    userType: user.userType
                }, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "30min"
                    }    
                )
                return res.status(200).json({message: `User ${user.userName} is now logged in!`, token: token, userName: user.userName, userType: user.userType})
            }
            return res.status(400).json({message: "Incorrect username or password!"})
        });
   
    
} 


// Fetching user data



// Editing an existing user




module.exports = userRouter;