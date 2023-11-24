const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/route');
const cors = require('cors');
const app = express();

//cors to work with multiple local servers ( 3000 and 5000 )
const corsOptions = {
    origin: 'http://localhost:3000',
    Credential: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

//connecting mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mern-todoDB').then(() => {
    console.log('Connected to react-todoDB')
}).catch(err => console.log(err))

//DECLARATIONS
app.use(express.json())

app.use('/todos', router);
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static("public"))

//methods
// app.get("/", (req, res) => {
//     res.send("hello")
// })

app.listen(5000, function () {
    console.log('listening on port 5000');
});