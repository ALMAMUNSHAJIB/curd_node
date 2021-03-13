const { getAllUser, createUser, getUserById, updateUserById, deleteUser,removeUser } = require('../controller/userController');

const router = require('express').Router();


router 
     .get('/', getAllUser )
     .post('/', createUser )
     .get('/delete/:id', removeUser)
     .get('/:id', getUserById )
     .put('/:id', updateUserById )
     //.delete('/:id', deleteUser )
     
     
router

module.exports = router;