import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './component/App';
import rootReducer from './reducers/index'

// const logger = function({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }
// }

const logger = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action !== 'function') {
    console.log('ACTION_TYPE = ', action.type);
  }
  next(action);
}
// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   if (typeof action === 'function') {
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('store:', store);
// console.log('Before-state:', store.getState());

// export const StoreContext = createContext();

// console.log('StoreContext ', StoreContext);

// class Provider extends React.Component {
//   render() { 
//     return <StoreContext.Provider value={store} >
//       {this.props.children}
//     </StoreContext.Provider>;
//   }
// }

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name: 'Superman '}]
// });

// console.log('After-state:', store.getState());

// // connect(callback)
// function...

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

