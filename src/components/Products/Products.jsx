//******** JSX File for compiling each product and formatting the grid *********//
import React from 'react';
import {Grid} from '@material-ui/core';
import { ShortTextSharp } from '@material-ui/icons';

import Product from './Product/Product';
import useStyles from './productsStyles'

// const products = [
//     {id: 1, name: 'T-Shirt', description: 'Mensoz megaman shirt', price: '$45'},
//     {id: 2, name: 'Chain', description: 'Mensoz chain', price: '$50'},
// ]  //array of objects, these are mock procucts for testing purposes.
 //each product has an id, name, and description

const Products = ({products, onAddToCart, onAddToCartVariant}) => {
    const classes = useStyles();
    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} onAddToCartVariant={onAddToCartVariant}/> 
                    </Grid>
                ))}
            </Grid>
        </main>
    )//end return
}

export default Products;