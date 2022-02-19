import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user-slice';
import gadgetsReducer from './gadgets-slice'



const store = configureStore({
    reducer: {
        user: userReducer,
        gadgets: gadgetsReducer
    }
})


export default store;