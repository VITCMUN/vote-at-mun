const passport = require("passport")
const logger = require('../winston')

exports.jwt_auth = (req,res,next) => {
	passport.authenticate('jwt',{ session: false }, function(err,user,info){
		if(err){
			logger.error(err.message)
			return next(err)
		} else if (!user) {
			return res.status(403).json(info)
		} else {
			return next()
		}
	})(req,res,next)
}