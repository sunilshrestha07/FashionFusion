import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
    id: string;
    price: number;
    quantity: number;
    totalPrice: number;
    name: string;
}

interface CartState {
    items: Item[];
    totalQuantity: number;
    changed: boolean;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    changed: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        replaceCart(state, action: PayloadAction<{ items: Item[]; totalQuantity: number }>) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action: PayloadAction<Omit<Item, 'quantity' | 'totalPrice'>>) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action: PayloadAction<string>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (!existingItem) return;
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
    },
});

export const {addItemToCart, removeItemFromCart, replaceCart} = cartSlice.actions;
export default cartSlice.reducer;
