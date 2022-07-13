const mongoose = require('mongoose')
mongoose.connect(process.env.USERID_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('MONGODB Error')
})
db.once('open', () => {
    console.log('MONGODB is connect')
})

module.exports = db