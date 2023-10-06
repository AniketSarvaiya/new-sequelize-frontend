import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { bookReducer } from "./reducers/BookReducer";

const rootReducer = combineReducers({
  userAuth: userReducer,
  bookReducer: bookReducer,
});

const initialstate = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
