/*****************************************************
 *                 BACKEND INITIALIZATION
 *       Setting up core configurations and routes
 *****************************************************/
const express =require('express')
const morgan =require('morgan')
const app = express();

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routers/userRoutes') //user
const textToImageApiRoutes = require('./routers/textToImageApiRoutes'); //text to image api 

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
// app.use('/api/v1/image-prompt', imageRoutes); //// Text to image API
// Text to image API
app.use('/api/v1/image-prompt', textToImageApiRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//global error handling middleware
app.use(globalErrorHandler);


module.exports =app;

app.get('/', (req, res) => {
    res.send('Welcome to the backend of this project cits5206!');
  });
  