const { config } = require('../config')
const passport = require('passport')
const json_strategy = require('passport-json').Strategy
const jwt_strategy = require('passport-jwt').Strategy
const extract_jwt = require('passport-jwt').ExtractJwt
const User = require('../models/user.model')
const logger = require('../winston')

passport.use('login',
	new json_strategy({
		usernameProp: 'username',
		passwordProp: 'password',
	},
	(username,password,done) => {
		User.findOne({
			where: {
				username
			},
		}).then(user => {
			if(user === null) {
				return done(null,false,{
					message: "invalid username",
				})
			} else {
				if(user.password === password){
					logger.info("authenticated user")
					return done(null,user.get({ plain:true }))
				} else {
					return done(null,false,{
						message: "wrong password",
					})
				}
			}
		}).catch((err) => {
			done(err)
		})
	})
)

passport.use('jwt',
	new jwt_strategy({
		jwtFromRequest: extract_jwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: config.jwt_secret_key,
	},
	(jwt_payload,done) => {
		User.findOne({
			where: {
				username: jwt_payload.username
			},
		}).then(user => {
			if(user === null) {
				logger.info("wrong user jwt")
				done(null,false,{
					message: "invalid jwt"
				})
			} else {
				logger.info("authenticated user jwt")
				done(null,user)
			}
		}).catch((err) => {
			done(err)
		})
	})
)