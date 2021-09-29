const User = require('../models/user')
const { genSalt, hash, compareSync } = require('bcryptjs')
const { createToken } = require('../services/jwtService')

registerUser = (req, res) => {

    User.findOne({ username: req.body.username }, (error, exuser) => {
        if (error) return res.status(500).json(error)

        if (exuser) return res.status(400).json({ message: 'User with this username exists' })

        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
        }, (error, newUser) => {

            if (error) return res.status(500).json({ error })

            // Hash password
            genSalt(10, (error, salt) => {
                if (error) return res.status(500).json({ error })

                console.log(salt)

                hash(req.body.password, salt, (error, hashedPassword) => {
                    if (error) return res.status(500).json({ error })

                    newUser.password = hashedPassword
                    newUser.save((error, savedUser) => {
                        if (error) return res.status(500).json({ error })

                        let token = createToken(newUser)

                        if (!token) return res.status(500).json({ message: 'Unable to Authenticate'})
                        
                        return res.status(200).json({
                            message: 'User Registration successful',
                            token
                        })
                    })
                })
            })
            
        })
    })
}


loginUser = (req, res) => {

    User.findOne( {username: req.body.username }, (error, foundUser) => {
        if (error) return res.status(500).json(error)
        
        if (!foundUser) return res.status(401).json({ message: 'Incorrect Username || Username does not exist' })
        
        let match = compareSync(req.body.password, foundUser.password)

        if (!match) return res.status(401).json({ message: 'Incorrect Password' })
        
        let token = createToken(foundUser)

        if (!token) return res.status(500).json({ message: 'Unable to Authenticate'})
        
        return res.status(200).json({ message: 'User logged in', token })
        // return res.status(200).json({ match })

    })
}

module.exports = { registerUser, loginUser  }