function createStore(reducer) {
  var state;
  var listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }

  return {
    getState,
    subscribe,
    dispatch,
  };
}

function combineReducers(reducers) {
  const keys = Object.keys(reducers);
  return function (state, action) {
    state = state || {};
    var next = {};
    keys.forEach(function (key) {
      next[key] = reducers[key](state[key], action);
    });
    return next;
  };
}

function bindActionCreators(actionCreators, dispatch) {
  var bounded = {};
  Object.keys(actionCreators).forEach(function (key) {
    var actionCreator = actionCreators[key];
    bounded[key] = function () {
      var args = Array.prototype.slice.call(arguments);
      dispatch(actionCreator.apply(null, args));
    };
  });
  return bounded;
}

function applyMiddleware(middleware) {
  return function (createStore) {
    return function (reducer) {
      var store = createStore(reducer);

      return {
        getState: store.getState,
        subscribe: store.subscribe,
        dispatch: function (action) {
          return middleware(store)(store.dispatch)(action);
        },
      };
    };
  };
}
