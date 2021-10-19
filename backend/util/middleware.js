const errorHandler = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError'){
        res.status(401).json({ error: 'Invalid Token' })
        return
    }

    next(error)
}

module.exports = { errorHandler }