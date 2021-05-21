import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AppThemeContext } from '../../../common/theme/AppThemeProvider';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider, Drawer, FormControlLabel, Hidden,
  List, ListItem, ListItemIcon, ListItemText, Switch,useTheme
} from '@material-ui/core';
import navItems from '../../../common/utils/navItems';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';


export const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    padding: '10px 0',
    textAlign: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  btnWrap: {
    justifyContent: 'center',
  },
  navList: {
    padding: '20px 0'
  },
}));

function Menu({ mobileOpen, handleDrawerToggle }) {
  const classes = useStyles();
  const theme = useTheme();
  const { currentThemeName, setCurrentThemeName } = useContext(AppThemeContext);
  const isDarkTheme = currentThemeName === 'darkTheme';

  const handleThemeChange = (ev) => {
    const choice = ev.target.checked;
    if (choice) {
      setCurrentThemeName('darkTheme')
    } else {
      setCurrentThemeName('lightTheme')
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div>
          Monday {classes.toolbar}
        </div>
      </div>
      <Divider />
      <List className={classes.navList}>
        {navItems.map(item => (
          <Link to={item.slug}  key={item.id}>
            <ListItem button>
              <ListItemIcon>{item.icon('secondary')}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
          <ListItem className={classes.btnWrap}>
            <FormControlLabel
              control={
                <Switch
                  style={{ height: '38px' }}
                  checked={isDarkTheme}
                  onChange={handleThemeChange}
                  icon={<Brightness5Icon style={{ color: '#f8e000' }} />}
                  checkedIcon={<Brightness4Icon style={{ color: '#ff6d00' }} />}
                />
              }
              label='тема'
            />
          </ListItem>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

Menu.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default Menu;
