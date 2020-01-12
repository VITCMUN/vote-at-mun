/*
 *  this is an example schema make appropriate changes
 */
const { buildSchema } = require('graphql');

exports.schema = buildSchema(`
 	type Query {
 		hello : String
 	}
`);
