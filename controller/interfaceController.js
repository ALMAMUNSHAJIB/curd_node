exports.homePage = (req, res) => {
    
    res.render('pages/home');
};


exports.helpPage = (req, res) => {
    res.render('pages/help')
};


exports.aboutPage = (req, res) => {
    res.render('pages/about')
};