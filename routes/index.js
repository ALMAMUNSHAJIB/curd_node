const { aboutPage, helpPage, homePage } = require('../controller/interfaceController');

const router = require('express').Router();


router
    .get('/about', aboutPage )
    .get('/help', helpPage )
    .get('/home', homePage )


module.exports = router;