import thunk from "redux-thunk";
import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { commentsReducer } from "./comments/reducers";
import { apiReducer } from "./api/reducer";

const rootReducer = combineReducers({
    commentsPageState: apiReducer,
    commentsDeliveryState: commentsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunk, thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
