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
const User = require('./models/userinfo')


//==========router
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/log_in', (req, res) => {
    const getMemberInfo = req.body
    const getMemberId = req.body.user_id
    const getMemberPsw = req.body.password
    User.find({ user_id: getMemberId })
        .lean()
        .then((memberdata) => {
            if (memberdata.length === 0 || memberdata[0].password !== getMemberPsw) {
                console.log("帳號或密碼錯誤")
                res.render('index', { message: '帳號或密碼錯誤' })
            } else if (memberdata[0].password === getMemberPsw) {
                console.log('該登入了吧')
                res.render('sheets')
            }
        })
        .catch(error => console.log('error', error))
})

app.get('/sign_up', (req, res) => {
    res.render('sign_up')
})

app.post('/sign_up', (req, res) => {
    const memberInfo = req.body
    const memberId = req.body.user_id
    console.log(memberId)
    User.find({ user_id: memberId })
        .lean()
        .then((memberdata) => {
            console.log("進then", memberdata, memberId)
            if (memberdata.length === 0) {
                User.create(memberInfo)
                res.render('index')
            } else {
                console.log("重複了")
                res.render('sign_up', { message: '重複了' })
            }
        })
        .catch(error => console.log('error', error))
})



app.listen(port, () => { console.log(`Express is running on http://localhost:${port}`) })