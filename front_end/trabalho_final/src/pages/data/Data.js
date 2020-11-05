import React from 'react';
import { Container} from 'react-bootstrap';
import './Data.css';
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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SideNav from '../../components/global/sideNav'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MaterialTable from 'material-table';
import AuthContext from "../../configs/authContext";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import services from "../../services";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
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
    containerMap: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: "75%",
        minHeight: "25%",
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
    StyledTableCell: {
        backgroundColor: theme.palette.common.black,
        color: '#ffffff',
        fontSize: 14,
    },
    StyledTableRow: {
        backgroundColor: theme.palette.action.hover,
    },
    Tabs: {
        flexGrow: 1,
    },

});

class DataListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0,
            open: true,
            openDialogUser: false,
            openDialogModule: false,
            datas: [],
            columns: [
                { title: 'Data', field: 'date' },
                { title: 'Temperatura', field: 'temp' },
                { title: 'Humidade do ar', field: 'air_humidity' },
                { title: 'Humidade do solo', field: 'solo_humidity' },
                { title: 'Folha molhada', field: 'isWet' },
                { title: 'Pluviosidade', field: 'pluviosidade' },
                { title: 'Velocidade do vento', field: 'vel_vento' },
                { title: 'Direção do vento', field: 'dir_vento' },
                { title: 'Radiação', field: 'radiacao' },
            ],
            datas2: [],
            columns2: [
                { title: 'Nome ', field: 'nome' },
                { title: 'Tipo', field: 'tipo' },
                { title: 'Data que foi inserido', field: 'dataInserido' }
            ],
            value: 0,
            sensOpen:false,
            sensName: "",
            sensType: "0",
            sensDate:Date(),
            noSensName:false,
        }
    }

    static contextType = AuthContext;

    componentDidMount() {
        services.avisos.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
        services.data.getAllModule(window.location.hash.split("/")[2]).then(data => {
            for(let i = 0; i < data.length; i++){
                data[i].date = data[i].date.split("T")[0] + " " + data[i].date.split("T")[1].split(".")[0]
            }
            this.setState({datas: data})
        }).catch();
        services.sensores.getSensoresModulo(window.location.hash.split("/")[2]).then(data => {
            for(let i = 0; i < data.length; i++){
                data[i].dataInserido = data[i].dataInserido.split("T")[0]
                switch(data[i].tipo) {
                    case 0:
                        data[i].tipo = "Sensor de temperatura"
                        break;
                    case 1:
                        data[i].tipo = "Sensor de humidade do ar"
                        break;
                    case 2:
                        data[i].tipo = "Sensor de humidade do solo"
                        break;
                    case 3:
                        data[i].tipo = "Sensor de folha molhada"
                        break;
                    case 4:
                        data[i].tipo = "Sensor de pluviosidade"
                        break;
                    case 5:
                        data[i].tipo = "Sensor de velocidade do vento"
                        break;
                    case 6:
                        data[i].tipo = "Sensor de direção do vento"
                        break;
                    case 7:
                        data[i].tipo = "Sensor de radiação"
                        break;
                    default:
                        data[i].tipo = "Sensor não reconhecido"
                        break;
                }
            }
            this.setState({datas2: data})
        }).catch();
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    addSensor = () =>{
        this.setState({sensOpen:true})
    }

    closeSens = () =>{
        this.setState({sensOpen:false})
    }

    submitSens = () =>{
        let date = new Date(this.state.sensDate)
        date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

        if(this.state.sensName.length === 0){
            this.setState({noSensName:true})
        }else{
            services.sensores.insertSensor({module_id:window.location.hash.split("/")[2], nome:this.state.sensName, tipo:this.state.sensType, dataInserido:date}).then(data =>{
                services.sensores.getSensoresModulo(window.location.hash.split("/")[2]).then(data => {
                    for(let i = 0; i < data.length; i++){
                        data[i].dataInserido = data[i].dataInserido.split("T")[0]
                        switch(data[i].tipo) {
                            case 0:
                                data[i].tipo = "Sensor de temperatura"
                                break;
                            case 1:
                                data[i].tipo = "Sensor de humidade do ar"
                                break;
                            case 2:
                                data[i].tipo = "Sensor de humidade do solo"
                                break;
                            case 3:
                                data[i].tipo = "Sensor de folha molhada"
                                break;
                            case 4:
                                data[i].tipo = "Sensor de pluviosidade"
                                break;
                            case 5:
                                data[i].tipo = "Sensor de velocidade do vento"
                                break;
                            case 6:
                                data[i].tipo = "Sensor de direção do vento"
                                break;
                            case 7:
                                data[i].tipo = "Sensor de radiação"
                                break;
                            default:
                                data[i].tipo = "Sensor não reconhecido"
                                break;
                        }
                    }
                    this.setState({datas2: data})
                }).catch();
                this.setState({sensOpen:false});
            })
        }
    }

    changeSensName = (evt) =>{
        this.setState({noSensName:false})
        if (evt.target.value.length === 0){
            this.setState({noSensName:true})
        }
        this.setState({ sensName: evt.target.value })
    }

    render() {
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
                            Valores
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
                        <Paper className={classes.root}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                className={classes.Tabs}
                            >
                                <Tab label="Valores" />
                                <Tab label="Sensores" />
                            </Tabs>
                        </Paper>
                        {this.state.value === 0 && 
                            <Container maxWidth="lg" className={classes.container}>
                                <MaterialTable
                                    icons={tableIcons}
                                    title="Lista de valores"
                                    columns={this.state.columns}
                                    data={this.state.datas}
                                    onRowClick={(event, rowData) => this.props.history.push(`/data/details/${rowData.data_id}`)}
                                />
                            </Container>
                        }
                        {this.state.value === 1 && 
                            <Container maxWidth="lg" className={classes.container}>
                                <MaterialTable
                                    icons={tableIcons}
                                    title="Lista de sensores"
                                    columns={this.state.columns2}
                                    data={this.state.datas2}
                                    options={{
                                        actionsColumnIndex: -1,
                                    }}
                                    actions={[
                                        {
                                            icon: AddBox,
                                            tooltip: 'Adicionar sensor',
                                            isFreeAction: true,
                                            onClick: () => this.addSensor()
                                        }
                                    ]}
                                    editable={{
                                        onRowDelete: (oldData) =>
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    services.sensores.removeSensor(oldData.sensor_id).then(data =>{
                                                        services.sensores.getSensoresModulo(window.location.hash.split("/")[2]).then(data => {
                                                            for(let i = 0; i < data.length; i++){
                                                                data[i].dataInserido = data[i].dataInserido.split("T")[0]
                                                                switch(data[i].tipo) {
                                                                    case 0:
                                                                        data[i].tipo = "Sensor de temperatura"
                                                                        break;
                                                                    case 1:
                                                                        data[i].tipo = "Sensor de humidade do ar"
                                                                        break;
                                                                    case 2:
                                                                        data[i].tipo = "Sensor de humidade do solo"
                                                                        break;
                                                                    case 3:
                                                                        data[i].tipo = "Sensor de folha molhada"
                                                                        break;
                                                                    case 4:
                                                                        data[i].tipo = "Sensor de pluviosidade"
                                                                        break;
                                                                    case 5:
                                                                        data[i].tipo = "Sensor de velocidade do vento"
                                                                        break;
                                                                    case 6:
                                                                        data[i].tipo = "Sensor de direção do vento"
                                                                        break;
                                                                    case 7:
                                                                        data[i].tipo = "Sensor de radiação"
                                                                        break;
                                                                    default:
                                                                        data[i].tipo = "Sensor não reconhecido"
                                                                        break;
                                                                }
                                                            }
                                                            this.setState({datas2: data})
                                                        }).catch();
                                                    });
                                                }, 600);
                                            }),
                                    }}
                                />
                                <Dialog  open={this.state.sensOpen} onClose={() => this.closeSens()} aria-labelledby="form-dialog-title">     
                                    <DialogContent style = {{width:"40em"}}>
                                        <h3>Adicionar sensor</h3>
                                        <h5 style={{textDecoration:"underline"}}>Tipo de sensor</h5>
                                        <FormControl component="fieldset">
                                            <RadioGroup name="sensType" value={this.state.sensType} onChange={(evt) => this.setState({sensType:evt.target.value})}>
                                                <FormControlLabel value="0" control={<Radio />} label="Temperatura" />
                                                <FormControlLabel value="1" control={<Radio />} label="Humidade do ar" />
                                                <FormControlLabel value="2" control={<Radio />} label="Humidade do solo" />
                                                <FormControlLabel value="3" control={<Radio />} label="Folha molhada" />
                                                <FormControlLabel value="4" control={<Radio />} label="Pluviosidade" />
                                                <FormControlLabel value="5" control={<Radio />} label="Velocidade do vento" />
                                                <FormControlLabel value="6" control={<Radio />} label="Direção do vento" />
                                                <FormControlLabel value="7" control={<Radio />} label="Radiação" />
                                            </RadioGroup>
                                        </FormControl>
                                        <h5 style={{textDecoration:"underline"}}>Data de inserção do sensor</h5>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Data de inserção do sensor"
                                                value={this.state.sensDate}
                                                onChange={(evt) => this.setState({sensDate:evt})}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <h5 style={{textDecoration:"underline"}}>Descrição do sensor</h5>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="sensNome"
                                            label="Descrição do sensor"
                                            name="sensName"
                                            autoComplete="Nome do sensor"
                                            value={this.state.sensName} onChange={(evt) => this.changeSensName(evt)}
                                        />
                                        {this.state.noSensName === true &&
                                            <FormHelperText error fullWidth id="nomeSens-error-text">O nome do sensor não pode estar vazio</FormHelperText>
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => this.submitSens()} color="primary">
                                            Adicionar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Container>
                        }
                </main>
            </div >
        )
    }
}

export default withStyles(useStyles)(DataListPage)