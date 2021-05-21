import { makeStyles } from '@material-ui/core/styles';
import { Header } from './reusable/components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import { useState } from 'react';
import Menu from './reusable/components/Menu/Menu';
import { Switch, Route } from "react-router-dom";
import navItems from './common/utils/navItems';


// export const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // drawer: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },
  toolbar: theme.mixins.toolbar,
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <div className="App">
      <div className={classes.root}>
        <Header
          handleDrawerToggle={handleDrawerToggle}
        />

        <Menu
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            {
              navItems.map(item => (
                <Route path={item.slug} key={item.id}>
                  {item.page()}
                </Route>
              ))
            }

          </Switch>


          {/*<MainPage />*/}


        </main>
      </div>
    </div>
  );
}

// App.propTypes = {
//   window: PropTypes.func,
// };

export default App;
