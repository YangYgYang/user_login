//==========setting server
const express = require('express')
const app = express()
const port = 3000

//==========require handlebars
const exphbs = require('express-handlebars')
app.set('view engine', 'hbs')
const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    defaultLayout: 'main',
    extname: '.hbs'
});
app.engine('hbs', hbs.engine)


//==========中介軟體
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//==========引入 mongoDB
require('./config/mongoose')


//==========router
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    req.params
})

app.get('/views/sign_up', (req, res) => {
    res.render('sign_up')
})

app.post('/views/sign_up', (req, res) => {
    const memberInfo = req.body
    console.log(memberInfo)
    res.render('index')
})



app.listen(port, () => { console.log(`Express is running on http://localhost:${port}`) })