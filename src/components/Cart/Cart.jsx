import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) =>
{
    const classes = useStyles();
    const EmptyCart = () =>
    (
 
            <Typography className={classes.typography} variant = 'subtitle1' >¡ Your Cart is Empty, 
                <Link to="/" className={classes.link}> Add Some Items First</Link> !
            </Typography>
  
    )

    const FilledCart = () =>
    (
        <main>
            <Grid container spacing ={3}>
                 {
                     cart.line_items.map((item => 
                        (
                            <Grid item xs ={12} sm = {4} key ={item.id}>
                                <CartItem item = {item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                            </Grid>   
                        )))
                 }
            </Grid>
            <div className = {classes.cardDetails}>
                <Typography className={classes.typography2} variant = "h5">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                   <Button className = {classes.emptyButton} size ="large" type = "button" variant = "contained" color = 'secondary' onClick={handleEmptyCart}>¡ Empty Cart !</Button> 
                   <Button component={Link} to="/checkout" className = {classes.checkoutButton} size ="large" type = "button" variant = "contained" color = 'primary'>¡ Checkout !</Button>
                </div>
            </div>
        </main>
    );
    if (!cart.line_items) return '¡ Loading !';

    return (
        <main className = {classes.content}>

        <Container >
            <div className = {classes.toolbar}/>
            <Typography className={classes.title } variant="h4" gutterbottom>¡ Your Shopping Cart !</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
        </main>
    )
}
export default Cart;