const express = require("express");
const path = require("path");
const { connectToMongoDB } = require('./connect');
const URL = require("./models/url"); 

const urlRoute = require("./routes/url1");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user1")

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB Connected") );




app.set('view engine', 'ejs'); // ejs is a server side rendering engine helps to write down the html code 
app.set("views", path.resolve("./views"));  // it help to give a location where is your file save



app.use(express.json());   // middle ware (for json)
app.use(express.urlencoded({extended: false})); //  form data sabmit ar jono use hoy 



// app.get('/test', async (req, res) => {

//     try {
//         const allUrls = await URL.find({});
//         res.send(`
//             <html>
//             <head></head>
//             <body>
//             <ol>
//             ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
//             </ol>
//             </body>
//             </html>
//         `);
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });


// Router ..
app.use("/", staticRoute);
app.use("/url", urlRoute); 
app.use("/user", userRoute);


// app.get("/:shortId", async (req, res) =>{
//     const shortId = req.params.shortId;
//   const entry =  await URL.findByIdAndUpdate({
//          shortId
//     },{
//         $push: {
//             visitHistory: {
//                 timestamps: Date.now(),
//             },
//         },

//     });
//     res.redirect(entry.redirectURL);
// });

app.get("/url/:shortId", async (req, res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    if (entry) {
        entry.visitHistory.push({ timestamps: Date.now() });
        await entry.save();
        res.redirect(entry.redirectURL);
    } else {
        res.status(404).send("Not found");
    }
});








// app.get("/test", async (req, res) =>{
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls: allUrls,
//     });
      
//     });

    
 app.listen(PORT, ()=> console.log(`Server Started at PORT:${PORT}`));