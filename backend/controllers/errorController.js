const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
    const value = err.value.name;
    const message = `Duplicate field value: /name: ${value}/. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('.         ')}`;
    return new AppError(message, 400);
};
const sendErrorDev = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
}
const sendErrorProd = (err, req, res) => {
    // a) API
    if (req.originalUrl.startsWith('/api')) {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        // Programming or other unknow error: don't leak error details
        // 1) Log error
        console.error('ERROR!!', err);
        // 2) Send genric message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong! (in production)'
        });
    }
    // b) render website
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        });
        // Programming or other unknow error: don't leak error details
    }
    // 1) Log error
    console.error('ERROR!!', err);
    // 2) Send genric message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'please try again later'
    });
};

module.exports = (err, req, res, next)=>{

    err.statusCode = err.statusCode || 500;
    err.status =err.status || 'error';

    if(process.env.NODE_ENV ==='development'){
        sendErrorDev(err,req,res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;
        if(error.name ==='CastError')error = handleCastErrorDB(error)
        if(error.code ===11000) error = handleDuplicateFieldsDB(error)
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        sendErrorProd(error, req, res);
    }
}