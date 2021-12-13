// The old try-catch block for finding users in various collections.

 
    


    // try{
    //     await Teacher.find({userName}).then((userData) => {
            
    //         const [user] = userData;
    //         console.log({"The user's data: ": user })

    //         if (user && user.userType === 'teacher' || 'admin'){
    //             console.log(`User ${userName} is a teacher!`)
    //             passwordCheck(user, loginPassword, res) 

    //         }
    //          else if(user.userType === 'student'){
    //              Student.find(user.userName).then((user) => {
    //                  if(user && user.userType === 'student') {
    //                      console.log(`User ${userName} is a student!`)
    //                      passwordCheck(user, password, res)  
    //                  }
    //              })
            
    //         }
    //         else {
    //             return res.status(400).json({message: "Username or password failed"})
    //         }
    //     })
    //     .catch(error => {
    //         console.log({"Error": error})
    //         return res(400).json({message: "Bad username or password"})
    //     })
    // }catch(error){
    //     console.log(error)
    // }