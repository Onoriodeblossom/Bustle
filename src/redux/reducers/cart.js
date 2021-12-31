import { actionTypes } from "../actions/actionTypes";
const updateQuantity = p =>
    p.quantity ? { ...p, quantity: p.quantity + 1 } : { ...p, quantity: 2 };

export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_CART:
            const productInCart = state.find(p => p.id === action.product.id);
            if (!productInCart) return [...state, action.product];
            return state.map(p => {
                if (p.id === action.product.id) {
                    return updateQuantity(p);
                }
                return p;
            });
        case actionTypes.REMOVE_PRODUCT_FROM_CART:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        case actionTypes.CLEAR_PRODUCT_FROM_CART: {
            return []
        }
            break
        default:
            return state;
    }
};
