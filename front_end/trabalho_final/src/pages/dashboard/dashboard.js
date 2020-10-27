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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CompareGrah from '../graphs/CompareGraph';
import Exa from '../graphs/ex';
import SideNav from '../../components/global/sideNav'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from "../../configs/authContext";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import services from "../../services/"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';

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
    textAlign: 'center', alignItems: 'right',
    fontWeight: 'bold',
    fontSize: 'x-large'
  },
});

const cardAlert = {
  textAlign: "center",
  position: "relative",
  width: "30%",
  top: "10%",
  marginRight: "auto",
  marginLeft: "auto"
}

const cardHeader = {
  fontWeight: "bold",
  fontSize: "25px",
  textAlign: "center"
}

const cardTypography = {
  fontWeight: "bold"
}

let date = new Date()
let dateNow = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
let dateMidnight = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 0:0:0"

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      open: true,
      datas: undefined,
      vinhas: [],
      selected: undefined,
      noData: false,
      noVinhas: false,
      dataMax: "",
      dataMin: "",
      dataAvg: "",
      tendTemp: "",
      tendAir_hum: "",
      tendDirVento: "",
      tendIsWet: "",
      tendPluviosidade: "",
      tendRad: "",
      tendSolo_hum: "",
      tendVel_vento: "",
      muldatas: [],
    }
  }



  static contextType = AuthContext;

  componentDidMount() {
    services.avisos.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
    let a;
    services.vinha.getModulesUser(this.context.user.id).then(data => {
      this.setState({ vinhas: data });
      if (data.length !== 0 && data[0].modules.length > 0) {
        console.log(data[0].modules[0].module_id)
        a = data[0].modules[0].module_id;
        this.setState({ selected: data[0].modules[0].module_id });
        //Max
        services.data.getMaxDataTimeFrame(a, { timeInic: dateMidnight, timeFin: dateNow }).then(data => {
          this.setState({ dataMax: data[0] })
        }).catch(error => console.log(error))

        //Min
        services.data.getMinDataTimeFrame(a, { timeInic: dateMidnight, timeFin: dateNow }).then(data => {
          this.setState({ dataMin: data[0] })
        }).catch(error => console.log(error))

        //Avg
        services.data.getAvgDataTimeFrame(a, { timeInic: dateMidnight, timeFin: dateNow }).then(data => {
          this.setState({ dataAvg: data[0] })
        }).catch(error => console.log(error))
        //dados do dia
        services.data.getTime(a,{time1:dateMidnight,time2:dateNow}).then(data => {
          this.setState({ muldatas: data })
        }).catch(error => console.log(error))

        ////
        //Tendencia
        let dataMinusHour = date
        dataMinusHour.setHours(dataMinusHour.getHours() - 2);
        dataMinusHour = dataMinusHour.getFullYear() + "-" + (dataMinusHour.getMonth() + 1) + "-" + dataMinusHour.getDate() + " " + dataMinusHour.getHours() + ":" + dataMinusHour.getMinutes() + ":" + dataMinusHour.getSeconds()

        services.data.getTime(a, { time1: dataMinusHour, time2: dateNow }).then(data => {
          let temp = 0;
          let air_hum = 0;
          let dirVento = 0;
          let isWet = 0;
          let pluviosidade = 0;
          let rad = 0;
          let solo_hum = 0;
          let vel_vento = 0;
          for (let i = 0; i < data.length; i++) {
            temp += data[i].temp;
            air_hum += data[i].air_humidity;
            dirVento += data[i].dir_vento;
            isWet += data[i].isWet;
            pluviosidade += data[i].pluviosidade;
            rad += data[i].radiacao;
            solo_hum += data[i].solo_humidity;
            vel_vento += data[i].vel_vento;
          }
          temp = temp / data.length
          air_hum = air_hum / data.length
          dirVento = dirVento / data.length
          isWet = isWet / data.length
          pluviosidade = pluviosidade / data.length
          rad = rad / data.length
          solo_hum = solo_hum / data.length
          vel_vento = vel_vento / data.length

          services.data.getLast(a).then(data => {
            temp > data[0].temp ? this.setState({ tendTemp: "A descer" }) : temp < data[0].temp ? this.setState({ tendTemp: "A subir" }) : this.setState({ tendTemp: "Constante" });
            air_hum > data[0].air_humidity ? this.setState({ tendAir_hum: "A descer" }) : air_hum < data[0].air_humidity ? this.setState({ tendAir_hum: "A subir" }) : this.setState({ tendAir_hum: "Constante" });
            dirVento > data[0].dir_vento ? this.setState({ tendDirVento: "A descer" }) : dirVento < data[0].dir_vento ? this.setState({ tendDirVento: "A subir" }) : this.setState({ tendDirVento: "Constante" });
            isWet > data[0].isWet ? this.setState({ tendIsWet: "A descer" }) : isWet < data[0].isWet ? this.setState({ tendIsWet: "A subir" }) : this.setState({ tendIsWet: "Constante" });
            pluviosidade > data[0].pluviosidade ? this.setState({ tendPluviosidade: "A descer" }) : pluviosidade < data[0].pluviosidade ? this.setState({ tendPluviosidade: "A subir" }) : this.setState({ tendPluviosidade: "Constante" });
            rad > data[0].radiacao ? this.setState({ tendRad: "A descer" }) : rad < data[0].radiacao ? this.setState({ tendRad: "A subir" }) : this.setState({ tendRad: "Constante" });
            solo_hum > data[0].solo_humidity ? this.setState({ tendSolo_hum: "A descer" }) : solo_hum < data[0].solo_humidity ? this.setState({ tendSolo_hum: "A subir" }) : this.setState({ tendSolo_hum: "Constante" });
            vel_vento > data[0].vel_vento ? this.setState({ tendVel_vento: "A descer" }) : vel_vento < data[0].vel_vento ? this.setState({ tendVel_vento: "A subir" }) : this.setState({ tendVel_vento: "Constante" });
          }).catch(error => console.log(error))
          this.setState({selected:a})
        }).catch(error => console.log(error))
      } else {
        if (data.length === 0) {
          this.setState({ noVinhas: true, noData: true });
        } else if (data[0].modules.length === 0) {
          this.setState({ noData: true });
        }
      }
    })
  }

  upd = a => {
    this.setState({ noData: false })
    this.setState({ selected: undefined })
    this.setState({ selected: a })
    this.setState({ datas: undefined })
    services.data.getLast(a).then(data => {
      if (data.length === 0) this.setState({ noData: true })
      else this.setState({ datas: data[0] })
    }).catch();

    services.data.getMaxDataTimeFrame(a, { timeInic: dateMidnight, timeFin: dateNow }).then(data => {
      this.setState({ dataMax: data[0] })
    }).catch(error => console.log(error))

    services.data.getMinDataTimeFrame(a, { timeInic: dateMidnight, timeFin: dateNow }).then(data => {
      this.setState({ dataMin: data[0] })
    }).catch(error => console.log(error))

    services.data.getAvgDataTimeFrame(a, { timeInic: dateMidnight, timeFin: dateNow }).then(data => {
      this.setState({ dataAvg: data[0] })
    }).catch(error => console.log(error))
  }

  render() {
    const { datas, vinhas } = this.state;
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
              Dashboard
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
          {vinhas !== undefined &&
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.menu} htmlFor="grouped-native-select">Estações</InputLabel>
              <Select className={classes.menu}
                value={this.state.selected ? this.state.selected : ''} onChange={(evt) => this.upd(evt.target.value)}
              >
                {this.state.vinhas.map((vinha, index) => {
                  let a = [];
                  a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                  for (let i = 0; i < vinha.modules.length; i++) {
                    a.push(<MenuItem className={classes.menu} value={vinha.modules[i].module_id}>
                      {vinha.modules[i].localizacao}
                    </MenuItem>)
                  }
                  return (a)
                }

                )}
              </Select>
            </FormControl>
          }

          {this.state.noVinhas &&
            <div style={cardAlert}>
              <Card >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Não tem nenhuma vinha criada
                      </Typography>
                  <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                </CardContent>
              </Card>
            </div>
          }

          {!this.state.noVinhas && this.state.noData &&
            <div style={cardAlert}>
              <Card >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    A vinha não tem informação
                      </Typography>
                  <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                </CardContent>
              </Card>
            </div>
          }


          <Container maxWidth="lg" className={classes.container}>
            {this.state.noData === false &&
              <Grid container spacing={1}>
                {/* <Grid item xs={12} md={6} lg={6} >
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
              </Grid> */}
                {/* <Grid item xs={12} md={6} lg={6} >
              </Grid> */}
                <Grid item xs={12} md={6} lg={4} >
                  <Paper className={clsx(classes.paper)}>
                    <Typography style={cardHeader}>Temperatura</Typography>
                    <Typography style={cardTypography}>Valor máximo:{this.state.dataMax.temp}</Typography>
                    <Typography style={cardTypography}>Valor mínimo:{this.state.dataMin.temp}</Typography>
                    <Typography style={cardTypography}>Valor médio:{this.state.dataAvg.temp}</Typography>
                    <Typography style={cardTypography}>Tendência:{this.state.tendTemp}</Typography>
                    {/* {datas !== undefined &&
                    <Exa valor={datas.temp} rest={80 - datas.temp} title={temp} color={tempColor}/>
                } */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper className={clsx(classes.paper)}>
                    <Typography style={cardHeader}>Humidade do Ar</Typography>
                    <Typography style={cardTypography}>Valor máximo:{this.state.dataMax.air_humidity}</Typography>
                    <Typography style={cardTypography}>Valor mínimo:{this.state.dataMin.air_humidity}</Typography>
                    <Typography style={cardTypography}>Valor médio:{this.state.dataAvg.air_humidity}</Typography>
                    <Typography style={cardTypography}>Tendência:{this.state.tendAir_hum}</Typography>
                    {/* {datas !== undefined &&
                    <Exa valor={datas.air_humidity} rest={80 - datas.air_humidity} title={hum} color={humColor} />
                  } */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper className={classes.paper}>
                    <Typography style={cardHeader}>Humidade do Solo</Typography>
                    <Typography style={cardTypography}>Valor máximo:{this.state.dataMax.solo_humidity}</Typography>
                    <Typography style={cardTypography}>Valor mínimo:{this.state.dataMin.solo_humidity}</Typography>
                    <Typography style={cardTypography}>Valor médio:{this.state.dataAvg.solo_humidity}</Typography>
                    <Typography style={cardTypography}>Tendência:{this.state.tendSolo_hum}</Typography>
                    {/* {datas !== undefined &&
                    <Exa valor={datas.solo_humidity} rest={80 - datas.solo_humidity} title={soloHum} color={soloHumColor} />
                  } */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper className={classes.paper}>
                    <Typography style={cardHeader}>Pluviosidade</Typography>
                    <Typography style={cardTypography}>Valor máximo:{this.state.dataMax.pluviosidade}</Typography>
                    <Typography style={cardTypography}>Valor mínimo:{this.state.dataMin.pluviosidade}</Typography>
                    <Typography style={cardTypography}>Valor médio:{this.state.dataAvg.pluviosidade}</Typography>
                    <Typography style={cardTypography}>Tendência:{this.state.tendPluviosidade}</Typography>
                    {/* {datas !== undefined &&
                    <Exa valor={datas.pluviosidade} rest={80 - datas.pluviosidade} title={pluv} color={pluvColor} />
                  } */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper className={classes.paper}>
                    <Typography style={cardHeader}>Vento</Typography>
                    <Typography style={cardTypography}>Valor máximo:{this.state.dataMax.vel_vento}</Typography>
                    <Typography style={cardTypography}>Valor mínimo:{this.state.dataMin.vel_vento}</Typography>
                    <Typography style={cardTypography}>Valor médio:{this.state.dataAvg.vel_vento}</Typography>
                    <Typography style={cardTypography}>Tendência:{this.state.tendVel_vento}</Typography>
                    {datas !== undefined &&
                      <Typography component="h1" variant="h6" noWrap className={classes.titleK}>
                        Direção do Vento: {
                          datas.dir_vento < 22.5 && datas.dir_vento > 337.5 ?
                            ("Norte") :
                            datas.dir_vento < 67.5 && datas.dir_vento > 22.5 ?
                              ("Nordeste") :
                              datas.dir_vento < 112.5 && datas.dir_vento > 67.5 ?
                                ("Este") :
                                datas.dir_vento < 157.5 && datas.dir_vento > 112.5 ?
                                  ("Sudeste") :
                                  datas.dir_vento < 202.5 && datas.dir_vento > 157.5 ?
                                    ("Sul") :
                                    datas.dir_vento < 247.5 && datas.dir_vento > 202.5 ?
                                      ("Sudoeste") :
                                      datas.dir_vento < 292.5 && datas.dir_vento > 247.5 ?
                                        ("Oeste") :
                                        ("Noroeste")
                        }
                      </Typography>
                    }
                    {/* {datas !== undefined &&
                    <Exa valor={datas.vel_vento} rest={80 - datas.vel_vento} title={velVento} color={velColor} />
                  } */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Paper className={classes.paper}>
                    <Typography style={cardHeader}>Radiação solar</Typography>
                    <Typography style={cardTypography}>Valor máximo:{this.state.dataMax.radiacao}</Typography>
                    <Typography style={cardTypography}>Valor mínimo:{this.state.dataMin.radiacao}</Typography>
                    <Typography style={cardTypography}>Valor médio:{this.state.dataAvg.radiacao}</Typography>
                    <Typography style={cardTypography}>Tendência:{this.state.tendRad}</Typography>
                    {/* {datas !== undefined &&
                    <Exa valor={datas.radiacao} rest={80 - datas.radiacao} title={rad} color={radColor} />
                  } */}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {this.state.muldatas.length !== 0 &&
                    <div>
                    <Typography style={cardHeader}>Dados do Dia de Hoje:</Typography>
                    <CompareGrah value={1} data={this.state.muldatas} />
                    </div>
                  }
                </Paper>
              </Grid>
              </Grid>}
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(useStyles)(Dashboard)