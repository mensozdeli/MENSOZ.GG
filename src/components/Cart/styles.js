
import { makeStyles } from '@material-ui/core/styles';
import Background from '../../assets/MensozDeliPixel.png';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
   
    color: 'white',
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
  content:{
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',
    minWidth: '100%',
    minHeight: '100%',

  },
  typography: {
      color: "white",
    
  },
}));