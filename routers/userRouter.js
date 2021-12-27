const express = require('express');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userRouter = express.Router();

// Mongoose schema refs
const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');

const authenticateToken  = require('../authentication/authenticateToken');

// A function for creating random strings
const randomString = require('../utils/string');
const studentSchema = require('../models/studentSchema');





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
        // console.log(`The user signing up is called ${loginValues.userName}`)

        findUserByName(loginValues.userName, loginValues.password, res)
        

    } catch (error) {
        console.log(error)
    }
})

const findUserByName = async (userName, loginPassword, res) => {
    try{
        await Teacher.find({userName})
        .then((teacherData) => {
            const [teacher] = teacherData
            // console.log({"Teacher data": teacher})
            console.log(`User ${userName} is a student!`)
            passwordCheck(teacher, loginPassword, res) 

            if(teacherData === null || 'undefined'){
                Student.find({userName}).then((studentData) => {
                     const [student] = studentData;
                    //  console.log({"Student data": student})
                     console.log(`User ${userName} is a student!`)
                      passwordCheck(student, loginPassword, res) 
                })
            }
        })
    }catch(error){
        console.log(error)
        return res(400).json({message: "Bad username or password"})
    }
   
}

// let createAccessToken = (user) => {
//     return jwt.sign({
//         id: user._id,
//         userName: user.userName,
//         userType: user.userType
//     }, 
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: "2min"
//         }    
//     )
// }



const passwordCheck = async (user, password, res) => {

    
        bcrypt.compare(password, user.password, (err, passwordsMatch) => {
            if(err) {
               return res.status(400).json({message: "Wrong username or password"})
            }
            if (passwordsMatch){
                const accessToken = jwt.sign({
                    id: user._id,
                    userName: user.userName,
                    userType: user.userType
                }, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "5min"
                    }    
                );

                const refreshToken = jwt.sign({
                    type: "refresh", 
                }, process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "15min"
                    }
                )

                saveRefreshToken(user, refreshToken, res)
               
                res.cookie('refreshToken', refreshToken, { httpOnly: true })
                res.status(200).send({accessToken: accessToken, 
                       userName: user.userName, 
                       userType: user.userType})

                // return res.status(200)
                // .send({accessToken: accessToken, 
                //        userName: user.userName, 
                //        userType: user.userType})
                
            }else{
                return res.status(400).json({message: "Incorrect username or password!"})
            }
            
        });
   
    
} 

let saveRefreshToken = async (user, refreshToken, res) => {
    try{
        
        // console.log(`The user at the refresh token function is: ${user}`)
        // if(user && user.userType === 'teacher'){
            await Teacher.findByIdAndUpdate({_id: user._id}, {refreshToken: refreshToken}, (err, result) => {
               if(result){
                    // console.log(`Saved teacher data: ${result}`)
                    if(result === null || 'undefined'){
                        Student.findByIdAndUpdate({_id: user._id}, {refreshToken: refreshToken}, (err, result) => {
                            console.log(`Saved student data: ${result}`) 
                        })   
                    }
               }else if(err){
                  console.log(`saveRefreshTokenError: ${err}`)
               }
                // if(err){
                //     res.status(400).send({error: err})
                // }else{
                //     console.log(`Saved teacher data: ${result}`)
                //     // res.status(200).send({message: "Refresh token saved."})
                // }
            })
        // }else if (user.userType === 'student') {
        //     await Student.findByIdAndUpdate({_id: user._id}, {refreshToken: refreshToken}, (err, result) => {
        //         try{
        //             console.log(`Saved teacher data: ${result}`)
        //         }catch(err){
        //             res.status(400).send({error: err})
        //         }
               
        //         // if(err){
        //         //     res.status(400).send({error: err})
        //         // }else{
        //         //     console.log(`Saved student data: ${result}`)
        //         //     // res.status(200).send({message: "Refresh token saved."})
        //         // }
        //     })
        // }
        // res.status(404).send({message: "Refresh token invalid"})
    }catch (err) {
        // res.status(401).send({error: err})
        console.log(err)
    }
}


// Getting a refresh token

userRouter.post('/refreshToken', async (req, res) => {
    try{
        
        // const userName = req.body;
        // console.log(`Username is: ${userName}`)

        let refreshToken = req.cookies.refreshToken;
        // console.log(`The refresh token is: ${refreshToken}`)

    issueNewToken(refreshToken, res)

        //  await Teacher.find({refreshToken: refreshToken}).then((userData) => {
        //     const [user] = userData;
        //     console.log(`The user is: ${user}`);
        //     console.log(`The user's id is: ${user._id}`);

        //     if(user.userType === 'teacher' || 'admin'){
        //         console.log('Teacher found!')
        //     }else if(user.userType === 'student'){
        //         console.log('Student detected!')
        //     }
        // })
        
    }catch(err){
        res.status(404).send({message: "Resource not found."})
    }
}) 


let issueNewToken = async (refreshToken, res) => {

    try {
        await Teacher.find({refreshToken: refreshToken}).then((userData) => {
            const [teacher] = userData;
            // console.log(`The user is: ${teacher}`);
            // console.log(`The user's id is: ${teacher._id}`);

            // if(user.userType === 'teacher' || 'admin'){
                console.log('Teacher found!')
                let newAccessToken = jwt.sign({
                    id: teacher._id,
                    userName: teacher.userName,
                    userType: teacher.userType
                }, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "5min"
                    }    
                )

                let newRefreshToken = jwt.sign({type: "refresh"}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "5min"})
                
                saveRefreshToken(teacher, newRefreshToken, res)
                
                res.cookie('refreshToken', newRefreshToken, {httpOnly: true});
                res.status(200).send({accessToken: newAccessToken, userName: teacher.userName, userType: teacher.userType}  )
            
            if(userData === null || 'undefined'){
                Student.find({refreshToken: refreshToken}).then((studentData) => {
                    const [student] = studentData;
                    let newAccessToken = jwt.sign({
                        id: student._id,
                        userName: student.userName,
                        userType: student.userType
                    }, 
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "5min"
                        }    
                    )
    
                    let newRefreshToken = jwt.sign({type: "refresh"}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "5min"})
                    
                    saveRefreshToken(student, newRefreshToken, res)
                    res.cookie('refreshToken', newRefreshToken, {httpOnly: true});
                    res.status(200).send({accessToken: newAccessToken, userName: student.userName, userType: studentSchema.userType}  )
                })

            }
        })
    }catch(err){
        console.log(err)
    }
}





// Fetching user data

// userRouter.get('/user', authenticateToken, (req, res) => {
//     try{
//         res.send(req.user);

//     }catch(err){
//         res.status(400).json({"Error": err})
//     }
// })


// userRouter.post('/authToken', authenticateToken, (req, res) => {
// userRouter.post('/authToken', (req, res) => {
//     try {
//         const accessToken = req.body;
//         const refreshToken = req.cookies.refreshToken;
//         console.log(`The access token is: ${accessToken}`)
//         console.log(`The refresh token is: ${refreshToken}`)
//         // res.send(req.user);
//     }catch(err) {
//         res.status(403).send({message: "Unauthorized user"})
//     }
// })


// Editing an existing user




module.exports = userRouter;