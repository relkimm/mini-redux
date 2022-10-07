function step3() {
  var countReducer = function (state, action) {
    state = state ? state : 0;
    switch (action.type) {
      case "INCREASE":
        return state + 1;
      case "DECREASE":
        return state - 1;
      default:
        return state;
    }
  };

  var usernameReducer = function (state, action) {
    state = state ? state : "";
    switch (action.type) {
      case "CHANGE":
        return action.payload;
      default:
        return state;
    }
  };

  var reducer = combineReducers({
    count: countReducer,
    username: usernameReducer,
  });

  var store = createStore(reducer);
  store.subscribe(() => {
    var state = store.getState();
    document.querySelector("#step3 .count").innerHTML = state.count;
    document.querySelector("#step3 .username").innerHTML = state.username;
  });

  var actionCreators = {
    increase: function () {
      return { type: "INCREASE" };
    },
    decrease: function () {
      return { type: "DECREASE" };
    },
    change: function (payload) {
      return { type: "CHANGE", payload };
    },
  };

  var bounded = bindActionCreators(actionCreators, store.dispatch);

  document.querySelector("#step3 .increase").addEventListener("click", () => {
    bounded.increase();
  });

  document.querySelector("#step3 .decrease").addEventListener("click", () => {
    bounded.decrease();
  });

  document.querySelector("#step3 input").addEventListener("input", (event) => {
    bounded.change(event.target.value);
  });
}

step3();
