import { ADD_ITEM, DELETE_ITEM, CLEAR_ITEM } from './types'

export const addItem = (product) => (

    {
        type: ADD_ITEM,
        data: product
    }
)

export const deleteItem = (key) => (
    {
        type: DELETE_ITEM,
        key: key
    }
)
export const clearItem = () => (
    {
        type: CLEAR_ITEM
    }
)