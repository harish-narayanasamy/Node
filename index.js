const express = require("express");
const app = express();



app.get("/rate",(req,res) =>{

res.status(500).send("Server Down !!!")


})
app.get("/", (req, res) => {
    res.status(200).send("Node Server running !!!");
});

app.get("/price", (req, res) => {
    res.status(200).send("Get Prices !!!");
});
app.listen(3000, () => console.log("Listening on Port"))



module.exports = app;