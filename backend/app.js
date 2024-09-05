/*****************************************************
 *                 BACKEND INITIALIZATION
 *       Setting up core configurations and routes
 *****************************************************/
const express =require('express')
const morgan =require('morgan')
const app = express();

const userRouter = require('./routers/userRoutes') //user

// ***************************************************
//               MIDDLEWARE SETUP
// ***************************************************

// Body parser, reading data from body into req.body
app.use(morgan('dev'))
app.use(express.json());
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

// ***************************************************
//              ROUTES
// ***************************************************
app.use('/api/v1/users', userRouter)

module.exports =app;

