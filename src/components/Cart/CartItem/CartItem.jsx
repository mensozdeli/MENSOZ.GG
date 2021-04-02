import React from 'react';
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) =>
{
    const classes = useStyles()
    return  (
        <Card>
            <CardMedia image = {item.media.source} alt = {item.name} className = {classes.media}/>
            <CardContent className = {classes.cardContent}>
                <Typography variant = "h5">{item.name}</Typography>
                <Typography variant = "h6">{item.line_total.formatted_with_symbol}</Typography>
                {item.selected_options.length > 0 ? 
                    <Typography variant = "body2">{item.selected_options[0].group_name + ": " + item.selected_options[0].option_name}</Typography>
                    : null
                }
            </CardContent>
            <CardActions className = {classes.cardActions}>
                <div className ={classes.buttons}>
                    <Button type = "button" size = "small" onClick={() => onUpdateCartQty(item.id, item.quantity-1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type = "button" size = "small" onClick={() => onUpdateCartQty(item.id, item.quantity+1)}>+</Button>
                </div>
                <Button variant ="contained" type="button" color ="secondary" onClick={() => onRemoveFromCart(item.id)}>¡ Remove !</Button>
            </CardActions>
        </Card>
    )
}
export default CartItem
