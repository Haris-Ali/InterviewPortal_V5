import React from "react";
import teststyles2 from "../componentsStyles/TestNav.module.css";
import Timer from "./Timer.component";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import teststyles from "../componentsStyles/Dashboard.module.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
   marginLeft: theme.spacing(2)
   
  }
}));
function TestNav(props) {
  const classes = useStyles();
  return (
 
    

    <div className={classes.root}>
      <AppBar position="static">
        
              
        <Toolbar>
          <Timer {...props} />
        </Toolbar>
        
      
      </AppBar>
      <button
          className={teststyles.buttons__submit}
          style={{ float: "right", display: "block" 
        
        }}
          onClick={props.submithandler}
          >
        Submit
        </button>
      
    </div>

  );
}

export default TestNav;
