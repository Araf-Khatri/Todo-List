import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const initialState = [];

const reducer = (state = initialState, actions) => {
  console.log(actions);
  switch (actions.type) {
    case "ADD_NEW_TODO":
      if (!actions.payload) return state
      return [...state, actions.payload];
    case "GET_ALL_TODOS":
      return actions.payload;
    case "UPDATE_TODO":
      return state.map((todo) => {
        if (todo._id === actions.id) {
          return actions.payload;
        }
        return todo;
      });
    case "DELETE_TODO":
      return state.filter((todo) => todo._id !== actions.id);
  }
};

const store = legacy_createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
