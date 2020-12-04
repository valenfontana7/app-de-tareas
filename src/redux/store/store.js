import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { notasListReducer, notasDetailsReducer } from "../reducers/notas_reducer";

const initialState = { };
const reducer = combineReducers({
  notasList: notasListReducer,
  notasDetails: notasDetailsReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
