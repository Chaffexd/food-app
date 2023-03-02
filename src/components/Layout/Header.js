import React from 'react';
import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpeg';

const Header = () => {
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="Table of food" />
            </div>
        </React.Fragment>
    )
};

export default Header;
