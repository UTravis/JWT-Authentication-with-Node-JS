const express = require('express')
const env = require('dotenv');
const router = require('./routes/web');
const authMiddleware = require('./middleware/authMiddleware');

const app = express()
const port = 3000

env.config();

/**
 * DATABASE MODULE
 */
require('./config/database')

app.listen(port, () => console.log(`App listening to port ${port}`) )

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())


//Route Middleware
app.use('/api/users/', router)

//Protected Routes
app.get('/home', authMiddleware, (req, res) => {
    res.json({
        userID : req.payload.user._id,
        status: "Login Success"
    })
} )