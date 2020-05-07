const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dataRoute = require("./routes/data-route.js")
const userRoute = require("./routes/user-route.js")
const moduleRoute = require("./routes/module-route.js")
const vinhaRoute = require("./routes/vinha-route.js")

const app = express();

app.use(bodyParser.json());
app.use(cors ());

app.use('/home', (req,res)=>res.send('Hello'));
app.use('/data', dataRoute);
app.use('/user', userRoute);
app.use('/module', moduleRoute);
app.use('/vinha', vinhaRoute);

const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})