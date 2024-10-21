import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],  // Change cartItem to cartItems
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload;
        const existingItem = state.cartItems.find(
            item => item.id === newItem.id
        );

        state.totalQuantity++;

        if (!existingItem) {
            // If item is new, add to cartItems array
            state.cartItems.push({
                id: newItem.id,
                productName: newItem.productName,
                imgUrl: newItem.imgUrl,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price
            });
        } else {
            // If item already exists, update quantity and totalPrice
            existingItem.quantity++;
            existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
        }

        // Update totalAmount
        state.totalAmount = state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
        );
    },

    deleteItem: (state, action) => {
        const id = action.payload;
        const existingItem = state.cartItems.find(item => item.id === id);

        if (existingItem) {
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            state.totalQuantity -= existingItem.quantity;
        }

        state.totalAmount = state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number
            (item.quantity),0
            
        );
    },

    deleteItem: (state, action) => {
        const id = action.payload;
        const existingItem = state.cartItems.find(item => item.id === id);

        if (existingItem) {
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            state.totalQuantity -= existingItem.quantity;
        }

        state.totalAmount = state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity),
            0
        );
    }

    

   
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
