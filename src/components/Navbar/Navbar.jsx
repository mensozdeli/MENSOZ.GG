//***************** JSX File for Formatting of the Navbar on the website ********************/
import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';

import logo from '../../assets/mensoz-logo.png';   //Obtaining logo from assets folder to use on navbar
import useStyles from './navbarStyles';

const Navbar = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="MENSOZ DELI" height="25px" className={classes.image} />
                        MENSOZ DELI
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
