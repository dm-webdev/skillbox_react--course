import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { AppThemeContext } from '../../../common/theme/AppThemeProvider';
import { Link } from 'react-router-dom';
import {
  Divider,
  Drawer,
  FormControlLabel,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  useTheme,
} from '@material-ui/core';
import navItems from '../../../common/staticData/navItems';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { capitalizeFirstLetter } from '../../../common/utils/formatUtils';
import { menuStyles } from './menuStyles';


function Menu({ mobileOpen, handleDrawerToggle }) {
  const classes = menuStyles();
  const theme = useTheme();
  const { currentThemeName, setCurrentThemeName } = useContext(AppThemeContext);
  const isDarkTheme = currentThemeName === 'darkTheme';

  const handleThemeChange = (ev) => {
    const choice = ev.target.checked;
    if (choice) {
      setCurrentThemeName('darkTheme');
    } else {
      setCurrentThemeName('lightTheme');
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const watch = setInterval (() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(watch);
    };
  }, [])

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div>
          {capitalizeFirstLetter(format(currentTime, 'EEEEEE. p', { locale: ruLocale }))}
        </div>
        <div>
          {capitalizeFirstLetter(format(new Date(), 'dd MMM yyyy г.', { locale: ruLocale }))}
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
