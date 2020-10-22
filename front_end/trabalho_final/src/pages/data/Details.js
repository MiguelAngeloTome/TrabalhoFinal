import React from 'react';
import { Container} from 'react-bootstrap';
import services from '../../services/';
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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Exa from '../graphs/ex';
import SideNav from '../../components/global/sideNav'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from "../../configs/authContext";

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


class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0,
            open: true,
            openDialogUser: false,
            openDialogModule: false,
            datas: undefined,
        }
    }

    static contextType = AuthContext;

    componentDidMount() {
      services.avisos.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
      services.data.getOne(this.props.match.params.id).then(data=>this.setState({datas: data[0]})).catch();
    }

    render() {
        const temp = 'Temperatura';
        const tempColor = 'rgba(255, 0, 0, .85)'

        const hum = 'Humidade do Ar';
        const humColor = 'rgba(66, 245, 239, .85)'

        const soloHum = 'Hum. do Solo';
        const soloHumColor = 'rgba(222, 184, 135, .85)'

        const pluv = 'Pluviosidade';
        const pluvColor = 'rgba(0, 0, 255, .85)'

        const velVento = 'Vel. do Vento';
        const velColor = 'rgba(230, 230, 250, .85)'

        const rad = 'Radiação Solar';
        const radColor = 'rgba(255, 255, 0, .85)'

        const { datas } = this.state;
        const { logout } = this.context;
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
                            onClick={() => this.setState({ open: true })}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Datas
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
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={6} lg={6} >
                <Paper className={clsx(classes.paper)}>
                  {datas !== undefined &&
                    <Typography component="h1" variant="h6" noWrap className={classes.titleK}>
                      {datas.isWet !== 6300 ? (
                        'Folha Molhada'
                      ) : (
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
                      Direção do Vento: {
                        datas.dir_vento < 22.5 && datas.dir_vento > 337.5 ?
                        ("Norte"):
                        datas.dir_vento < 67.5 && datas.dir_vento > 22.5 ?
                        ("Nordeste"):
                        datas.dir_vento < 112.5 && datas.dir_vento > 67.5 ?
                        ("Este"):
                        datas.dir_vento < 157.5 && datas.dir_vento > 112.5 ?
                        ("Sudeste"):
                        datas.dir_vento < 202.5 && datas.dir_vento > 157.5 ?
                        ("Sul"):
                        datas.dir_vento < 247.5 && datas.dir_vento > 202.5 ?
                        ("Sudoeste"):
                        datas.dir_vento < 292.5 && datas.dir_vento > 247.5 ?
                        ("Oeste"):
                        ("Noroeste")
                      }
                    </Typography>
                  }
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} >
              
                <Paper className={clsx(classes.paper)}>
                {datas !== undefined &&
                    <Exa valor={datas.temp} rest={80 - datas.temp} title={temp} color={tempColor}/>
                }
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper className={clsx(classes.paper)}>
                  {datas !== undefined &&
                    <Exa valor={datas.air_humidity} rest={80 - datas.air_humidity} title={hum} color={humColor} />
                  }
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                  {}
                  {datas !== undefined &&
                    <Exa valor={datas.solo_humidity} rest={80 - datas.solo_humidity} title={soloHum} color={soloHumColor} />
                  }
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                  {datas !== undefined &&
                    <Exa valor={datas.pluviosidade} rest={80 - datas.pluviosidade} title={pluv} color={pluvColor} />
                  }
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                  {datas !== undefined &&
                    <Exa valor={datas.vel_vento} rest={80 - datas.vel_vento} title={velVento} color={velColor} />
                  }
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                  {datas !== undefined &&
                    <Exa valor={datas.radiacao} rest={80 - datas.radiacao} title={rad} color={radColor} />
                  }
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
            </div >
        )
    }
}

export default withStyles(useStyles)(DetailsPage)