import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      
        {['Home', 'Rig 21', 'Rig 08'].map((text, index) => (
        <Link to= {(text === "Home") ? '/' : `/${text.replace(/\s/g, '')}` } key={index}>
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon>
            <ListItemText primary={text} />         
          </ListItem>
          </Link>
        ))}
        
      </List>
      <Divider />
      <List>
        {['Statistics', 'Alerts',].map((text, index) => (
        <Link to= {`/${text.replace(/\s/g, '')}`} key={index}>
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <BarChartIcon /> : <ReportProblemIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button><img src={require("../assets/mckays.png")} className="logo" alt="logo" onClick={toggleDrawer(anchor, true)}></img></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
