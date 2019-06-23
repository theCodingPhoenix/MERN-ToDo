# MERN-ToDo

Download and install mongo db
```https://www.mongodb.com/download-center/community```

Install GraphQL yoga
```npm install graphql-yoga```

Install Mongoose for MongoDB connections
```npm install mongoose```

``npm install apollo-boost react-apollo graphql-tag graphql --save``

## Using GraphQL Playground

###### Mutation
> View the Todos

```
{
todoList{
    id
    text
    complete
  }
}
```

> Add data using the createTodo mutation in Playground


``` 
mutation{
  createToDo(text: "Grocery Shopping"){
    id
    text
    complete
  }
}
```

> Update data using the updateToDo Mutation

```
mutation{
  updateToDo(id: "5d0f622efde3581188260e99", complete: true)
}
```

> Delete a task

```
deleteToDo(id: "5d0f6244fde3581188260e9c")
```