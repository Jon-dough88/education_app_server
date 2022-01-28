const express = require('express');
const groupRouter = express.Router();

const Teacher = require('../models/teacherSchema');





// Fetching all existing groups of a certain teacher


groupRouter.post('/fetchAll/:userId', async(req, res) => {
    // groupRouter.post('/fetchAll', async(req, res) => { 

    try{
        // const {userId} = req.body;

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


groupRouter.post('/groupPages', async (req, res) => {
    try {
        const groupId = req.body;
        console.log(`The group's ID is: ${groupId}`)

        await Teacher.find(groupId)
            .then(response => {
                res.status(200).send(response)
            }).catch(err => {
                console.log(err);
                res.status(404).send(err)
            })

        res.status(200).send('Group page GO!')
    } catch (error) {
        console.log(error)
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