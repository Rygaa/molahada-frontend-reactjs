import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    gadget: null,
    gadgets: [],
}

const gadgetsSlice = createSlice({
    name: 'gadgets',
    initialState,
    reducers: {
        setGadget: (state, { payload: gadget }) => {
            state.gadget = gadget;
        },
        setGadgets: (state, { payload: gadgets }) => {
            state.gadgets = gadgets;
        },
    }
})


export const gadgetsActions = gadgetsSlice.actions;
export default gadgetsSlice.reducer;