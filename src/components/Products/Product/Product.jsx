//******** JSX File for formatting of each product*********//
import React, {useState} from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import useStyles from './productStyles';

const Product = ({product, onAddToCart, onAddToCartVariant}) => {
    const classes = useStyles();
    const [size, setSize] = useState("");

    //store for each image of product
    const [imgIndex, setImgIndex] = useState(0);

    const handleChangeSize = (event) => {
        setSize(event.target.value);
        // console.log("Here is the size now: ", size);
    }
    // console.log("Logging product from product.jsx", product);
    const SizeSelect = () => (
        <FormControl className={classes.formControl}>
            <InputLabel id="size-select-label">{product.variant_groups[0].name}</InputLabel>
            <Select
                labelId="size-select-label"
                id="size-select"
                value={size}
                onChange={handleChangeSize}
            >
                {product.variant_groups[0].options.map((option) => (
                    
                       <MenuItem value={option.id}>{option.name}</MenuItem> : null
                    
                ))}

                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
        </FormControl>
    )
    // console.log("Here is product from Product.jsx: ", product);

    //Array of all images of product
    const images = product.assets.map(asset => asset.url);
    // console.log("Here is the images object in Product.jsx: ", images);

    const imgClick = () => {
        console.log('CLICKED!!');
        // setImgIndex(imgIndex+1);
        // console.log('imgindex ', imgIndex )
        if(imgIndex < images.length-1){
            console.log('imgIndex: ', imgIndex)
            setImgIndex(imgIndex+1)
        }
        else{
            console.log('in else')
            setImgIndex(0);
        }

    }

    return (
        <Card className={classes.root}>
                <CardMedia className={classes.media} image={images[imgIndex]} title={product.name} onClick={imgClick}/> 
             <CardContent>
                 <div className={classes.cardContent}>
                     <Typography variant="h5" gutterBottom>
                        {product.name}
                     </Typography>
                     <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                     </Typography>
                 </div>
                 <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary"/>
             </CardContent>
         
             <CardActions className={classes.cardActions}>
            {/* Only shows size dropdown if the products has that option */}
            {product.variant_groups.length > 0 ? <SizeSelect /> : null}
            {   product.variant_groups.length === 0 && product.inventory.available !== 0 ?
                    <IconButton aria-label="Add to Cart" onClick = {() => onAddToCart(product.id, 1)}>
                        <AddShoppingCart />
                    </IconButton> 
                //if the size is not selected, the add to cart button will be disabled 
                : product.variant_groups.length > 0 && !size ?
                    <IconButton disabled={true}>
                        <AddShoppingCart />
                    </IconButton>  
                : product.inventory.managed && product.inventory.available === 0 ?
                        <IconButton disabled={true}>
                            SOLD OUT
                            <AddShoppingCart />
                        </IconButton>  
                :  <IconButton aria-label="Add to Cart" onClick = {() => onAddToCartVariant(product.id, 1, product.variant_groups[0].id, size)}>
                        <AddShoppingCart />
                    </IconButton> 
               
            }
             </CardActions>
        </Card>
    )
}

export default Product;
