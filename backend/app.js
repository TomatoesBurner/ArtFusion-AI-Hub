/*****************************************************
 *                 BACKEND INITIALIZATION
 *       Setting up core configurations and routes
 *****************************************************/
const express =require('express')
const morgan =require('morgan')
const app = express();


const userRouter = require('./routers/userRoutes') //user
const imageRoutes = require('./routers/imageRoutes'); //text to image api 

// ***************************************************
//               MIDDLEWARE SETUP
// ***************************************************
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Body parser, reading data from body into req.body
app.use(express.json());
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

// ***************************************************
//              ROUTES
// ***************************************************
app.use('/api/v1/users', userRouter)

// Text to image API
app.use('/api/text_to_image', imageRoutes);

module.exports =app;

app.get('/', (req, res) => {
    res.send('Welcome to the backend of this project cits5206!');
  });
  