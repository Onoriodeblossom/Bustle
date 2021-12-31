import { FETCH_PRODUCTS } from './types';
import { CustomerList } from '../../screens/utility/StaticData';

export const fetchProducts = () => dispatch => {
    const books = CustomerList;
    dispatch({
        type: FETCH_PRODUCTS,
        payload: books
    })
}