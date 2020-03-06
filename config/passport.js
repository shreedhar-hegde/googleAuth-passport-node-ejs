const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('../keys')



const User = require('../models/user')


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.clientID,
    clientSecret: keys.clientSecret
}, (accessToken, refreshToken, profile, done) => {
        // console.log('call back fired ', profile)
        User.findOne({googleId: profile.id})
        .then((currentUser) => {
            if(currentUser) {
                console.log('current',currentUser)
                done(null, currentUser)
            } else {
                new User({
                    name: profile.displayName,
                    googleId: profile.id
                }) .save().then((newUser) => {
                    console.log('user created', newUser)
                done(null, newUser)

                })
            }
        })
        
    })
)