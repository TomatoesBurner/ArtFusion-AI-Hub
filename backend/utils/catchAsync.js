//This function is a utility to handle errors in asynchronous route handlers automatically.
// It simplifies error management by ensuring that errors are caught and passed
// to Express's error-handling middleware without needing to manually write try/cat   ch in every async function.
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};