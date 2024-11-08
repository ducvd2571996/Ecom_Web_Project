import { combineReducers } from '@reduxjs/toolkit';
// Import your slice reducers here
import userReducer from './reducers/user';
import cateListReducer from './reducers/get-cate-list';
import productListReducer from '../product-list/store/reducers/get-product';
import brandsReducer from '../product-list/store/reducers/get-brands';
import registerReducer from '../register/store/reducers/register';
import loginReducer from '../login/store/reducers/login';
import cartReducer from '../cart/store/reducers/cart';
import paymentReducer from '../payment/store/reducers/payment';
import wishListReducer from '../wish-list/store/reducers/wish-list';
import latestProductReducer from './reducers/get-latest-product';
import productDetailReducer from '../product-detail/store/reducers/get-product-detail';

const rootReducer = combineReducers({
  user: userReducer,
  cateList: cateListReducer,
  productList: productListReducer,
  latestProduct: latestProductReducer,
  brands: brandsReducer,
  register: registerReducer,
  login: loginReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  payment: paymentReducer,
  wishList: wishListReducer,
});

export default rootReducer;
