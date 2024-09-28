const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Missing required field: url" });
      
      const shortID = shortid();
 
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });


    return res.render("home",{
        id: shortID,
    });
    // return res.json({ shortId: shortID });
}

async function handleGetAnalytics(req, res){
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortId: shortID });
    return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
    });
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}


// const Url = require('../models/url');
// const shortid = require('shortid');

// exports.handleGenerateNewShortURL = async (req, res) => {
//   const { longURL } = req.body;

//   // Generate a unique short ID
//   const shortID = shortid.generate();

//   try {
//     // Check if the long URL already exists in the database
//     const existingUrl = await Url.findOne({ longURL });

//     if (existingUrl) {
//       // If the long URL already exists, return the existing short URL
//       return res.status(200).json({ shortURL: existingUrl.shortURL });
//     }

//     // If the long URL does not exist, create a new URL document
//     const newUrl = new Url({ longURL, shortURL: shortID });
//     await newUrl.save();

//     // Return the new short URL
//     res.status(201).json({ shortURL: newUrl.shortURL });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while generating a new short URL' });
//   }
// };