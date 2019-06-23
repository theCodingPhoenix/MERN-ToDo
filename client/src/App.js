import React, {Component} from 'react';
import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

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

const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!){
    updateToDo(id: $id, complete: $complete)
  }
`;

const DeleteMutation = gql`
  mutation($id: ID!){
    deleteTodo(id: $id)
  }
`;

class App extends Component{

  updateTodo = async todo => {

    await this.props.updateToDo({
      variables: {
        id: todo.id,
        complete: !todo.complete
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // map the id of the updated todo to the ones in our list
        // if the id matches update the completed status
        data.todoList = data.todoList.map(
            x => 
              x.id === todo.id ? 
              {
                ...todo,
                complete: !todo.complete
              } 
              :x
              
        )
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
    // update the todo
  };

  removeToDo = todo => {

    // remove the todo
  };

  render() {
    const {
      data: {loading, todoList}
    } = this.props;

    if(loading){
      return null;
    }

    return (
      <div style={{display: "flex"}}>
        <div style={{margin: "auto", width: 750 }}>
          <Paper elevation={1}>
            <List>
              {todoList.map(todo => (
                <ListItem
                key={todo.id}
                role={undefined}
                dense
                button
                onClick={() => this.updateTodo(todo)}
                >
                  <Checkbox
                  checked={todo.complete}
                  tabIndex={-1}
                  disableRipple 
                  />
                <ListItemText primary={todo.text}/>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.removeToDo(todo)}>
                  </IconButton>
                </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      </div>
    )
  }  
}

export default compose(graphql(UpdateMutation, {name: "updateToDo"}), graphql(TodosQuery))(App);