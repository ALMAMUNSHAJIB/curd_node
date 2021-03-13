const expressHandler = require('express-async-handler');
const contacts = require('../Contacts');
const User = require('../models/db');


exports.getAllContact = expressHandler(async (req, res) => {

   const user = await User.find();
   res.status(200).json(user);

   // res.json(contacts.getAllContacts());

//    let posts = [
//        { title: "Nodejs", author: "DAW EDIN" },
//        { title: "Java", author: "Jan" },
//        { title: "Python", author: "DAW EDIN" },
//        { title: "C++", author: "DAW EDIN" }
//    ]
//    res.render('pages/index', {
//        user:{
//            name: "mamun"
//        }, 
//        posts
//    })

// let user = new User({
//     name: "mamun",
//     email: "mamun@gmail.com"
// })

// user.save().then(result => {
//     console.log(result);
//     res.json(result)
// }).catch(error => {
//     console.log(error);
//     res.status(500).json({error: 'Error occuerd'})

// })
   

});


exports.createContact = expressHandler(async (req, res) => {

    let {name, email, address} = req.body

    const user = await new User({
        name,
        email,
        address
    })

  user.save()
  .then(result => {
      console.log(result);
      res.status(201).json(result);
  }).catch(e => {
      console.log(e);
      res.status(500).json({message: 'Error data'})
  })
   
});

exports.getContactById = (req, res) => {
    // let {id} = req.params;
    // id = parseInt(id);
    // const contact = contacts.getContactsById(id)
    // res.json(contact)

    let {id} = req.params;
    User.findById(id)
          .then(user => {
              res.json(user)
          }).catch(e => {
              console.log(e);
              res.status(500).json({message: 'Data occurd'})
          })

};


exports.updateContact = expressHandler(async(req, res) => {

    let {name, email, address} = req.body;
    let { id } = req.params;

    const user = await User.findOneAndUpdate({_id: id}, {
        $set: {
            name,
            email,
            address
        }
        
    }, {
        new: true
    })

    user.save().then(user => {
        res.json(user)
    }).catch(e => {
        console.log(e);
        res.status(500).json({message: 'Data updated unsuccess!!'})
    })

    // const { id } = req.params;
    // id = parseInt(id);

    // const { name, email, phone } = req.body;

    // const contact = contacts.updateContact(id, {
    //     name,
    //     email,
    //     phone
    // })
});

exports.deleteContact = (req, res) => {

    let {id} = req.params;
     User.findOneAndDelete({_id: id})
          .then(user => {
              console.log(user);
              res.json(user)
          }).catch(e => {
              console.log(e);
          })

    // const { id } = req.params
    // id = parseInt(id);

    // const contact = contacts.deleteContact(id);

    // res.status(200).json({ message: 'Delete success', contact })
}