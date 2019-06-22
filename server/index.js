const { GraphQLServer } = require('graphql-yoga');
const mongoose = require("mongoose");

// this runs the background
mongoose.connect("mongodb://localhost/test");
const ToDo = mongoose.model("ToDo", {
    text: String,
    complete: Boolean
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    todos: [ToDo]
  }
  type ToDo{
      id: ID!
      text: String!
      complete: Boolean!
  }
  type Mutation {
      createToDo(text: String!): ToDo
      updateToDo(id: ID!, complete: Boolean!): Boolean
      deleteToDo(id: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    todos: () => ToDo.find()
  },
  Mutation: {
      createToDo: async (_, {text}) => {
          const todo = new ToDo({text, complete: false});
          await todo.save();
          return todo;
      },
      updateToDo: async(_, {id, complete}) =>{
          await ToDo.findByIdAndUpdate(id, {complete});
          return true;
      },
      deleteToDo: async(_, {id}) => {
          await ToDo.findByIdAndDelete(id);
          return true;
      }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once("open", function(){
    server.start(() => console.log('Server is running on localhost:4000'))
})
