import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("router works");
     res.send("Test route is working!"); //Send a response
});


// router.post("/test", (req, res) => {
//     console.log("router works");
//     //  res.send("Test route is working!"); //Send a response
// });

// router.put("/test", (req, res) => {
//     console.log("router works");
//      res.send("Test route is working!"); //Send a response
// });

// router.delete("/test", (req, res) => {
//     console.log("router works");
//      res.send("Test route is working!"); //Send a response
// });


export default router;
