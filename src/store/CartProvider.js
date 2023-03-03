import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD_CART_ITEM') {
        // concat doesn't push to an existing array but instead creates a new one
        const updatedItems = state.items.concat(action.item);
        // new total amount = old total snapshot + new
        // if we multiple those 2, we know how much our total amount needs to change 
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
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