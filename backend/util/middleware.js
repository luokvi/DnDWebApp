const errorHandler = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError'){
        res.status(401).json({ error: 'Invalid Token' })
        return
    } 
    else if (error.name === 'TokenExpiredError'){
        res.status(401).json({ error: 'Token Expired' })
        return
    }
    else if (error.name === 'ValidationError'){
        res.status(400).json({ error: 'Invalid schema'})
    }

    next(error)
}

module.exports = { errorHandler }