import { makeStyles } from '@material-ui/core/styles';
import Background from '../../assets/MensozDeli.png';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));