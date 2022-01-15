const express = require('express');
const groupRouter = express.Router();

const Teacher = require('../models/teacherSchema');
const { authenticateRefreshToken } = require('../authentication/authenticateToken');


// Fetching user data

groupRouter.post('/fetchUser', async (req, res) => {
    try {
        let refreshToken = req.cookies.refreshToken;

    } catch (error) {
        
    }
})

// Fetching all existing groups of a certain teacher

// groupRouter.post('/fetchAll', async(req, res) => {
groupRouter.post('/fetchAll/:userId', async(req, res) => {
    
    try{
        // const userId = req.body;
        const {userId} = req.params;
        
        // const [teacherUsername] = userName
        console.log(`The teacher's user id is: ${userId}`)

        // await Teacher.find(userName).then(result => {
        await Teacher.findById(userId, {groups: 1}).then(result => {    
            console.log(`Result: ${result}`)
            res.status(200).send(result)
        }).catch(err => {
            console.log(err);
            res.status(404).send({err, "message": "No groups found"})
        })
        // res.status(200).send("This works")

    }catch(err){
        console.log(err)
    }
   
})

// Creating a new group


// Editing a group's details


// Searching for a student's name



// Adding a student



// Removing a student



// Adding group history item



// Adding recommended



// Adding saved item



// Group notifications


module.exports = groupRouter;