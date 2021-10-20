const errorHandler = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError'){
        res.status(401).json({ error: 'Invalid Token' })
        return
    } 
    else if (error.name === 'TokenExpiredError'){
        res.status(401).json({ error: 'Token Expired' })
        return
    }

    next(error)
}

module.exports = { errorHandler }