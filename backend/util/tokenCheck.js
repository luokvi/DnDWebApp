const jwt = require('jsonwebtoken')
const TokenBlacklist = require('../models/tokenBlacklist')

const checkToken = ( req, userId ) => {
    console.log("Checking auth")
    const auth = req.get('authorization')
    
    // Check that auth starts with 'bearer'
    if (auth){
        const lowerCase = auth.toLowerCase()
        if (!lowerCase.startsWith('bearer ')){
            return [false, {error: 'Misconstructed'}]
        }
    }
    else{
        return [false, {error: 'No token'}]
    }

    const token = auth.substring(7)

    // Check that token is not on the blacklist.
    TokenBlacklist.findOne({ 'token': token }).then(blacklisted => {
        console.log("Blacklisted: " + blacklisted)
        if (blacklisted !== null){
            return [false, {error: 'Wrong Token'}]
        }
    })

    const decoded = jwt.verify(token, process.env.TOKENSECRET)
    // Check that found an user matching token
    if (!decoded.id){
        return [false, {error: 'Invalid'}]
    }

    // Check that found user is the user we want to authorize
    if(decoded.id !== userId){
        return [false, {error: 'Wrong Token'}]
    }

    return [true, {}]
}

exports.checkToken = checkToken