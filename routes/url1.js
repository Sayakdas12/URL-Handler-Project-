const express = require("express");
const {handleGenerateNewShortURL,handleGetAnalytics} = require("../controllers/url2");
const router = express.Router();


router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
 