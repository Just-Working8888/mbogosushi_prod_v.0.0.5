import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reviewsReduser from './slices/reviewsSlice'
import cartReduser from './slices/cartSlice'
import settingReduser from './slices/settingSlice'
import tableReduser from './slices/tableSlice'
import cateoriesReduser from './slices/categorySlice'
import productReduser from './slices/productSlice'
import windowReduser from './slices/windowSlice'
import aboutReduser from './slices/aboutSlice'
import emplayesReduser from './slices/employesSlice'
import faqReduser from './slices/faqSlice'
import tableCartReduser from './slices/tableCartSlice'
import adressesReduser from './slices/adressesSlice'
import delivaryReduser from './slices/delivarySlice'
import pointReduser from './slices/PointsSlice'
import scrollReduser from './slices/scroolSlice'
import storiesReduser from './slices/storiesSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReduser,
    cart: cartReduser,
    setting: settingReduser,
    table: tableReduser,
    categories: cateoriesReduser,
    product: productReduser,
    window: windowReduser,
    about: aboutReduser,
    employes: emplayesReduser,
    faq: faqReduser,
    tableCart: tableCartReduser,
    adresses: adressesReduser,
    delivary: delivaryReduser,
    point: pointReduser,
    scroll: scrollReduser,
    stories: storiesReduser
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



