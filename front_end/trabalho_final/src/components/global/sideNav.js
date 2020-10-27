import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EcoIcon from '@material-ui/icons/Eco';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import WarningIcon from '@material-ui/icons/Warning';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { lightGreen,} from '@material-ui/core/colors';
import AuthContext from "../../configs/authContext";

const useStyles = theme => ({
  listEnd :{
    position: "absolute",
    bottom: 0,
    
  },
  green: {
    color: theme.palette.getContrastText(lightGreen[900]),
    backgroundColor: lightGreen[900],
    marginRight: '20px'
  },
})

class SideNav extends React.Component{

  static contextType = AuthContext;  

 render(){
  const {user} = this.context;
  const { classes } = this.props;
     return(

        <div>
        <ListItem button component="a" href="/#">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem  button component="a" href="/#/vinhas">
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <ListItemText primary="Vinhas" />
        </ListItem>
        <ListItem  button component="a" href="/#/compare">
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Cálculos" />
        </ListItem>
        <ListItem  button component="a" href="/#/risco">
          <ListItemIcon>
            <WarningIcon />
          </ListItemIcon>
          <ListItemText primary="Cálculos de Risco" />
        </ListItem>
        <ListItem  button component="a" href="/#/duplo">
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Gráficos Duplos" />
        </ListItem>




        <ListItem  button component="a" href="/#/alertas">
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="Alertas" />
        </ListItem>
        <ListItem className={classes.listEnd} button component="a" href="/#/user">
          <ListItemIcon>
              <Avatar className={classes.green}>{user.name.charAt(0)+user.surname.charAt(0)}</Avatar>
          </ListItemIcon>
          <ListItemText primary={user.name +" "+user.surname}/>
        </ListItem>
      </div>
    
    
     )
 }   
}

export default withStyles(useStyles)(SideNav)
 