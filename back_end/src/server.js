const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

app.use(bodyParser.json());
app.use(cors ());

app.use('/home', (req,res)=>res.send('Hello'));

const port = process.env.port || 3000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})