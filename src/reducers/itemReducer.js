import { ADD_ITEM, DELETE_ITEM, CLEAR_ITEM } from '../actions/types'

const initialState = {
    basketList: [],
    total: 0
}

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            const isProductAdded = state.basketList.find(
                item => item.id == action.data.id
            );
            return {
                ...state,
                total: state.total + action.data.cost,
                basketList: isProductAdded ?
                    state.basketList.map(item => {
                        if (item.id == action.data.id) {
                            item.count++;

                        }
                        return item;
                    })
                    : [action.data, ...state.basketList]


                //state.basketList.concat(action.data),
                // total
            }

        }
        case DELETE_ITEM:
            return {
                ...state,
                basketList: state.basketList.filter((item) => item.id !== action.key)
            }
        case CLEAR_ITEM:
            //console.log('*****************')
            return {
                ...state,
                basketList: [],
                total: 0
            }
        default:
            return state
    }
}

export default itemReducer