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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import services from '../../services/';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogContentText from '@material-ui/core/DialogContentText';
import ClickMap from '../maps/clickMap'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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
    StyledTableCell: {
        backgroundColor: theme.palette.common.black,
        color: '#ffffff',
        fontSize: 14,
    },
    StyledTableRow: {
        backgroundColor: theme.palette.action.hover,
    },
    containerMap: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: "75%",
        minHeight: "25%",
    },
});




class ListaVinhas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            count:0,
            open: true,
            openDialogVinha: false,
            openDialogModule: false,
            openDialogModule2: false,
            datas: [],
            vinhaIdNovo: "",
            columns: [
                { title: 'Name', field: 'Nome' },
                { title: 'Localização', field: 'localizacao' },
            ],
            localizacao: "",
            nome: "",
            coordenadas: "",
            nomeVinha: "",
            lat: "",
            long: "",
            local: "",
            nomeVinhaError: "",
            latError: "",
            longError: "",
            localError: "",
            moduleAlreadyAssigned: false,
            module: "",
            nomeModule: "",
            nomeModuleError: false,
            moduleError: false,
            moduleError2: false,
            latMapa: undefined,
            lngMapa: undefined,
        }
    };
    static contextType = AuthContext;

    componentDidMount() {
        services.avisos.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
        services.vinha.getAllUser(this.context.user.id).then(data => {console.log(data);this.setState({ datas: data })}).catch();
    }

    addVinha() {
        if(this.state.nomeVinha !== null && 
            this.state.nomeVinha !== undefined &&
            this.state.nomeVinha !=="" &&
            this.state.long !== null && 
            this.state.long !== undefined &&
            this.state.long !=="" &&
            this.state.lat !== null && 
            this.state.lat !== undefined &&
            this.state.lat !=="" &&
            this.state.local !== null && 
            this.state.local !== undefined &&
            this.state.local !==""
        ){
            this.setState({openDialogVinha:false});
            this.setState({openDialogModule:true});
        }else{
            this.setState({ snackOpen: true })
        }
    }
    connectUserVinha (data) {
        services.user.addUserVinha({user_id:this.context.user.id, vinha_id:data.vinha_id}).catch();
        services.vinha.getAllUser(this.context.user.id).then(data => this.setState({ datas: data })).catch();
        services.module.add({id: this.state.module, vinha_id: data.vinha_id, localizacao:this.state.nomeModule, lat:this.state.latMapa, lng:this.state.lngMapa});
    }
    
    handleFormClick() {
        this.setState({ openDialogVinha: true })
    }

    submit(id, type) {
        if (type === 'update') {
            services.vinha.update(id, { localizacao: this.state.localizacao, nome: this.state.nome, coordenadas: this.state.coordenadas });
            services.vinha.getAllUser(this.context.user.id).then(data => this.setState({ datas: data })).catch();
        } else {
            services.data.getModulesVinha(id).then(data => {
                for(let i = 0; i < data.length; i++){
                    services.module.remove(data[i].module_id);
                }
                services.user.deleteUserVinha({vinha_id:id, user_id:this.context.user.id}).then(
                    services.vinha.getAllUser(this.context.user.id).then(data => this.setState({ datas: data })).catch()
                );
            });
            
        }

    }

    nomeVinhaChange = (e) =>{
        if(e !== null && e !== undefined && e !==""){
            this.setState({nomeVinhaError: false})
        }else{
            this.setState({nomeVinhaError: true})
        }
        this.setState({nomeVinha:e});
    }

    latChange = (e) =>{
        if(e !== null && e !== undefined && e !==""){
            this.setState({latError: false})
        }else{
            this.setState({latError: true})
        }
        this.setState({lat:e});
    }

    longChange = (e) =>{
        if(e !== null && e !== undefined && e !==""){
            this.setState({longError: false})
        }else{
            this.setState({longError: true})
        }
        this.setState({long:e});
    }

    localChange = (e) =>{
        if(e !== null && e !== undefined && e !==""){
            this.setState({localError: false})
        }else{
            this.setState({localError: true})
        }
        this.setState({local:e});
    }

    handleFormcloseModule() {
        this.setState({ openDialogModule: false });
        this.setState({ openDialogModule2: true })
    }

    handleFormcloseModule2() {
        services.module.getSingleSecModule(this.state.module).then(data =>{
            if(data.length === 1){
                services.module.getSingleModule(this.state.module).then(data => {
                    if(data.length === 0){
                        if(this.state.nomeModule !== null && this.state.nomeModule !== undefined && this.state.nomeModule !=="" && this.state.module !== null && this.state.module !== undefined && this.state.module !==""){
                            this.setState({ openDialogModule2: false, value: 1 });
                        }    
                    }else{
                        this.setState({moduleAlreadyAssigned: true})
                    }
                })
            }else{
                this.setState({ moduleError2: true});
            }
        }).catch();
    }

    nomeModuleChange = (e) =>{
        if(e !== null && e !== undefined && e !==""){
            this.setState({nomeModuleError: false})
        }else{
            this.setState({nomeModuleError: true})
        }
        this.setState({nomeModule:e});
    }

    moduleChange = (e) =>{
        if(e !== null && e !== undefined && e !==""){
            this.setState({moduleError: false})
        }else{
            this.setState({moduleError: true})
        }
        this.setState({module:e});
        this.setState({moduleError2: false});
        this.setState({moduleAlreadyAssigned: false});
    }

    callbackFunction = (childData) => {
        this.setState({latMapa: childData.lat, lngMapa: childData.lng});
    };

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ snackOpen: false })
    };

    newModule = () =>{
        if(this.state.latMapa !== null && this.state.latMapa !== undefined && this.state.latMapa !=="" && this.state.lngMapa !== null && this.state.lngMapa !== undefined && this.state.lngMapa !=="" ){
            services.vinha.add({nome: this.state.nomeVinha,lat:this.state.lat,lng:this.state.long,localizacao:this.state.local,dono:this.context.user.id}).then(data => this.connectUserVinha(data)).catch();
            this.setState({value: 0});
        }else{
            this.setState({ snackOpen: true })
        }
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
                            Vinhas
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
                    
                    {this.state.value === 0 &&
                    <Container maxWidth="lg" className={classes.container}>
                        <MaterialTable
                            icons={tableIcons}
                            title="Lista de Vinhas"
                            columns={this.state.columns}
                            data={this.state.datas}
                            options={{
                                actionsColumnIndex: -1,

                            }}
                            onRowClick={(event, rowData) => this.props.history.push(`/vinhas/details/${rowData.vinha_id}`)}
                            actions={[
                                {
                                    icon: AddBox,
                                    tooltip: 'Adicionar vinha',
                                    isFreeAction: true,
                                    onClick: () => this.handleFormClick()
                                }
                            ]}
                            editable={{
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
                                            this.submit(oldData.vinha_id, '');
                                        }, 600);
                                    }),
                            }}
                        />
                    </Container>
                    }

                    {this.state.value === 1 &&
                        <Container maxWidth="lg" className={classes.containerMap}>
                                <div className={classes.root}>
                                    <Snackbar open={this.state.snackOpen} autoHideDuration={6000} onClose={this.handleSnackClose}>
                                    <Alert onClose={this.handleSnackClose} severity="error">
                                        Precisa de escolher a sua localização.
                                    </Alert>
                                    </Snackbar>
                                </div>
                                <h2 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}} textAlign="center">Criar Modulo</h2>
                                <ClickMap parentCallback = {this.callbackFunction}/>
                                <Button variant="contained" color="primary" style= {{position: "absolute",bottom: 3,right:30}} onClick={() => this.newModule()}>
                                            SEGUINTE
                                </Button>
                        </Container>
                    }





                        <Container maxWidth="lg" className={classes.container}>
                            <Dialog fullWidth minWidth="500px" open={this.state.openDialogVinha} onClose={() => this.setState({openDialogVinha: false})} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Criar uma vinha</DialogTitle>
                                <DialogContent fullWidth>
                                <FormControl error fullWidth>
                                    <TextField autoFocus margin="dense" value={this.state.nomeVinha} onChange = {(evt)=>this.nomeVinhaChange(evt.target.value)} label="Nome da vinha" aria-describedby="nomeVinha-error-text" fullWidth />
                                    {this.state.nomeVinhaError === true &&
                                        <FormHelperText fullWidth id="nomeVinha-error-text">O nome da vinha nao pode estar vazio</FormHelperText>
                                    }
                                    <TextField autoFocus margin="dense" value={this.state.lat} onChange = {(evt)=>this.latChange(evt.target.value)} label="Latitude" aria-describedby="lat-error-text" fullWidth />
                                    {this.state.latError === true &&
                                        <FormHelperText fullWidth id="lat-error-text">A latitude da vinha nao pode estar vazia</FormHelperText>
                                    }
                                    <TextField autoFocus margin="dense" value={this.state.long} onChange = {(evt)=>this.longChange(evt.target.value)} label="Longitude" aria-describedby="long-error-text" fullWidth />
                                    {this.state.longError === true &&
                                        <FormHelperText fullWidth id="long-error-text">A latitude da vinha nao pode estar vazia</FormHelperText>
                                    }
                                    <TextField autoFocus margin="dense" value={this.state.local} onChange = {(evt)=>this.localChange(evt.target.value)} label="Localizacao" aria-describedby="local-error-text" fullWidth />
                                    {this.state.localError === true &&
                                        <FormHelperText fullWidth id="local-error-text">A localização da vinha nao pode estar vazia</FormHelperText>
                                    }
                                </FormControl>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => this.addVinha()} color="primary">
                                        Criar
                                    </Button>
                                </DialogActions>
                            </Dialog>



                            <Dialog open={this.state.openDialogModule} onClose={() => this.setState({openDialogModule:false})} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">CRIAR UM MODULO</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                </DialogContentText>
                                <DialogContentText>
                                    Para criar um módulo terá de introduzir o número de série da sua estação.
                                </DialogContentText>
                                <DialogContentText>
                                    Insira também um nome para lhe ser mais fácil de identificar os módulos.
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

                            <Dialog fullWidth minWidth="500px" open={this.state.openDialogModule2} onClose={() => this.setState({openDialogModule2:false})} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">CRIAR UM MODULO</DialogTitle>
                                <DialogContent fullWidth>
                                <FormControl error fullWidth>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    value={this.state.module}
                                    onChange = {(evt)=>this.moduleChange(evt.target.value)}
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
                                    value={this.state.nomeModule}
                                    onChange = {(evt)=>this.nomeModuleChange(evt.target.value)}
                                    label="Introduza o nome para a sua estação."
                                    aria-describedby="nome-error-text"
                                    fullWidth
                                />
                                {this.state.nomeModuleError === true &&
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
                        </Container>
                </main>
            </div >
        )
    }
}
export default withStyles(useStyles)(ListaVinhas)

