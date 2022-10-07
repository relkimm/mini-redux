function createStore() {
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
