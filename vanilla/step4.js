function step4() {
  var counterReducer = function (state, action) {
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
    count: counterReducer,
    username: usernameReducer,
  });

  var middleware = function (store) {
    return function (next) {
      return function (action) {
        if (action.type === "INCREASE") {
          alert("increased!!!");
        } else if (action.type === "DECREASE") {
          alert("decreased!!!");
        }
        var result = next(action);
        return result;
      };
    };
  };

  var store = applyMiddleware(middleware)(createStore)(reducer);
  store.subscribe(() => {
    var state = store.getState();
    document.querySelector("#step4 .count").innerHTML = state.count;
    document.querySelector("#step4 .username").innerHTML = state.username;
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

  document.querySelector("#step4 .increase").addEventListener("click", () => {
    bounded.increase();
  });

  document.querySelector("#step4 .decrease").addEventListener("click", () => {
    bounded.decrease();
  });

  document.querySelector("#step4 input").addEventListener("input", (event) => {
    bounded.change(event.target.value);
  });
}

step4();
