const express = require("express");
const router =express.Router();

router.get("/", (req, res) => {

    res.render('index',{title:"App",message:"Hello"})
   // res.status(200).send("Node Server running !!!");
});

module.exports=router;