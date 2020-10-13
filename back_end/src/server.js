const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dataRoute = require("./routes/data-route.js")
const userRoute = require("./routes/user-route.js")
const moduleRoute = require("./routes/module-route.js")
const vinhaRoute = require("./routes/vinha-route.js")
const vinhaUserRoute = require("./routes/vinhaUser-route.js")
const calcRoute = require("./routes/Calc-route.js")
const excelRoute = require("./routes/excel-route.js")
const avisosRoute = require("./routes/avisos-route")
const riscosRoute = require("./routes/riscos-route")
const app = express();

app.use(bodyParser.json());
app.use(cors ());

app.use('/avisos', avisosRoute);
app.use('/data', dataRoute);
app.use('/user', userRoute);
app.use('/module', moduleRoute);
app.use('/vinha', vinhaRoute);
app.use('/vinhauser', vinhaUserRoute);
app.use('/calc', calcRoute);
app.use('/excel', excelRoute);
app.use('/risco', riscosRoute);

const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})