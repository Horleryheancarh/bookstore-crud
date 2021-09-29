const { decodeToken } = require('../services/jwtService')


authenticateUser = (req, res, next) => {
    // Check authorization token
    if (!req.headers.authorization) return res.status(401).json({ message: 'Authorization required' })

    let authHeader = req.headers.authorization.split(' ')

    if (authHeader[0] !== 'Bearer') return res.status(401).json({ message: 'Authorization format not accepted'})

    let token = authHeader[1]
    
    req.user = decodeToken(token)
    
    next()
}

checkIfAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(401).json({ message: 'Unauthorized Access' })

    next()
}


module.exports = { authenticateUser, checkIfAdmin }