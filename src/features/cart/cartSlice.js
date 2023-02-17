import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
// import { openModal } from '../modal/modalSlice';
// import cartItems  from '../../cartItems';


const url = 'http://course-api.com/react-useReducer-cart-project';


const initialState = {
    cartItems: [],
    amount: 5,
    total: 0,
    isLoading: true,
};



// export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
//     return fetch(url)
//     .then(resp => resp.json())
//     .catch((err) => console.log(err))
// });

export const getCartItems = createAsyncThunk('cart/getCartItems', async(name, thunkAPI) => {
    try {
        const resp = await axios(url)
        // console.log(resp)
        // console.log(name)
        // console.log(thunkAPI.getState())
        // thunkAPI.dispatch(openModal())
        return resp.data
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) 
          || error.message 
          || error.toString();
      return thunkAPI.rejectWithValue(message); 
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action)=> {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
            console.log(action)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
              amount += item.amount;
              total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCartItems.rejected, (state, action) => {
                console.log(action)
                state.isLoading = false
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                // console.log(action)
                state.isLoading = false
                state.cartItems = action.payload
            })
       }
});

// console.log(cartSlice)


export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;


export default cartSlice.reducer;