const express = require('express');
const groupRouter = express.Router();

const Teacher = require('../models/teacherSchema');
// const Group = require('')

// Fetching all existing groups of a certain teacher

groupRouter.post('/fetch', async(req, res) => {
    
    try{
        const userId = req.body;
        
        
        // const [teacherUsername] = userName
        console.log(`The teacher's user id is: ${userId}`)

        // await Teacher.find(userName).then(result => {
        await Teacher.findById({_id: userId}).then(result => {    
            console.log(`Result: ${result}`)
            // res.status(200).send(result)
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