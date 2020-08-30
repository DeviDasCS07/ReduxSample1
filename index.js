// Simple Store
const reducer = Redux.combineReducers({
  todos: (state = [], action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.item];
      case "REMOVE":
        return [...state.filter((x) => x !== state[action.index])];
      default:
        return [...state];
    }
  },
});

const store = Redux.createStore(reducer);

const render = () => {
  const container = document.getElementById("todo-list");
  container.innerHTML = "";
  const state = store.getState();
  state.todos.forEach((todo, i) => {
    const e = document.createElement("div");
    e.innerHTML = todo;
    container.appendChild(e);
    e.onclick = () => {
      store.dispatch({
        type: "REMOVE",
        index: i,
      });
      render();
    };
  });
};

document.getElementById("submit-todo").onclick = () => {
  store.dispatch({
    type: "ADD",
    item: document.getElementById("todo").value,
  });
  render();
};
