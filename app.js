const express =require('express');
const app= express();
const port =  4000;
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Pet Store" });
});

// router
require('./routes')(app);
app.listen(port, () => console.log(`Listen on port ${port}`)) 
module.exports = app;
