import React, {Component} from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import Paper from '@material-ui/core/Paper';

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
    return (
    
    <div style={{display:"flex"}}>
      <div style={{margin: "auto", width:750}}>

        <Paper elevation={1}>
          {todoList.map(todo => 
    
              <div key={`${todo.id}-todo-item`}>{todo.text}</div>)}

        </Paper>
      </div>
    </div>
    )
  }
}
export default graphql(TodosQuery)(App);
