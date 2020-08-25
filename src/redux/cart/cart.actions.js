import CartActionTypes from './cart.types';

// payload is optional here
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});
