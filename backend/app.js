/*****************************************************
 *                 BACKEND INITIALIZATION
 *       Setting up core configurations and routes
 *****************************************************/
const express =require('express')
const morgan =require('morgan')
const app = express();

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
//               ROUTE HANDLING
// ***************************************************


// ***************************************************
//               ROUTES
// ***************************************************


// ***************************************************
//              SERVER STARTUP
// ***************************************************
app.listen(3000,()=>{
    console.log(`App running on port ${port}...`)
});