const express = require('express')
const authRoutes = require('./routes/auth-route')
const profileRoutes = require('./routes/profile-routes')
const app = express()

const mongoose = require('mongoose')
const cookieSesion = require('cookie-session')

const keys = require('./keys')
const passport = require('passport')

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('db connected')
})
.catch(err => {
    console.log('err',err)
})


app.set('view engine', 'ejs')

app.use(cookieSesion({
    maxAge: 24 * 60 * 60 * 100,
    keys: [keys.session.sessionkey]
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
    res.render('home', {user:req.user})
})



app.listen(3000, () => {
    console.log('server started')
})