export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EMPTY = "EMPTY";

let cartFromLocalStorage, initialState=[];
try {
  cartFromLocalStorage = localStorage.getItem("cartProducts");
  initialState = (cartFromLocalStorage) ? (JSON.parse(cartFromLocalStorage)) : [];
} catch(e){
  console.log(e);
}

export const cartReducer = (state=[...initialState], action) => {
  console.log("cartStore: ", state, action);
  switch(action.type) {
    case ADD: {
      let tempState = [...state];
      if(action.id) {
        tempState.push(action.id);
        localStorage.setItem("cartProducts", JSON.stringify(tempState));
      }
      return [ ...tempState ];
    }
      
    case REMOVE: {
      let tempState = [...state];
      if(action.id) {
        tempState = tempState.filter(productId => productId !== action.id);
        localStorage.setItem("cartProducts", JSON.stringify(tempState));
      }
      return [ ...tempState ];
    }
      
    case EMPTY: {
      return [];
    }

    default: {
      return state;
    }
      
  }
}