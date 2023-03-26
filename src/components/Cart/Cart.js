import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';

const Cart = (props) => {
    const [isCheckOut, setIsCheckOut] = useState(false);

    const cartContext = useContext(CartContext);

    const totalAmount = `${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartContext.addItem({...item, amount: 1})
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    };

    const submitOrderHandler = (userData) => {
        fetch('https://food-app-9d67d-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartContext.items
            })
        });
    };

    const cartItems = (
    <ul className={classes['cart-items']}>
        {cartContext.items.map((item) => 
        <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />)}
    </ul>);

    const modalActions = 
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && 
            <button className={classes.button} onClick={orderHandler} >Order</button>}
    </div>

    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            {isCheckOut && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />}
            {!isCheckOut && modalActions}
        </Modal>
    )
};

export default Cart;