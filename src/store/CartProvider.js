import { useReducer } from 'react';

import CartContext from './cart-context';

// sets the state of the cart
const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD_CART_ITEM') {
        // new total amount = old total snapshot + new
        // if we multiple those 2, we know how much our total amount needs to change 
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        // the purpose of this is to ensure that if the action item is the same as the item in the cart is the same
        // it will aggregate them
        // so if item.id is the same as the action.item.id, it will return true due to findIndex
        const existingCartItemsIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemsIndex];

        let updatedItems;

        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            // this is a new array where we copy the existing items
            updatedItems = [...state.items];
            // then we overwrite to to updatedItem
            updatedItems[existingCartItemsIndex] = updatedItem;
        } else {
            // concat doesn't push to an existing array but instead creates a new one
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if(action.type === 'REMOVE_CART_ITEM') {
        const existingCartItemsIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemsIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemsIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    // useReducer takes 2 states, in this situation we set the default cart state which is no items and a total of 0
    // as well as the cartReducer var

    // useReducer returns an array with 2 elements
    // so we use array destructuring to pull them apart
    // first element is always your state snapshot
    // second element function that allows you to dispatch an action to the reducer
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {  
        // when you dispatch an action, it's typically an object, but can be anything  
        dispatchCartAction({type: 'ADD_CART_ITEM', item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_CART_ITEM', id: id})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;