import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { counterReducer } from "./counter-reducer";
import { loadState, saveState } from "./localStorage";

const rootReducer = combineReducers({
    counter: counterReducer
})

const persistedState = loadState();

export const store = legacy_createStore(rootReducer, persistedState, applyMiddleware(thunk))

store.subscribe(() => {
    saveState({
      counter: store.getState().counter
    });
  });

export type AppRootStateType = ReturnType<typeof rootReducer>
