const User = require('../models/user')
const { genSalt, hash } = require('bcryptjs')

seedAdmin = () => {
    User.findOne({ role: 'admin' }, (error, admin) => {
        if (error) throw error

        if (admin) return 'Admin account exists'

        User.create({
            firstName: 'Library',
            lastName: 'Admin',
            username: 'admin',
            role: 'admin'
        }, (error, user) => {
            if (error) throw error

            genSalt(10, (error, salt) => {
                if (error) throw error

                hash('admin123', salt, (error, hash) => {
                    if (error) throw error

                    user.password = hash

                    user.save((error, savedUser) => {
                        if (error) throw error

                        return 'Admin account created'
                    })
                })
            })
        })
    })
} 

module.exports = seedAdmin