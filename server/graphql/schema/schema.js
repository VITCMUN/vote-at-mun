/*
*  this is an example schema make appropriate changes 
*/
var { graphql, buildSchema } = require('graphql')

exports.schema = buildSchema(`
 	type Query {
 		hello : String
 	}
`)



