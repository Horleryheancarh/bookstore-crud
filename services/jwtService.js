const { sign, verify } = require('jsonwebtoken')


createToken = (user) => {
    try {
        let token = sign({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY })

        return token
    } catch (error) {
        console.log(error)
        return null
    }
}

decodeToken = (token) => {
    try {
        let decodedToken = verify(token, process.env.JWT_SECRET)
        return decodedToken
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = { createToken, decodeToken }