import React, {Component} from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";

// build the query just as is done through the playground
// use the gql tag to parse the query string
const TodosQuery = gql`
{
  todoList{
      id
      text
      complete
    }
}`;

class App extends Component{
  render(){
  const {data: {loading, todoList}} = this.props;

  if(loading){
    return null;
  }
    return <div>{todoList.map(todo => <div key={`${todo.id}-todo-item`}>{todo.text}</div>)}</div>
  }
}
export default graphql(TodosQuery)(App);
