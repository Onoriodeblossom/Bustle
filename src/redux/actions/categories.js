import { actionTypes } from "./actionTypes";
import { fetchCategories } from "../../screens/utility/UserService";

export const categoriesIsLoading = bool => {
    return {
        type: actionTypes.CATEGORIES_IS_LOADING,
        isLoading: bool
    };
};

export const categoriesFetchDataSuccess = categories => {
    return {
        type: actionTypes.CATEGORIES_FETCH_DATA_SUCCESS,
        categories
    };
};

export const categoriesFetchData = url => {
    return async dispatch => {
        dispatch(categoriesIsLoading(true));
        const categories = await fetchCategories(url);
        dispatch(categoriesFetchDataSuccess(categories));
        dispatch(categoriesIsLoading(false));
    };
};