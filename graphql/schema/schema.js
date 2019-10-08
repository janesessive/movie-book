const graphql = require('graphql');
const Actor = require('../db/models/actor');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const ActorType = new GraphQLObjectType({
  name: 'Actor',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    actor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Actor.findById(args.id);
      }
    },

    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return Actor.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addActor: {
      type: ActorType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let actor = new Actor({
          firstName: args.firstName,
          lastName: args.lastName
        });

        return actor.save();
      }
    },

    updateActor: {
      type: ActorType,
      args: {
        id: { type: GraphQLString },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let actorData = {
          firstName: args.firstName,
          lastName: args.lastName
        };

        return Actor.findByIdAndUpdate(args.id, actorData);
      }
    },
    removeActor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Actor.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
