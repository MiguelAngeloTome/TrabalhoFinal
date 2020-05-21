import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
//import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Exa from '../graphs/ex';
import SideNav from '../../components/global/sideNav'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from "../../configs/authContext";
import dataService from '../../services/data';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,

  },
  titleK:{
    flexGrow: 1,
    textAlign:'center',
    color:'#2196f3',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 270,
  },
  formControl: {
    display: 'flex',
    alignItems: 'right',
    //justifyContent: 'flex-end',
    margin: theme.spacing(1),
    minWidth: 120,
  },
});


class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          open: true,
          datas: undefined,
        };
      }



      static contextType = AuthContext;
      componentDidMount() {
        dataService.getOne('82d5346f-5d2b-4862-898e-535427248fb6').then(data=>this.setState({datas: data[0]})).catch();
        
    }

render(){
  
  const temp = 'Temperatura';
  const tempColor = 'rgba(255, 0, 0, 0.7)'

  const hum = 'Humidade do Ar';
  const humColor = 'rgba(66, 245, 239, 0.7)'

  const soloHum = 'Hum. do Solo';
  const soloHumColor = 'rgba(222, 184, 135, 0.7)'

  const pluv = 'Pluviosidade';
  const pluvColor = 'rgba(0, 0, 255, 0.7)'

  const velVento = 'Vel. do Vento';
  const velColor = 'rgba(230, 230, 250, 0.7)'

  const rad = 'Radiação Solar';
  const radColor = 'rgba(255, 255, 0, 1)'




  const {datas} = this.state;
  const {logout } = this.context;
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={()=>this.setState({ open: true })}
            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={255} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => logout()}>
            <Badge color="secondary">
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={()=>this.setState({ open: false })}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SideNav/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Modulo</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Vinha 1</ListSubheader>
          <MenuItem value={1}>modulo 1</MenuItem>
          <MenuItem value={2}>modulo 2</MenuItem>
          <ListSubheader>Vinha 2</ListSubheader>
          <MenuItem value={3}>Modulo 3</MenuItem>
          <MenuItem value={4}>Modulo 4</MenuItem>
        </Select>
      </FormControl>
        <Container maxWidth="lg" className={classes.container}>
        
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6} lg={6} >
              <Paper className={clsx(classes.paper)}>
              {datas !== undefined &&
               <Typography component="h1" variant="h6" noWrap className={classes.titleK}>
                 {datas.isWet ?(
                   'Folha Molhada'
                 ):(
                  'Folha Seca'
                 )
                 }
             </Typography>
              }  
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} >
              <Paper className={clsx(classes.paper)}>
              {datas !== undefined &&
                <Typography component="h1" variant="h6" noWrap className={classes.titleK}>
                  
                  Direção do Vento: {datas.dir_vento} 
                  
              </Typography>
              }  
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
              <Paper className={clsx(classes.paper)}>
              {datas !== undefined &&
                <Exa valor={datas.temp} rest={80-datas.temp} title={temp} color = {tempColor}/>
              }  
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={clsx(classes.paper)}>
              {datas !== undefined &&
                <Exa valor={datas.air_humidity} rest={80-datas.air_humidity} title={hum} color = {humColor}/>
              }
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
              {datas !== undefined &&
                <Exa valor={datas.solo_humidity} rest={80-datas.solo_humidity} title={soloHum} color = {soloHumColor}/>
              }
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
              {datas !== undefined &&
                <Exa valor={datas.pluviosidade} rest={80-datas.pluviosidade} title={pluv} color = {pluvColor}/>
              }
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
              {datas !== undefined &&
                <Exa valor={datas.vel_vento} rest={80-datas.vel_vento} title={velVento} color = {velColor}/>
              }
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
              {datas !== undefined &&
                <Exa valor={datas.temp} rest={80-datas.temp} title={rad} color = {radColor}/>
              }
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              {datas !== undefined &&
                <Exa valor={datas.radiacao} rest={80-datas.radiacao} title={temp} color = {tempColor}/>
              }
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
}
export default withStyles(useStyles)(Dashboard)