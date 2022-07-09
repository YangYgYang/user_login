//==========setting server
const express = require('express')
const app = express()
const port = 3000


//==========router
app.get('/', (req, res) => {
    res.send('login server is open')
})



app.listen(port, () => { console.log(`Express is running on http://localhost:${port}`) })