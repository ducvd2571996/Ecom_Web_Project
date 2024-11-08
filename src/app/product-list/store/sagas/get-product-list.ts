/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import {
  getProductListFailure,
  getProductListSuccess,
} from '../reducers/get-product';
import axios from 'axios';
import { GetProductListPayload, Product } from '../../../model';

// Interface for Product List Data
interface ProductListData {
  items: Array<Product>;
}

// Interface for API Response
interface DataType {
  data: ProductListData;
  status: number;
  message: string;
}

// Action Payload Interface
interface ActionType {
  type: string;
  payload: GetProductListPayload;
}

// API call to fetch products
const fetchProductsApi = async (payload: GetProductListPayload) => {
  const response = await axios.get('http://127.0.0.1:3002/products', {
    params: payload, // Axios automatically serializes query parameters
  });
  console.log('aaaaa11222', response);

  return response.data; // Assuming data contains the product list
};

// Redux Saga to get the product list
function* getProductListSaga(
  action: ActionType
): Generator<any, void, DataType> {
  try {
    // Log the payload for debugging
    console.log('Fetching products with payload:', action?.payload);

    // Make the API call
    const response = yield call(fetchProductsApi, action?.payload);
    console.log('API response:', response);
    // Check if the response status is successful
    if (response?.status === 200) {
      // Dispatch success action with the product items
      yield put(getProductListSuccess(response?.data?.items));
    } else {
      // Dispatch failure action if the status is not 200
      yield put(getProductListFailure());
    }
  } catch (error) {
    // Log the error and dispatch failure
    console.log('Error occurred while fetching products:', error);
    yield put(getProductListFailure());
  }
}

export default getProductListSaga;
