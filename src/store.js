import * as redux from "redux";

import { cartReducer } from "./reducers/cartReducer";

export const store = redux.createStore(cartReducer);