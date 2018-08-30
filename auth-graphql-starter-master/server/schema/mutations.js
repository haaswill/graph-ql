const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      // Request is the request object from express
      resolve(parentValue, { email, password}, req) {
        // Returns a promise
        return AuthService.signup({ email, password, req });
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      // Request is the request object from express
      resolve(parentValue, { email, password}, req) {
        // Returns a promise
        return AuthService.login({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      // Request is the request object from express
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    }
  }
});

module.exports = mutation;