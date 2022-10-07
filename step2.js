function step2() {
  const countReducer = (state, action) => {
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

  const usernameReducer = (state, action) => {
    state = state ? state : "";
    switch (action.type) {
      case "CHANGE":
        return action.payload;
      default:
        return state;
    }
  };

  const reducer = combineReducers({
    count: countReducer,
    username: usernameReducer,
  });

  const store = createStore(reducer);
  store.subscribe(() => {
    const state = store.getState();
    document.querySelector("#step2 .count").innerHTML = state.count;
    document.querySelector("#step2 .username").innerHTML = state.username;
  });

  document.querySelector("#step2 .increase").addEventListener("click", () => {
    store.dispatch(increaseAction());
  });

  document.querySelector("#step2 .decrease").addEventListener("click", () => {
    store.dispatch(decreaseAction());
  });

  document.querySelector("#step2 input").addEventListener("input", (event) => {
    store.dispatch({
      type: "CHANGE",
      payload: event.target.value,
    });
  });
}

step2();
