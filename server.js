const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const frontendUrl = 'http://localhost:3000';


const appRouter = require('./routers/appRouter');

const app = express();
app.use(cors({
    credentials: true,
    origin: `${frontendUrl}`
}));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(morgan('tiny'));
app.use('/api', appRouter)

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

const PORT = 4000 || process.env.PORT;

// app.get((req, res) => {
//     res.send('<h1>SO IT BEGINS</h1>')
// })

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=>{
        console.log('DB connected!')
    })
    .catch((error) => {
        console.log(error)
    })

app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}`)
})