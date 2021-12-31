import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from '../actions/types';

const initialState = {
    cart: [],
    total: 0,
}
const updateQuantity = p =>
    p.quantity ? { ...p, quantity: p.quantity + 1 } : { ...p, quantity: 2 };

export default (state = initialState, action) => {
    console.log('*******')
    switch (action.type) {
        case ADD_TO_CART:

            return {

                ...state,
                cart: [action.payload, ...state.cart],
                total: state.total + action.payload.cost
            }
        case EMPTY_CART:
            return {
                ...state,
                cart: [],
                total: 0
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item, i) => i !== action.payload.index),
                total: state.total - action.payload.item.cost
            }
        default:
            return state
    }
}
