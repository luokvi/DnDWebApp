const jwt = require('jsonwebtoken')
const TokenBlacklist = require('../models/tokenBlacklist')

const checkToken = async ( req, userId ) => {
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

    console.log("type:" +  typeof TokenBlacklist.findOne)
    // Check that token is not on the blacklist.
    const blacklisted = await TokenBlacklist.findOne({ 'token': token })
    console.log("Blacklisted: " + blacklisted)
    if (blacklisted !== null){
        return [false, {error: 'Wrong Token'}]
    }
    console.log("Not blacklisted")

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