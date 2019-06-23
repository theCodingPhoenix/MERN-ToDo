import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";

// we need to access this server throughout the app
import {ApolloProvider} from "react-apollo";

// make a request where our server is running
const client = new ApolloClient({
    uri : "http://localhost:4000"
});

ReactDOM.render(<ApolloProvider client={client}>
    <App/>
    </ApolloProvider>,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
