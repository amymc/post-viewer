import React from 'react';
import ReactDOM from 'react-dom';
import { AppConsumer, AppProvider } from "./App.context.js"
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppConsumer>
      {({ getPosts, groupedHeadings, posts }) => (
        <App groupedHeadings={groupedHeadings} getPosts={getPosts} posts={posts}/>
      )}
      </AppConsumer>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
