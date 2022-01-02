const jwt = require('jsonwebtoken')
const TokenBlacklist = require('../models/tokenBlacklist')

const checkToken = ( async ( req, userId ) => {
    const auth = req.get('authorization')
    
    // Debug.
    console.log("Authorization: ")
    console.log(auth)
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
    // Debug.
    console.log(token)

    // Check that token is not on the blacklist.
    const blacklisted = await TokenBlacklist.findOne({ token: token.toLowerCase() })
    if (blacklisted !== null){
        return [false, {error: 'Wrong Token'}]
    }

    const decoded = jwt.verify(token, process.env.TOKENSECRET)
    // Debug.
    console.log(decoded)
    // Check that found an user matching token
    if (!decoded.id){
        return [false, {error: 'Invalid'}]
    }

    // Check that found user is the user we want to authorize
    if(decoded.id !== userId){
        return [false, {error: 'Wrong Token'}]
    }

    // Debug.
    console.log("Authorization succesfull")
    return [true, {}]
})

exports.checkToken = checkToken