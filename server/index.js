const { GraphQLServer } = require('graphql-yoga');
const mongoose = require("mongoose");

// this runs the background
mongoose.connect("mongodb://localhost/test1");
const ToDoList = mongoose.model("ToDoList", {
    text: String,
    complete: Boolean
});

const typeDefs = `
  type Query {
    hello(name: String): String!
    todoList: [ToDoList]
  }
  type ToDoList{
      id: ID!
      text: String!
      complete: Boolean!
  }
  type Mutation {
      createToDo(text: String!): ToDoList
      updateToDo(id: ID!, complete: Boolean!): Boolean
      deleteToDo(id: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    todoList: () => ToDoList.find()
  },
  Mutation: {
      createToDo: async (_, {text}) => {
          const todo = new ToDoList({text, complete: false});
          await todo.save();
          return todo;
      },
      updateToDo: async(_, {id, complete}) =>{
          await ToDoList.findByIdAndUpdate(id, {complete});
          return true;
      },
      deleteToDo: async(_, {id}) => {
          await ToDoList.findByIdAndDelete(id);
          return true;
      }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once("open", function(){
    server.start(() => console.log('Server is running on localhost:4000'))
})
