import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';

const networkInterface = createNetworkInterface({
  // whenever a custom network interface is created, is it necessary to specify the uri
  uri: '/graphql',
  opts: {
    // send along cookies whenever a request is made to the backend server
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  // uniquely identifies every fetched record
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
