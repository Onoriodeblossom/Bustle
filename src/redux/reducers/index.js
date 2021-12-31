import { combineReducers } from "redux";
import { categories, categoriesIsLoading } from "./categories";
import products from "./cart";
export default combineReducers({
    categories,
    categoriesIsLoading,
    products: products
});
