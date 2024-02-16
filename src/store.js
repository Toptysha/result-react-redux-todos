import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { toDosReducer } from "./reducers/to-dos-reducer";
import { updateToDosReducer } from "./reducers/update-to-dos-reducer";
import { flagsReducer } from "./reducers/flags-reducer";

const reducer = combineReducers({
    toDosState: toDosReducer,
    updateToDosState: updateToDosReducer,
    flagsState: flagsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))