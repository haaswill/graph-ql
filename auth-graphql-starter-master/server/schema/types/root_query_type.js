const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // At least one field is required
    // Check if user is signed in or not on the client side
    user: { 
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      } 
    }
  }
});

module.exports = RootQueryType;
