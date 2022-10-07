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

  const reducer = combineReducers({
    count: countReducer,
  });

  const store = createStore(reducer);
  store.subscribe(() => {
    const state = store.getState();
    document.querySelector("#step2 .count").innerHTML = state.count;
  });

  document.querySelector("#step2 .increase").addEventListener("click", () => {
    store.dispatch(increaseAction());
  });

  document.querySelector("#step2 .decrease").addEventListener("click", () => {
    store.dispatch(decreaseAction());
  });
}

step2();
