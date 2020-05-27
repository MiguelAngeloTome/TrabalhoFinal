import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default class SideNav extends React.Component{

 render(){
     return(

        <div>
        <ListItem button component="a" href="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem  button component="a" href="/vinhas">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Vinhas" />
        </ListItem>
        <ListItem  button component="a" href="/about">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Comparações" />
        </ListItem>
        <ListItem  button component="a" href="/about">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Alertas" />
        </ListItem>
      </div>
    
    
     )
 }   
}
 