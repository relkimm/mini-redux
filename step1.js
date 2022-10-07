const increaseAction = { type: "INCREASE" };
const decreaseAction = { type: "DECREASE" };

function step1() {
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

  const store = createStore(countReducer);
  store.subscribe(() => {
    document.querySelector("#step1 .count").innerHTML = store.getState();
  });

  document.querySelector("#step1 .increase").addEventListener("click", () => {
    store.dispatch(increaseAction);
  });

  document.querySelector("#step1 .decrease").addEventListener("click", () => {
    store.dispatch(decreaseAction);
  });
}

step1();
