const expressAsynHandler = require('express-async-handler');
const User = require('../models/user');



exports.getAllUser = expressAsynHandler(async(req, res) => {
    const users = await User.find();
    // res.status(200).json(user)
       res.render('index', {users, error: {} })

});

exports.createUser = expressAsynHandler(async(req, res) => { 
   let {name, age, email, id} = req.body;

   let error = {};

   if(!name){
       error.name = 'Please provide your name'
   }
   if(!age){
       error.age = 'Please provide your age'
   }
   if(!email){
       error.email = 'Please provide your email'
   }

   let isError = Object.keys(error).length > 0 ;
   
   if(isError){
      await  User.find()
          .then(users => {
             return res.render('index', {users, error})
          })
          .catch(error => {
              console.log(error);
             return  res.status(500).json({message: 'Error occoured from post'})
          })

   }

   if(id){
         User.findOneAndUpdate({_id: id}, {
             $set: {
                 name,
                 age, 
                 email
             }
         }).then(() => {
                User.find()
                .then(users => {
                    res.render('index', {users, error: {}})
                })
         }).catch(e => {
             console.log(e)
         })
   }else{
    let user = await new User({
        name,
        age,
        email 
    });
    user.save()
      .then(users => {
          //console.log(user);
         // res.status(201).json({message: 'User created!!', user})
         User.find()
            .then(users => {
             return res.render('index', {users, error: {}})
            })
        
      }).catch(e => {
          console.log(e);
         return  res.status(500).json({error: 'Error data'})
      });
   }


// //    console.log(error, isError);
// //    return
    
//    let user = await new User({
//        name,
//        age,
//        email 
//    });
//    user.save()
//      .then(users => {
//          //console.log(user);
//         // res.status(201).json({message: 'User created!!', user})
//         User.find()
//            .then(users => {
//             return res.render('index', {users, error: {}})
//            })
       
//      }).catch(e => {
//          console.log(e);
//         return  res.status(500).json({error: 'Error data'})
//      });

});


exports.getUserById = expressAsynHandler(async(req, res) => {
    let { id } = req.params;

     await User.findById(id)
      .then(users => {
         console.log(users);
       return  res.status(200).json(user);
     }).catch(e => {
         console.log(e);
         res.status(500).json({error: 'Error occured!'})
     })

});


exports.updateUserById = expressAsynHandler(async(req, res) => {
   let {name, age, email } = req.body;
   let { id } = req.params;

 const user =  await User.findOneAndUpdate({_id: id}, {
       name,
       age,
       email
   }, {
       new: true
   });
   user.save().then(users => {
       console.log(users);
       res.status(200).json({message: 'Update Success', users})
   }).catch(e => {
       console.log(e);
       res.status(500).json({message: 'Error occured'})
   })
});


exports.deleteUser = expressAsynHandler(async(req, res) => {
    let { id } = req.params;
    await User.findOneAndDelete({_id: id})
      .then(users => {
          console.log(users);
          res.status(200).json({message: 'Delete Success', users})
    }).catch(e => {
        console.log(e);
        res.status(500).json({error: 'Error occured!!'})
    })
});


exports.removeUser= expressAsynHandler(async(req, res) => {
    let { id } = req.params;
    await User.findOneAndDelete({ _id: id })
         .then(() => {
                User.find()
                   .then(users => {
                     res.render('index', {users, error: {}})
                })
         })
         
         .catch(e => {
             console.log(e);
              res.status(500).json({error: 'Error delete'})
         })
})