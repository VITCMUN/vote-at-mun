const express = require('express')
const router = express.Router()
const passport = require("passport")
const logger = require('../winston')
const jwt = require('jsonwebtoken')
const { config } = require('../config')

router.post('/login', function(req,res,next){
	passport.authenticate('login',{ session: false }, function(err,user,info){
		if(err){
			logger.error(err.message)
			return next(err)
		} else if (!user) {
			return res.status(403).json(info)
		} else {
			req.logIn(user,{ session : false }, (err) => {
				if(err){
					logger.error(err.message)
					return next(err)
				} else {
					const token = jwt.sign({username: user.username},config.jwt_secret_key)
					return res.status(200).json({ user,token })
				}
			})
		}
	})(req,res,next)
})

module.exports = router