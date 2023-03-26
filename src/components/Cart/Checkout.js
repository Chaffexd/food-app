import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === "";
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setformInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostCode = postCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostCodeIsValid = isFiveChars(enteredPostCode);

        setformInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostCodeIsValid
        });

        const formIsValid = 
            enteredNameIsValid && 
            enteredStreetIsValid && 
            enteredCityIsValid && 
            enteredPostCodeIsValid;

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostCode
        });
    };

    const nameControlClasses = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`;
    const postCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`;

    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postCodeControlClasses}>
                <label htmlFor="post">Post Code</label>
                <input type="text" id="post" ref={postCodeInputRef} />
                {!formInputValidity.postalCode && <p>Please enter a valid post code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel} >Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;