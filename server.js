const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const appRouter = require('./routers/appRouter');

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use('/api', appRouter)


const PORT = 6000;

app.get((req, res) => {
    res.send('<h1>SO IT BEGINS</h1>')
})

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('DB connected!')
    })
    .catch((error) => {
        console.log(error)
    })

app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}`)
})