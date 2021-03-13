const router = require('express').Router();
const { getAllContact, createContact,  updateContact, deleteContact, getContactById,} = require('../controller/contactController');


router
     .get('/', getAllContact)
     .post('/', createContact)
     .get('/:id',getContactById)
     .put('/:id', updateContact)
     .delete('/:id', deleteContact);

module.exports = router;