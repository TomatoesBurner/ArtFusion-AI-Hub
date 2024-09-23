// Retrieved from ChatGPT and modified
// Date: 23/09/2024
const joiValidate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (error) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: error.details.map((err) => ({
                    name: err.path.join("."),
                    message: err.message,
                })),
            });
        }

        next();
    };
};

const reqDataValidate = joiValidate;

module.exports = {
    reqDataValidate,
};
