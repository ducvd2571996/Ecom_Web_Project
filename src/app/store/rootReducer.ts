import { combineReducers } from '@reduxjs/toolkit';
// Import your slice reducers here
import userReducer from './reducers/user';
import cateListReducer from './reducers/get-cate-list';
import productListReducer from '../product-list/store/reducers/get-product';
import brandsReducer from '../product-list/store/reducers/get-brands';
import registerReducer from '../register/store/reducers/register';
import loginReducer from '../login/store/reducers/login';

import latestProductReducer from './reducers/get-latest-product';

const rootReducer = combineReducers({
  user: userReducer,
  cateList: cateListReducer,
  productList: productListReducer,
  latestProduct: latestProductReducer,
  brands: brandsReducer,
  register: registerReducer,
  login: loginReducer,
});

export default rootReducer;
