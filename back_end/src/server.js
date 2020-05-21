const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dataRoute = require("./routes/data-route.js")
const userRoute = require("./routes/user-route.js")
const moduleRoute = require("./routes/module-route.js")
const vinhaRoute = require("./routes/vinha-route.js")
const vinhaUserRoute = require("./routes/vinhaUser-route.js")

const app = express();

app.use(bodyParser.json());
app.use(cors ());

app.use('/data', dataRoute);
app.use('/user', userRoute);
app.use('/module', moduleRoute);
app.use('/vinha', vinhaRoute);
app.use('/vinhauser', vinhaUserRoute);

const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})