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


//==========router
app.get('/', (req, res) => {
    res.render('index')
})



app.listen(port, () => { console.log(`Express is running on http://localhost:${port}`) })