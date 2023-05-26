import {
  legacy_createStore,
  applyMiddleware,
  compose,
  AnyAction,
  Reducer,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import { TodoObj, ActionsObj } from "../types/todo-obj";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const initialState: TodoObj[] = [];

const reducer: Reducer = (state = initialState, actions: ActionsObj) => {
  switch (actions.type) {
    case "ADD_NEW_TODO":
      if (!actions.payload) return state;
      return [...state, actions.payload];
    case "GET_ALL_TODOS":
      return actions.payload;
    case "UPDATE_TODO":
      return state.map((todo: TodoObj) => {
        if (todo._id === actions.id) {
          return actions.payload;
        }
        return todo;
      });
    case "DELETE_TODO":
      return state.filter((todo: TodoObj) => todo._id !== actions.id);
  }
};

const store = legacy_createStore(reducer, compose(applyMiddleware(thunk)));

export default store;

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof reducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
