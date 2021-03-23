const { Strategy, ExtractJwt } = require('passport-jwt')

const { APP_SECRET } = require('../config')
const queries = require('../api/auth/queries')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_SECRET,
}

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await queries
        .getUserById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(() => {
          return done(null, false)
        })
    })
  )
}
