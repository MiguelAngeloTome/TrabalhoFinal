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
import vinhaService from '../../services/vinha';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import dataService from '../../services/data';


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

class VinhasDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count:[{count:0}],
            open: true,
            openDialogUser: false,
            openDialogModule: false,
            datas1: [],
            datas2: [],
            value: 0,

            columns1: [
                { title: 'Localizacao', field: 'localizacao' },
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
        }
    };
    static contextType = AuthContext;

    componentDidMount() {
        dataService.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
        vinhaService.getUsersVinha(this.props.match.params.id).then(data => this.setState({ datas2: data })).catch();
        vinhaService.getModulesVinha(this.props.match.params.id).then(data => this.setState({ datas1: data })).catch();
    }

    submitUsers(vinha_id, user_id) {
        vinhaService.deleteUser_vinha({ vinha_id: vinha_id, user_id: user_id });
        vinhaService.getUsersVinha(this.props.match.params.id).then(data => this.setState({ datas2: data })).catch();
        window.location.reload();
    }

    submitModules(module_id) {
        vinhaService.deleteModule_vinha(module_id);
        vinhaService.getModulesVinha(this.props.match.params.id).then(data => this.setState({ datas1: data })).catch();
        window.location.reload();
    }

    handleFormClickUser() {
        this.setState({ openDialogUser: true })
    }

    handleFormcloseUser() {
        this.setState({ openDialogUser: false })
    }

    handleFormClickModule() {
        this.setState({ openDialogModule: true })
    }

    handleFormcloseModule() {
        this.setState({ openDialogModule: false })
    }

    handleChange = (event, newValue) => {
        console.log(newValue)
        this.setState({ value: newValue });
    };



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
                            Modulos
                        </Typography>
                        <IconButton color="inherit" href="/#/alertas">
                            <Badge badgeContent={this.state.count[0].count} color="secondary">
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
                            <Tab label="Modulos" />
                            <Tab label="Utilizadores" />
                            <Tab label="Localização" />
                        </Tabs>
                    </Paper>

                    {this.state.value === 0 &&
                        <Container maxWidth="lg" className={classes.container}>

                            <MaterialTable
                                icons={tableIcons}
                                title="Lista de modulos"
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
                                editable={{
                                    /*onRowAdd: (newData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.setState({localizacao: newData.localizacao});
                                                this.setState({dono:user.id});
                                                this.submit('','add');
                                            }, 2);
                                        }),*/
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
                         actions={[
                             {
                                 icon: AddBox,
                                 tooltip: 'Add User',
                                 isFreeAction: true,
                                 onClick: () => this.handleFormClickUser()
                             }
                         ]}
                         editable={{
                             /*onRowAdd: (newData) =>
                                 new Promise((resolve) => {
                                     setTimeout(() => {
                                         resolve();
                                         this.setState({localizacao: newData.localizacao});
                                         this.setState({dono:user.id});
                                         this.submit('','add');
                                     }, 2);
                                 }),*/
                             /*onRowUpdate: (newData, oldData) =>
                                 new Promise((resolve) => {
                                     setTimeout(() => {
                                         resolve();
                                         this.setState({ name: newData.name });
                                         this.setState({ email: newData.email });
                                         this.setState({ type: newData.type })
                                         this.submit(oldData.vinha_id, 'update');
                                     }, 600);
                                 }),*/
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

                    <Container maxWidth="lg" className={classes.container}>
                        <Dialog open={this.state.openDialogUser} onClose={() => this.handleFormcloseUser()} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Adicionar um utilizador</DialogTitle>
                            <DialogContent>
                                <TextField autoFocus margin="dense" id="name" label="ID do utilizador" fullWidth />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleFormcloseUser()} color="primary">
                                    Adicionar
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={this.state.openDialogModule} onClose={() => this.handleFormcloseModule()} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Criar um modulo</DialogTitle>
                            <DialogContent>
                                <TextField autoFocus margin="dense" id="name" label="Localizacao" fullWidth />
                                <TextField autoFocus margin="dense" id="name" label="Coordenadas" fullWidth />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleFormcloseModule()} color="primary">
                                    Criar
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </main>
            </div >
        )
    }
}
export default withStyles(useStyles)(VinhasDetails)