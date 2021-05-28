import './header.scss';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo-header.svg';
import equalizer from '../../../assets/img/equalizer.svg';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerWidth } from '../Menu/menuStyles';


const useStyles = makeStyles(theme => ({
  appMenu: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      boxShadow: 'rgba(0, 0, 0, 0.25) 0 10px 63px',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'start',
    margin: '0 10px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

export function Header({ handleDrawerToggle }) {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appMenu}>
      <Toolbar className={`container ${classes.header}`}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <a
          className='header__logo link-menu'
          href='https://www.dm-webdev.ru/'
          rel='noreferrer noopener'
          target='_blank'
        >
          <img className='header__logo__img' src={logo} alt='pomodoro box' />
        </a>

        <Link
          to='/statistics'
          className='link-menu header__link'
          style={{ backgroundImage: `url(${equalizer})`, color: 'inherit' }}
        >
          Статистика
        </Link>
      </Toolbar>
    </AppBar>
  );
}
