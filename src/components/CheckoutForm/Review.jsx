import React from 'react';
import {Typography, List, ListItem, ListItemText, Button} from '@material-ui/core';

import { useState } from 'react';

const Review = ({checkoutToken, handleDiscount}) => {

    const [discountCode, setDiscountCode] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        handleDiscount(checkoutToken, discountCode);
    }
    return (
        <>
            <Typography variant="h6" gutterBottom>¡ Order Summary !</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem style={{padding: '10px 0'}} key={product.name}>
                       <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} /> 
                       <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                 <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary="Shipping" />
                    <Typography variant="body2" >
                        {checkoutToken.shipping_methods[0].price.formatted_with_symbol}
                    </Typography>
                </ListItem>
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{fontWeight: 700}}>
                        ${checkoutToken.live.subtotal.raw + checkoutToken.shipping_methods[0].price.raw}.00
                    </Typography>
                </ListItem>
            </List>
            <form onSubmit={handleSubmit}>
                <label>
                    Discount Code: 
                    <input
                        type='text'
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                    />
                </label>
                <Button type="submit" variant="contained" disabled={!discountCode} color="primary"> 
                    Apply
                </Button>
            </form>
        </>
    )
}

export default Review
