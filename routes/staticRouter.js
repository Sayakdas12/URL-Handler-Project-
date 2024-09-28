const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get('/', async (req,res) => {
    const allUrls = await URL.find({})  // Show the all ure what i alredy created.
    return res.render('home', {
        urls: allUrls,
    });
});


router.get('/signup', (req, res) => {
   return res.render('signup');
});

module.exports = router;
