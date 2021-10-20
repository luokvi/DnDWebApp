const jwt = require('jsonwebtoken')

const checkToken = ( req, userId ) => {
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