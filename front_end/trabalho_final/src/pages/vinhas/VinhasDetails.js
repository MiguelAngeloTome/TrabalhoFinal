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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SideNav from '../../components/global/sideNav'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MaterialTable from 'material-table';
import AuthContext from "../../configs/authContext";
import services from '../../services/';
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
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShowMap from '../maps/showMap'
import ClickMap from '../maps/clickMap'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { lightGreen, } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SettingsIcon from '@material-ui/icons/Settings';

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
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function createData(nome, min, max) {
    return { nome, min, max };
}

const rows = [];

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
    green: {
        color: theme.palette.getContrastText(lightGreen[900]),
        backgroundColor: lightGreen[900],
        marginRight: '20px'
    },

});

const tableStyle = {
    position: "relative",
    marginRight: "auto",
    marginLeft: "auto",
    width: "50%",
    top: "3%"
}

const prefsBtn = {
    position:"relative",
    zIndex:1000,
    top: "4.3%",
    left: "25%"
}

const txtField = {
    position: "relative",
    width:"50%",
    marginRight:"auto",
    marginLeft:"auto",
    padding:"0px 7% 0px 0px",
}

const headerStyle = {
    fontWeight: "bold",
}

class VinhasDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            open: true,
            openDialogUser: false,
            openDialogModule: false,
            openDialogModule2: false,
            openDialogModule3: false,
            datas1: [],
            datas2: [],
            value: 0,

            columns1: [
                { title: 'Localização', field: 'localizacao' },
                { title: 'Latitude', field: 'lat' },
                { title: 'Longitude', field: 'lng' },
            ],
            columns2: [
                { title: 'Nome', field: 'name' },
                { title: 'Email', field: 'email' },
                { title: 'Tipo', field: 'type' },
            ],

            localizacao: "",
            coordenadas: "",

            name: "",
            email: "",
            type: "",

            lat: undefined,
            lng: undefined,
            module: "",
            nome: "",
            nomeError: false,
            moduleError: false,
            moduleError2: false,
            moduleAlreadyAssigned: false,
            sameUserError: false,
            snackOpen: false,
            users: [],
            newUser: undefined,
            dupAlert: false,
            userError: false,
            isDono: false,
            prefsOpen: false,
            tempMin: "",
            tempMax: "",
            airHumidityMin: "",
            airHumidityMax: "",
            soloHumidityMin: "",
            soloHumidityMax: "",
            isWetMin: "",
            isWetMax: "",
            pluviosidadeMin: "",
            pluviosidadeMax: "",
            velVentoMin: "",
            velVentoMax: "",
            dirVentoMin: "",
            dirVentoMax: "",
            radiacaoMin: "",
            radiacaoMax: ""
        }
    };
    static contextType = AuthContext;

    componentDidMount() {
        services.avisos.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
        services.vinha.getUsersVinha(this.props.match.params.id).then(data => this.setState({ datas2: data })).catch();
        services.vinha.getModulesVinha(this.props.match.params.id).then(data => this.setState({ datas1: data })).catch();
        services.user.userSimple().then(data => this.setState({ users: data })).catch();
        services.vinha.getDonoVinha(window.location.hash.split("/")[3]).then(data => {
            if (data[0].dono === this.context.user.id) this.setState({ isDono: true });
            services.avisos.getPrefsSingle({ vinha_id: window.location.hash.split("/")[3], user_id: data[0].dono }).then(data => {
                rows.length = 0;
                if(data.length > 0){
                    this.setState({ prefs: data[0] })
                    rows.push(
                        createData('Temperatura', this.state.prefs.tempMin, this.state.prefs.tempMax),
                        createData('Humidade do ar', this.state.prefs.airHumidityMin, this.state.prefs.airHumidityMax),
                        createData('Humidade do solo', this.state.prefs.soloHumidityMin, this.state.prefs.soloHumidityMax),
                        createData('Folha molhada', this.state.prefs.isWetMin, this.state.prefs.isWetMax),
                        createData('Pluviosidade', this.state.prefs.pluviosidadeMin, this.state.prefs.pluviosidadeMax),
                        createData('Velocidade do vento', this.state.prefs.velVentoMin, this.state.prefs.velVentoMax),
                        createData('Direção do vento', this.state.prefs.dirVentoMin, this.state.prefs.dirVentoMax),
                        createData('Radiação', this.state.prefs.radiacaoMin, this.state.prefs.radiacaoMax),
                    );
                }
            });
        }).catch();
    }

    submitUsers(vinha_id, user_id) {
        if (user_id === this.context.user.id) {
            this.setState({ sameUserError: true });
        } else {
            services.vinha.deleteUser_vinha({ vinha_id: vinha_id, user_id: user_id }).then(data =>{
                services.vinha.getUsersVinha(this.props.match.params.id).then(data => this.setState({ datas2: data })).catch();
            });
        }
    }

    submitModules(module_id) {
        services.vinha.deleteModule_vinha(module_id).then(data =>{
            services.vinha.getModulesVinha(this.props.match.params.id).then(data => this.setState({ datas1: data })).catch();
        });
    }

    handleFormClickUser() {
        this.setState({ openDialogUser: true })
    }

    handleFormcloseUser() {
        this.newUser();
    }

    handleFormClickModule() {
        this.setState({ openDialogModule: true })
    }

    handleFormcloseModule() {
        this.setState({ openDialogModule: false });
        this.setState({ openDialogModule2: true })
    }

    handleFormcloseModule2() {
        services.module.getSingleSecModule(this.state.module).then(data => {
            if (data.length === 1) {
                services.module.getSingleModule(this.state.module).then(data => {
                    if (data.length === 0) {
                        if (this.state.nome !== null && this.state.nome !== undefined && this.state.nome !== "" && this.state.module !== null && this.state.module !== undefined && this.state.module !== "") {
                            this.setState({ openDialogModule2: false, value: 4 });
                        }
                    } else {
                        this.setState({ moduleAlreadyAssigned: true })
                    }
                })
            } else {
                this.setState({ moduleError2: true });
            }
        }).catch();
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    callbackFunction = (childData) => {
        this.setState({ lat: childData.lat, lng: childData.lng });
    };

    newModule = () => {
        if (this.state.lat !== null && this.state.lat !== undefined && this.state.lat !== "" && this.state.lng !== null && this.state.lng !== undefined && this.state.lng !== "") {
            services.module.add({ id: this.state.module, vinha_id: this.props.match.params.id, localizacao: this.state.nome, lat: this.state.lat, lng: this.state.lng });
            services.vinha.getUsersVinha(this.props.match.params.id).then(data => this.setState({ datas2: data, value: 0 })).catch();
            services.vinha.getModulesVinha(this.props.match.params.id).then(data => this.setState({ datas1: data })).catch();
        } else {
            this.setState({ snackOpen: true })
        }
    }

    newUser = () => {
        let dup = false;
        if (this.state.newUser !== null && this.state.newUser !== undefined && this.state.newUser !== "") {
            for (let i = 0; i < this.state.datas2.length; i++) {
                if (this.state.newUser === this.state.datas2[i].user_id) {
                    dup = true;
                }
            }
            if (dup !== true) {
                services.vinha.addUser({ vinha_id: this.props.match.params.id, user_id: this.state.newUser }).then(data =>{
                    services.vinha.getUsersVinha(this.props.match.params.id).then(data => this.setState({ datas2: data, value: 1 })).catch();
                    services.vinha.getModulesVinha(this.props.match.params.id).then(data => this.setState({ datas1: data })).catch();
                });
                services.avisos.insertUserPrefs({
                    vinha_id: window.location.hash.split("/")[3],
                    user_id: this.state.newUser,
                    tempMin: -10,
                    tempMax: 40,
                    airHumidityMin: 0,
                    airHumidityMax: 100,
                    soloHumidityMin: 0,
                    soloHumidityMax: 100,
                    isWetMin: 0,
                    isWetMax: 6999,
                    pluviosidadeMin: 0,
                    pluviosidadeMax: 1000,
                    velVentoMin: 0,
                    velVentoMax: 500,
                    dirVentoMin: 0,
                    dirVentoMax: 360,
                    radiacaoMin: 0,
                    radiacaoMax: 500
                })
                this.setState({ openDialogUser: false })
            } else {
                this.setState({ dupAlert: true });
            }
        }

    }

    nomeChange = (e) => {
        if (e !== null && e !== undefined && e !== "") {
            this.setState({ nomeError: false })
        } else {
            this.setState({ nomeError: true })
        }
        this.setState({ nome: e });
    }

    moduleChange = (e) => {
        if (e !== null && e !== undefined && e !== "") {
            this.setState({ moduleError: false })
        } else {
            this.setState({ moduleError: true })
        }
        this.setState({ module: e });
        this.setState({ moduleError2: false });
        this.setState({ moduleAlreadyAssigned: false })
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackOpen: false })
    };

    closeError = () => {
        this.setState({ sameUserError: false });
    }

    clickPrefsBtn() {
        this.setState({ prefsOpen: true })
        if(this.state.prefs !== undefined){
            this.setState({
                tempMin: this.state.prefs.tempMin,
                tempMax: this.state.prefs.tempMax,
                airHumidityMin: this.state.prefs.airHumidityMin,
                airHumidityMax: this.state.prefs.airHumidityMax,
                soloHumidityMin: this.state.prefs.soloHumidityMin,
                soloHumidityMax: this.state.prefs.soloHumidityMax,
                isWetMin: this.state.prefs.isWetMin,
                isWetMax: this.state.prefs.isWetMax,
                pluviosidadeMin: this.state.prefs.pluviosidadeMin,
                pluviosidadeMax: this.state.prefs.pluviosidadeMax,
                velVentoMin: this.state.prefs.velVentoMin,
                velVentoMax: this.state.prefs.velVentoMax,
                dirVentoMin: this.state.prefs.dirVentoMin,
                dirVentoMax: this.state.prefs.dirVentoMax,
                radiacaoMin: this.state.prefs.radiacaoMin,
                radiacaoMax: this.state.prefs.radiacaoMax
            })
        }
    }

    closePrefs(){
        this.setState({prefsOpen: false})
    }

    handlePrefsSubmit(){
        this.setState({prefsOpen: false})
        services.avisos.updateUserPrefs({
            vinha_id : window.location.hash.split("/")[3],
            user_id : this.context.user.id,
            tempMin: this.state.tempMin,
            tempMax: this.state.tempMax,
            airHumidityMin: this.state.airHumidityMin,
            airHumidityMax: this.state.airHumidityMax,
            soloHumidityMin: this.state.soloHumidityMin,
            soloHumidityMax: this.state.soloHumidityMax,
            isWetMin: this.state.isWetMin,
            isWetMax: this.state.isWetMax,
            pluviosidadeMin: this.state.pluviosidadeMin,
            pluviosidadeMax: this.state.pluviosidadeMax,
            velVentoMin: this.state.velVentoMin,
            velVentoMax: this.state.velVentoMax,
            dirVentoMin: this.state.dirVentoMin,
            dirVentoMax: this.state.dirVentoMax,
            radiacaoMin: this.state.radiacaoMin,
            radiacaoMax: this.state.radiacaoMax
        }).then(
            window.location.reload()
        ).catch(err => console.log(err));
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
                            Estações
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
                            <Tab label="Estações" />
                            <Tab label="Utilizadores" />
                            <Tab label="Localização" />
                            <Tab label="Preferências" />
                        </Tabs>
                    </Paper>

                    {this.state.value === 0 &&
                        <Container maxWidth="lg" className={classes.container}>

                            <MaterialTable
                                icons={tableIcons}
                                title="Lista de Estações"
                                columns={this.state.columns1}
                                data={this.state.datas1}
                                options={{
                                    actionsColumnIndex: -1,

                                }}
                                onRowClick={(event, rowData) => this.props.history.push(`/data/${rowData.module_id}`)}
                                actions={[
                                    {
                                        icon: AddBox,
                                        tooltip: 'Add Modulo',
                                        isFreeAction: true,
                                        onClick: () => this.handleFormClickModule()
                                    }
                                ]}
                                editable={this.state.isDono === true && {
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.setState({ localizacao: newData.localizacao });
                                                this.setState({ nome: newData.Nome });
                                                this.setState({ coordenadas: newData.coordenadas })
                                                this.submit(oldData.vinha_id, 'update');
                                            }, 600);
                                        }),
                                    onRowDelete: (oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.submitModules(oldData.module_id);
                                            }, 600);
                                        }),
                                }}
                            />


                        </Container>

                    }


                    {this.state.value === 1 &&
                        <Container maxWidth="lg" className={classes.container}>

                            <MaterialTable
                                icons={tableIcons}
                                title="Lista de utilizadores"
                                columns={this.state.columns2}
                                data={this.state.datas2}
                                options={{
                                    actionsColumnIndex: -1,

                                }}
                                onRowClick={(event, rowData) => this.props.history.push('/user/' + rowData.user_id)}

                                actions={this.state.isDono === true && [
                                    {
                                        icon: AddBox,
                                        tooltip: 'Adicionar utilizador',
                                        isFreeAction: true,
                                        onClick: () => this.handleFormClickUser()
                                    }
                                ]}
                                editable={this.state.isDono === true && {
                                    onRowDelete: (oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.submitUsers(this.props.match.params.id, oldData.user_id);
                                            }, 600);
                                        }),
                                }}
                            />


                        </Container>

                    }

                    {this.state.value === 2 &&
                        <Container maxWidth="lg" className={classes.containerMap}>

                            <ShowMap vinha={this.props.match.params.id} />
                        </Container>


                    }
                    {this.state.value === 3 &&
                        <container>
                            <TableContainer component={Paper} style={tableStyle}>
                                <Table className={classes.table} aria-label="simple table" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style = {headerStyle} align="center">Nome</TableCell>
                                            <TableCell style = {headerStyle} align="center">Mínimo</TableCell>
                                            <TableCell style = {headerStyle} align="center">Máximo</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.nome}>
                                                <TableCell component="th" scope="row" align="center">
                                                    {row.nome}
                                                </TableCell>
                                                <TableCell align="center">{row.min}</TableCell>
                                                <TableCell align="center">{row.max}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {this.state.isDono &&
                            <Button
                                variant="contained"
                                color="primary"
                                style={prefsBtn}
                                className={classes.button}
                                startIcon={<SettingsIcon />}
                                onClick={() => { this.clickPrefsBtn() }}
                            >
                                Preferências de alertas
                            </Button>
                            }
                        </container>
                    }
                    {this.state.value === 4 &&
                        <Container maxWidth="lg" className={classes.containerMap}>
                            <div className={classes.root}>
                                <Snackbar open={this.state.snackOpen} autoHideDuration={6000} onClose={this.handleSnackClose}>
                                    <Alert onClose={this.handleSnackClose} severity="error">
                                        Precisa de escolher a sua localização.
                            </Alert>
                                </Snackbar>
                            </div>
                            <h2 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }} textAlign="center">Localização da estação</h2>
                            <ClickMap parentCallback={this.callbackFunction} />
                            <Button variant="contained" color="primary" style={{ left:"2%", top:"1%" }} onClick={() => this.newModule()}>
                                SEGUINTE
                    </Button>
                        </Container>


                    }
                    <Container maxWidth="lg" className={classes.container}>
                        <Dialog open={this.state.openDialogUser} onClose={() => this.setState({ openDialogUser: false })} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Adicionar um utilizador</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Para adicionar um utilizador à sua vinha escreva o username ou o nome.
                            </DialogContentText>
                                <Autocomplete
                                    id="free-solo-demo"
                                    PopperComponent={"bottom-start"}
                                    fullWidth
                                    options={this.state.users}
                                    getOptionLabel={(option) => option.username + ": " + option.name + " " + option.surname}
                                    renderOption={(option) => (
                                        <React.Fragment fullWidth>
                                            <Avatar className={classes.green}>{option.name.charAt(0) + option.surname.charAt(0)}</Avatar>
                                            {option.username}: {option.name} {option.surname}
                                        </React.Fragment>
                                    )}
                                    onChange={(event, newValue) => {
                                        this.setState({ userError: false });
                                        if (newValue != null) this.setState({ newUser: newValue.user_id })
                                        else {
                                            this.setState({ newUser: null });
                                            this.setState({ userError: true });
                                        }
                                        this.setState({ dupAlert: false })
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            {...params}
                                            label="Escolha um utilizador"
                                            variant="outlined"
                                            error={this.state.userError}
                                        />
                                    )}
                                />

                            </DialogContent>
                            <Container>
                                <Collapse in={this.state.dupAlert}>
                                    <Alert severity="error"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    this.setState({ dupAlert: false })
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        O utilizador que tentou adicionar já esta associado a esta vinha
                                    </Alert>
                                </Collapse>
                            </Container>
                            <DialogActions>
                                <Button onClick={() => this.handleFormcloseUser()} color="primary">
                                    Adicionar
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={this.state.openDialogModule} onClose={() => this.setState({ openDialogModule: false })} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Criar uma estação</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Para criar uma estação, terá de introduzir o número de série da mesma.
                             </DialogContentText>
                                <DialogContentText>
                                    Insira também um nome para lhe ser mais fácil de identificar as estações.
                             </DialogContentText>
                                <DialogContentText>
                                    Terá também de escolher no mapa a sua Localização. Isto ajudará nos cálculos para os tornar mais precisos.
                             </DialogContentText>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleFormcloseModule()} color="primary">
                                    SEGUINTE
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog fullWidth minWidth="500px" open={this.state.openDialogModule2} onClose={() => this.setState({ openDialogModule2: false })} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Criar uma estação</DialogTitle>
                            <DialogContent fullWidth>
                                <FormControl error fullWidth>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        value={this.state.module}
                                        onChange={(evt) => this.moduleChange(evt.target.value)}
                                        label=" Introduza o número de série da sua estação."
                                        aria-describedby="module-error-text"
                                        fullWidth
                                    />
                                    {this.state.moduleError === true &&
                                        <FormHelperText fullWidth id="module-error-text">O ID da estação nao pode ser vazio</FormHelperText>
                                    }
                                    {this.state.moduleError2 === true &&
                                        <FormHelperText fullWidth id="module-error-text">O ID da estação nao e valido</FormHelperText>
                                    }
                                    {this.state.moduleAlreadyAssigned === true &&
                                        <FormHelperText fullWidth id="module-error-text">O ID da estação já está associado a outra vinha</FormHelperText>
                                    }
                                    <TextField
                                        autoFocus
                                        value={this.state.nome}
                                        onChange={(evt) => this.nomeChange(evt.target.value)}
                                        label="Introduza o nome para a sua estação."
                                        aria-describedby="nome-error-text"
                                        fullWidth
                                    />
                                    {this.state.nomeError === true &&
                                        <FormHelperText fullWidth id="module-error-text">O NOME da estação nao pode ser vazio</FormHelperText>
                                    }
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleFormcloseModule2()} color="primary">
                                    SEGUINTE
                                </Button>
                            </DialogActions>

                        </Dialog>
                        <Snackbar open={this.state.sameUserError} autoHideDuration={6000} onClose={this.closeError}>
                            <Alert onClose={this.closeError} severity="error">
                                Nao se pode remover a si mesmo da vinha
                            </Alert>
                        </Snackbar>
                    </Container>
                    <Dialog open={this.state.prefsOpen} onClose={() => this.closePrefs()} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" >Preferências</DialogTitle>
                            <DialogContent>
                                <DialogContentText >
                                    Aqui poderá especificar em que situacões lhe será enviado um email sobre problemas na vinha
                                </DialogContentText>
                                <h6>Temperatura</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="tempMin"
                                    label="Temperatura minima"
                                    name="Temperatura minima"
                                    autoComplete="Temperatura minima"
                                    autoFocus
                                    value={this.state.tempMin} onChange={(evt) => this.setState({ tempMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="tempMax"
                                    label="Temperatura máxima"
                                    name="Temperatura máxima"
                                    autoComplete="Temperatura máxima"
                                    value={this.state.tempMax} onChange={(evt) => this.setState({ tempMax: evt.target.value })}
                                />
                                <h6>Humidade do ar</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="airHumidityMin"
                                    label="Humidade do ar minima"
                                    name="airHumidityMin"
                                    autoComplete="Humidade do ar minima"
                                    value={this.state.airHumidityMin} onChange={(evt) => this.setState({ airHumidityMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="airHumidityMax"
                                    label="Humidade do ar máxima"
                                    name="airHumidityMax"
                                    autoComplete="Humidade do ar máxima"
                                    value={this.state.airHumidityMax} onChange={(evt) => this.setState({ airHumidityMax: evt.target.value })}
                                />
                                <h6>Humidade do solo</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="soloHumidityMin"
                                    label="Humidade do solo minima"
                                    name="soloHumidityMin"
                                    autoComplete="Humidade do solo minima"
                                    value={this.state.soloHumidityMin} onChange={(evt) => this.setState({ soloHumidityMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="soloHumidityMax"
                                    label="Humidade do solo máxima"
                                    name="soloHumidityMax"
                                    autoComplete="Humidade do solo máxima"
                                    value={this.state.soloHumidityMax} onChange={(evt) => this.setState({ soloHumidityMax: evt.target.value })}
                                />
                                <h6>Folha Molhada (entre 0 6999)</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="isWetMin"
                                    label="Valor do sensor de folha molhada minimo"
                                    name="isWetMin"
                                    autoComplete="Valor do sensor de folha molhada minimo"
                                    value={this.state.isWetMin} onChange={(evt) => this.setState({ isWetMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="isWetMax"
                                    label="Valor do sensor de folha molhada maximo"
                                    name="isWetMax"
                                    autoComplete="Valor do sensor de folha molhada maximo"
                                    value={this.state.isWetMax} onChange={(evt) => this.setState({ isWetMax: evt.target.value })}
                                />
                                <h6>Pluviosidade</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="pluviosidadeMin"
                                    label="Pluviosidade minima"
                                    name="pluviosidadeMin"
                                    autoComplete="Pluviosidade minima"
                                    value={this.state.pluviosidadeMin} onChange={(evt) => this.setState({ pluviosidadeMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="pluviosidadeMax"
                                    label="Pluviosidade maxima"
                                    name="pluviosidadeMax"
                                    autoComplete="Pluviosidade maxima"
                                    value={this.state.pluviosidadeMax} onChange={(evt) => this.setState({ pluviosidadeMax: evt.target.value })}
                                />
                                <h6>Velocidade do vento</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="velVentoMin"
                                    label="Velocidade do vento minima"
                                    name="velVentoMin"
                                    autoComplete="Velocidade do vento minima"
                                    value={this.state.velVentoMin} onChange={(evt) => this.setState({ velVentoMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="velVentoMax"
                                    label="Velocidade do vento maxima"
                                    name="velVentoMax"
                                    autoComplete="Velocidade do vento maxima"
                                    value={this.state.velVentoMax} onChange={(evt) => this.setState({ velVentoMax: evt.target.value })}
                                />
                                <h6>Direção do vento em graus (0 a 360)</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="dirVentoMin"
                                    label="Direção do vento minima"
                                    name="dirVentoMin"
                                    autoComplete="Direção do vento minima"
                                    value={this.state.dirVentoMin} onChange={(evt) => this.setState({ dirVentoMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="dirVentoMax"
                                    label="Direção do vento maxima"
                                    name="dirVentoMax"
                                    autoComplete="Direção do vento maxima"
                                    value={this.state.dirVentoMax} onChange={(evt) => this.setState({ dirVentoMax: evt.target.value })}
                                />
                                <h6>Radiação (0 a 500)</h6>
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="radiacaoMin"
                                    label="Radiação minima"
                                    name="radiacaoMin"
                                    autoComplete="Radiação minima"
                                    value={this.state.radiacaoMin} onChange={(evt) => this.setState({ radiacaoMin: evt.target.value })}
                                />
                                <TextField
                                    style={txtField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="radiacaoMax"
                                    label="Radiação maxima"
                                    name="radiacaoMax"
                                    autoComplete="Radiação maxima"
                                    value={this.state.radiacaoMax} onChange={(evt) => this.setState({ radiacaoMax: evt.target.value })}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handlePrefsSubmit()} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog> 
                </main>
            </div >
        )
    }
}
export default withStyles(useStyles)(VinhasDetails)