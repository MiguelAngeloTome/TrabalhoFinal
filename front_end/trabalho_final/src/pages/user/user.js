import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SideNav from '../../components/global/sideNav'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from "../../configs/authContext";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import { lightGreen,} from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import services from '../../services/';


function createData(name, value) {
  return {name, value};
}

const fontSize={
  fontSize:"9vh",
}

const drawerWidth = 240;

const useStyles = theme => ({
  table:{
    width:"90vh",
    maxWidth: "5000px",
    margin: "auto",
  },
  listItemThing:{
    justifyContent: 'center', 
  },
  green: {
    color: theme.palette.getContrastText(lightGreen[900]),
    backgroundColor: lightGreen[900],
    marginRight: '20px',
    width: "20vh",
    height: "20vh",
  },
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
  titleK: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#2196f3',
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
  menu: {
    textAlign:'center',alignItems: 'right',
    fontWeight:'bold',
    fontSize:'x-large'
  },
});


class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count:0,
      open: true,
      datas: undefined,
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    services.avisos.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
    if(window.location.hash.split("/")[2] === undefined){
      services.user.getUser(this.context.user.id).then(data => this.setState({datas: data})).catch();
    }else{
      services.user.getUser(window.location.hash.split("/")[2]).then(data => this.setState({datas: data})).catch();
    }
    
  }
  static contextType = AuthContext;

  render() {
    var rows = [{name:"yes", value:"no"}]
    const {user} = this.context;
    const { logout } = this.context;
    const { classes } = this.props;

    if(this.state.datas === undefined || this.state.datas[0] === undefined) {
      return null
    }

    rows = [
      createData('Nome', this.state.datas[0].name),
      createData('Sobre-nome', this.state.datas[0].surname),
      createData('E-mail', this.state.datas[0].email),
      createData('Password', "*********"),
    ];
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => this.setState({ open: true })}
              className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              User profile
          </Typography>
            <IconButton color="inherit" href="/#/alertas">
                <Badge badgeContent={this.state.count} color="secondary">
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
            <IconButton onClick={() => this.setState({ open: false })}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <SideNav />
        </Drawer>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <ListItem className={classes.listItemThing}>
          <ListItemIcon>
              <Avatar style = {fontSize} className={classes.green}>{user.name.charAt(0)+user.surname.charAt(0)}</Avatar>
          </ListItemIcon>
        </ListItem>


        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row"> {row.name}
                  </TableCell>
                  <TableCell align="center">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </main>
      </div>
    );
  }
}
export default withStyles(useStyles)(User)