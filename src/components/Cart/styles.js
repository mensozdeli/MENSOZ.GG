
import { makeStyles } from '@material-ui/core/styles';
import Background from '../../assets/MensozDeliPixel.png';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    width: '50%',
    backgroundColor: '#A0A0A0',
    opacity: 0.75,
    color: 'white',
    marginTop: '5%',
    marginLeft: '25%'
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
    width: '50%',
    backgroundColor: '#A0A0A0',
    opacity: 0.75,
    color: '#4d79ff',

    marginLeft: '25%'
  },
  typography2: {
    backgroundColor: '#3f50b5',
    // opacity: 0.75,
    color: 'white',
    maxHeight: 60,
  },
}));