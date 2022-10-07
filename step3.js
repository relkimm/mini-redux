function step3() {
  var countReducer = function (state, action) {
    state = state ? state : 0;
    switch (action.type) {
      case "INCREASE":
        return state + 1;
      case "DECREASE":
        return state - 1;
      default:
        return satte;
    }
  };

  var reducer = combineReducers({
    count: countReducer,
  });

  var store = createStore(reducer);
  store.subscribe(() => {
    var state = store.getState();
    document.querySelector("#step3 .count").innerHTML = state.count;
  });

  var actionCreators = {
    increase: function () {
      return { type: "INCREASE" };
    },
    decrease: function () {
      return { type: "DECREASE" };
    },
  };

  var bounded = bindActionCreators(actionCreators, store.dispatch);

  document.querySelector("#step3 .increase").addEventListener("click", () => {
    bounded.increase();
  });

  document.querySelector("#step3 .decrease").addEventListener("click", () => {
    bounded.decrease();
  });
}

step3();
