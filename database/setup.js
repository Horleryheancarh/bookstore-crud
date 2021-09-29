const { connect } = require('mongoose')

module.exports = () => {
    connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Database connection successful")
        }
    })
}