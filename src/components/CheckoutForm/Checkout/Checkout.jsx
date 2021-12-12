import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import {commerce} from '../../../lib/commerce';
import useStyles from './checkoutStyles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['¡ Shipping address !', '¡ Payment details !'];

const Checkout = ({cart, order, onCaptureCheckout, error, handleDiscount}) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();
    
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep+1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep-1);

    useEffect(() => {
        if(cart.id){
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                    console.log("Your token is: ",  token);
                    setCheckoutToken(token);
                } catch (error) {
                    if (activeStep !== steps.length) history.push('/');
                }
            }

            generateToken();
        }
    }, [cart])

    const next = (data) => {
        setShippingData(data);
        nextStep();

    }
    
    

    let Confirmation = () => (order.customer ? (
        <>
        <CssBaseline />
          <div>
            <Typography variant="h5">¡ Good looks for your purchase, {order.customer.firstname} {order.customer.lastname} !</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">You will be receiving a confirmation email at: {order.customer.email}</Typography>
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    //if activeStep===0 return AddressForm else return PaymentForm
    const Form = () => (activeStep === 0 ?
        <AddressForm checkoutToken={checkoutToken} next={next}/> : 
        <PaymentForm 
            checkoutToken={checkoutToken} 
            nextStep={nextStep} 
            backStep={backStep} 
            shippingData={shippingData} 
            onCaptureCheckout={onCaptureCheckout}
            handleDiscount={handleDiscount}
        />);
        
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">¡ Checkout !</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) =>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </main>
    )
}

export default Checkout
