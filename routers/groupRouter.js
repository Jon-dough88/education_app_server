const express = require('express');
const groupRouter = express.Router();

const Teacher = require('../models/teacherSchema');
const Group =  require('../models/Group');





// Fetching all existing groups of a certain teacher


groupRouter.post('/fetchAll/userId', async(req, res) => {
    // groupRouter.post('/fetchAll', async(req, res) => { 

    try{

        // const refreshToken = req.cookies.refreshToken
        // const {userId} = req.body;

    
        const {userId} = req.params;
        
        // const [teacherUsername] = userName
        console.log(`The teacher's ID is: ${userId}`)

        // await Teacher.find(userName).then(result => {
        await Teacher.find(userId, {groups: 1}).then(result => {    
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
        console.log(groupId);

        await Group.find(groupId)
            .then(response => {
                console.log(response)   
                res.status(200).send(response)
            }).catch(err => {
                console.log(err);
                res.status(404).send(err)
            })

        // res.status(200).send('Group page GO!')
    } catch (error) {
        console.log(error)
    }
})


// Checking whether a group's name already exists

groupRouter.post('/findGroup', async (req, res) => {

    try {
        const {userId, groupName} = req.body;
        console.log(`User ID is: ${userId}. The group name is: ${groupName}`);

        await Teacher.find({_id: userId}).then((result) => {
            const [user] = result;
            // console.log(`User's groups: ${user.groups}`);
            
            user.groups.filter((groups) => {
                // if(groupName == ""){
                //     return groups
                if (groups.groupName.toLowerCase() === groupName.toLowerCase()){
                    console.log("Name exists!")
                    res.send({message: "Group name taken!", success: true})
                }else{
                    console.log("Name doesn't exist!")
                    res.send({message: "Group name free!", success: false})
                }
            })
            // for (let i = 0; i < user.groups.length; i++){

            //     if(user.groups[i].groupName.toLowerCase() === groupName){
            //         console.log("Name exists!")
            //         res.status(400).send({message: "Group name taken!", groupNameExists: true})
    
            //     }else{
            //         console.log("Name doesn't exist")
            //         res.status(200).send({message: "Group name doesn't exist", groupNameExists: false})
            //     } 
            // }
            
            
        })


    }catch(error){
        console.log(error)
    }
})


// Creating a new group

groupRouter.post('/createGroup', async (req, res) => {

    try {

        console.log(req.body)
        // const values = req.body;
        console.log(`Group name: ${req.body.values.groupName}. User ID: ${req.body.userId}`);
        const {userId} = req.body;
        
        // const newGroupData = {};
        // newGroupData.groupName = req.body.groupName;
        // newGroupData.groupLevel = req.body.groupLevel;
        // console.log(`Group name: ${newGroupData.groupName}. Group level: ${newGroupData.groupLevel}`);

        let newGroup = new Group({
            groupName: req.body.values.groupName,
            groupLevel: req.body.values.groupLevel,
            groupActive: true,
        });

        await Teacher.updateOne({_id: userId}, {
            $push: {
                "groups": { 
                    "groupName": newGroup.groupName,
                    "groupLevel": newGroup.groupLevel,
                    "groupActive": newGroup.groupActive,
                    // "created": $currentDate
                } 
            }
        }).then(() => {
            res.status(200).send({message: `Group ${newGroup.groupName} added to ${userFound.userName}'s group list`, groupData: newGroup})
        }).catch( (err) => {
            console.log(err)
        })
        // await Teacher.findOne({_id: userId})
        // .then((userFound) => {
        //     console.log(`User's data at group creation: ${userFound}`)
        //     // userFound.groups.push(newGroup);
        //     Teacher.updateOne({_id: userFound._id}, { $push: {"groups": newGroup}});
        //     res.send({message: `Group ${newGroup.groupName} added to ${userFound.userName}'s group list`, groupData: newGroup})
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        await newGroup.save();
      

        console.log(`The new group just created is: ${newGroup}`);

        // res.status(200).send(
        //     {message: "New group created!", 
        //     groupData: newGroup
        // })

    } catch (error) {
        console.log(error)
    }
})

// const addingGroup = async (req, res) => {

//     await Teacher.findOne({_id: userId})
//                 .then((userFound) => {
//                     // console.log(`User's data at group creation: ${userFound}`)
//                     userFound.groups.push(newGroup);
//                     await Teacher.updateOne({_id: userFound._id}, { $set: userFound});
//                     res.send({message: `Group ${newGroup.groupName} added to ${userFound.userName}'s group list`})
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })

// }

// Editing a group's details


// Searching for a student's name

groupRouter.post('/fetchStudentList', async (req, res) => {
    
    try {
        const {userId, userName} = req.body;
        console.log(`User ID: ${userId}. Student name: ${userName}`);

        // await Teacher.find({_id: userId}, 
        //     {"groups": {"$elemMatch": {"students": {"$in": ["groups"]} } }})
        //     .then(result => {
        //         console.log(`Student list: ${result}`);
        //     })


        // await Teacher.find({_id: userId }, {_id: 0, groups: 1})
        // .then(result => {
        //             // const [groups] = result;
        //             // console.log(groups);
        //             // console.log(groups);
        //             // console.log(`Student list: ${result}`);
        //             // const {studentList} = groups;
        //             // console.log(studentList)
        //             // console.log(`Student list: ${studentList}`);
        //             console.log(result);
        //     })

        const user = {userName: `${userName}`};
        console.log(user);

        await Teacher.aggregate([
            // {'$unwind': '$groups'},
            // {'$unwind': '$groups.students'},
            // {'$unwind': '$groups.students'}
            { '$match': user },
            // {'$group': {
            //             _id: '$groups.students'
            //             }},
            {'$project': {'students': '$groups.students'}},
            
        ]).then(result => {
                    const [studentList] = result;
                    console.log(studentList);
                    res.status(200).send(studentList);
            })


        // await Teacher.find({_id: userId}, {_id: 0, groups: 1})
        //     .then(result => {
        //         // console.log(result)
        //         console.log(result);
                
        //     })


    } catch (error) {
        console.log(error)
    }

})



// Adding a student



// Removing a student



// Adding group history item



// Adding recommended



// Adding saved item



// Group notifications


module.exports = groupRouter;