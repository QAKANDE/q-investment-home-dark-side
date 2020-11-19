const validation = require("express-validation")

const errorHandler = (err, req, res, next) => {
    
    if (err instanceof validation.ValidationError) {
        return res.status(err.status).json({error : err})
    }

    res.locals.message = err.message
    res.status(err.status || 500 ).json({ error : err})

}

module.exports = {errorHandler}