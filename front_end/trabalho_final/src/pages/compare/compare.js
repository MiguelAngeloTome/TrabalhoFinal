import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
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
import AuthContext from "../../configs/authContext";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Scatter1line from '../graphs/Scatter1line'
import HumGraph from '../graphs/HumGraph'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import services from "../../services";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';



function createData(name, value) {
    return { name, value };
}

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
    colapseButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    container1: {
        paddingTop: theme.spacing(0.1),
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
        //alignItems: 'center',
        //justifyContent: 'center',
        margin: theme.spacing(1),
        minWidth: 300,
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

const cardAlert = {
    textAlign: "center",
    position: "relative",
    width: "60%",
    top: "10%",
    marginRight: "auto",
    marginLeft: "auto"
}

const corteStyle = {
    marginTop: "1%",
    position: "relative",
}

class Compare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            open: true,
            data: undefined,
            value: 0,
            value1: 0,
            value2: 0,
            checked: true,
            Max: undefined,
            Min: undefined,
            DataInic: new Date(),
            DataFim: new Date(),
            vinhas: [],
            datas: undefined,
            selected: undefined,
            vinhaNome: undefined,
            oldVinhaNome: undefined,
            module: undefined,
            oldModule: undefined,
            first: true,
            corte: 50,
            max: 50,
            min: 10,
            critico:0, 
            oldInic: undefined,
            oldFim: undefined,
            key: 0,
            emailDialogOpen: false,
            empty:false,
        }
    };
    static contextType = AuthContext;

    componentDidMount() {
        services.avisos.CountUserAvisos(this.context.user.id).then(data => this.setState({ count: data })).catch();
        let a;
        services.vinha.getModulesUser(this.context.user.id)
            .then(data => {
                this.setState({ vinhas: data });
                if (data.length > 0 && data[0].modules.length > 0) {
                    console.log(data)
                    a = data[0].modules[0].module_id;
                    this.setState({ selected: data[0].modules[0].module_id });
                    services.vinha.getModule(a).then(data =>{ this.setState({ module: data[0] });
                                                services.vinha.getOne(data[0].vinha_id).then(data =>{ this.setState({ vinhaNome: data[0].Nome })})         
                                                                                    });
                }
            })
        let d = new Date();
        d.setDate(d.getDate() - 7);
        this.setState({ DataInic: d });
        let dataIni = services.calc.formatedDate(d);
        let dataFim = services.calc.formatedDate(this.state.DataFim);
        services.calc.etp({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
            data => { if (data.length !== 0) { let M = services.calc.MaxMin(data); if (M != null) { this.setState({ key: this.state.key + 1, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false }) } } }).catch();
    }

    handleDateChange = (date) => {
        this.setState({ DataInic: date })
    };
    handleDateChange1 = (date) => {
        this.setState({ DataFim: date })
    };


    upd = a => {
        this.setState({ selected: a })
        services.vinha.getModule(a).then(data =>{ this.setState({ module: data[0] });
                                                services.vinha.getOne(data[0].vinha_id).then(data =>{ this.setState({ vinhaNome: data[0].Nome })})         
                                                                                    });
    };

    calcEtp = (dIn, dFim, m_id) => {
        let dataIni = services.calc.formatedDate(dIn);
        let dataFim = services.calc.formatedDate(dFim);
        services.calc.etp({ dataInic: dataIni, dataFim: dataFim, module_id: m_id }).then(
            data => {console.log(data); if (data.length !== 0) {let M = services.calc.MaxMin(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ first: false, checked: true, data: undefined }) } }).catch();
    };

    calcPhum = (dIn, dFim, m_id) => {
        let dataIni = services.calc.formatedDate(dIn);
        let dataFim = services.calc.formatedDate(dFim);
        services.calc.pHum({ dataInic: dataIni, dataFim: dataFim, module_id: m_id, corte: this.state.corte }).then(
            data => {console.log(data); if (data.length === undefined){this.setState({ first: false, checked: true, data: undefined,empty:false })}else{ if (data.length !== 0) { let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ first: false, checked: true, data: undefined,empty:true }) } }}).catch();
    };

    calcPinf = (dIn, dFim, m_id) => {
        let dataIni = services.calc.formatedDate(dIn);
        let dataFim = services.calc.formatedDate(dFim);
        services.calc.pInf({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
            data => { if (data.length === undefined){this.setState({ first: false, checked: true, data: undefined,empty:false })}else{ if (data.length !== 0) { let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ first: false, checked: true, data: undefined,empty:true }) } }}).catch(this.setState({ first: false, checked: true, data: undefined,empty:false }));
    };

    calcPHume = (dIn, dFim, m_id) => {
        let dataIni = services.calc.formatedDate(dIn);
        let dataFim = services.calc.formatedDate(dFim);
        services.calc.pHume({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
            data => {if (data.length === undefined){this.setState({ first: false, checked: true, data: undefined,empty:false })}else{ if (data.length !== 0) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, first: false, checked: false }) } else { this.setState({ first: false, checked: true, data: undefined,empty:true }) }} }).catch();
    };

    calcHFito = (dIn, dFim, m_id) => {
        let dataIni = services.calc.formatedDate(dIn);
        let dataFim = services.calc.formatedDate(dFim);
        services.calc.hFito({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
            data => { console.log(data);if (data.length !== 0) { let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ first: false, checked: true, data: undefined }) } }).catch(err => console.log(err));
    };
    calcHFrio= (dIn, dFim, m_id) => {
        let dataIni = services.calc.formatedDate(dIn);
        let dataFim = services.calc.formatedDate(dFim);
        services.calc.hFrio({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected, max: this.state.max, min: this.state.min, critico: this.state.critico }).then(
            data => { console.log(data);if (data.length !== 0) {  this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, first: false, checked: false }) } else { this.setState({ first: false, checked: true, data: undefined }) } }).catch(err => console.log(err));
    };

    calcTcrepusc = (dIn, dFim, m_id) => {
        let dataIni = services.calc.formatedDate(dIn);
        let dataFim = services.calc.formatedDate(dFim);
        services.calc.tcrepusc({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
            data => { if (data.length !== 0) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, first: false, checked: false }) } else { this.setState({ first: false, checked: true, data: undefined }) } }).catch();
    };

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
        if (newValue === 0) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })
            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);
            services.calc.etp({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
                data => { if (data.length !== 0) { let M = services.calc.MaxMin(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false }) } } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));


        }
        if (newValue === 1) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })
            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);
            services.calc.pHum({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected, corte: this.state.corte }).then(
                data => { if (data.length === undefined){this.setState({ first: true, checked: true, data: undefined })}else{if (data.length !== 0) { let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }}).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));
        }

        if (newValue === 2) {
            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })

            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);

            services.calc.hFito({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
                data => { if (data.length !== 0) { let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ value2:0,key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }).catch(this.setState({ value2:0, data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));

        }
    };

    handleChange1 = (event, newValue) => {
        this.setState({ value1: newValue });
        if (newValue === 0) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })

            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);

            services.calc.pHum({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected, corte: this.state.corte }).then(
                data => { if (data.length === undefined){this.setState({ first: true, checked: true, data: undefined })}else{if (data.length !== 0) { let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }}).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));


        }
        if (newValue === 1) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })

            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);

            services.calc.pInf({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
                data => { if (data.length === undefined){this.setState({ first: true, checked: true, data: undefined })}else{if (data.length === undefined){this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true })}else{if (data.length !== 0) { console.log(data.length);let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }}}).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));

        }
        if (newValue === 2) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })

            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);

            services.calc.pHume({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
                data => {if (data.length === undefined){this.setState({ first: true, checked: true, data: undefined })}else{ if (data.length !== 0) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, first: false, checked: false }) } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }}).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));

        }
    };

    handleChange2 = (event, newValue) => {
        this.setState({ value2: newValue });
        if (newValue === 0) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })

            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);

            services.calc.hFito({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
                data => { if (data.length !== 0) { let M = services.calc.MaxMinPhum(data); if (M != null) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, Max: M[0], Min: M[1], first: false, checked: false }) } } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));


        }
        if (newValue === 1) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })

            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);

            services.calc.hFrio({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected, max: this.state.max, min: this.state.min, critico: this.state.critico }).then(
                data => { console.log(data);if (data.length !== 0) {  this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, first: false, checked: false }) } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));

        }
        if (newValue === 2) {

            let d = new Date();
            this.setState({ DataFim: d });
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({ DataInic: f })

            let dataIni = services.calc.formatedDate(f);
            let dataFim = services.calc.formatedDate(d);

            services.calc.tcrepusc({ dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected }).then(
                data => { if (data.length !== 0) { this.setState({ key: this.state.key + 1, oldModule:this.state.module, oldVinhaNome:this.state.vinhaNome, oldInic: dataIni, oldFim: dataFim, data: data, first: false, checked: false }) } else { this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }) } }).catch(this.setState({ data: undefined, Max: undefined, Min: undefined, first: true, checked: true }));

        }
    };

    corteupd = (a) => {
        if (a <= 100 && a >= 0) {
            this.setState({ corte: a });
        }

    }

    maxeupd = (a) => {
        if (a <= 60 && a >= -10) {
            this.setState({ max: a });
        }

    }

    mineupd = (a) => {
        if (a <= 60 && a >= -10) {
            this.setState({ min: a });
        }

    }

    criticoeupd = (a) => {
        if (a <= 60 && a >= -10) {
            this.setState({ critico: a });
        }

    }

    ExcelClick = (tipo) => {
        let send = [];
        for(let i = 0; i < this.state.data.length; i++){
            send[i] = {Data:this.state.data[i].date, Valor:this.state.data[i].value}
        }
        services.excel.Excel(this.context.user.id, send, this.state.module.vinha_id, this.state.module.localizacao, tipo);
        this.setState({ emailDialogOpen: true });
    }

    handleEmailDialogClose = () => {
        this.setState({ emailDialogOpen: false });
    }


    render() {
        var rows = [{ name: "yes", value: "no" }]
        const { logout } = this.context;
        const { classes } = this.props;
        if (this.state.data !== undefined && this.state.oldModule !== undefined) {

            if (this.state.value === 0) {
                rows = [
                    createData('Nome da Estação:', this.state.oldModule.localizacao),
                    createData('Nome da Vinha:', this.state.oldVinhaNome),
                    createData('Coordenadas:', this.state.oldModule.lat + " " + this.state.oldModule.lng),
                    createData('Dia de Início:', this.state.oldInic),
                    createData('Dia de Término:', this.state.oldFim),
                    createData('ETP máximo registado:', this.state.Max),
                    createData('ETP mínimo registado:', this.state.Min),
                ];
            }
            if (this.state.value === 1) {
                if (this.state.value1 === 0) {
                    rows = [
                        createData('Nome da Estação:', this.state.oldModule.localizacao),
                        createData('Nome da Vinha:', this.state.oldVinhaNome),
                        createData('Coordenadas:', this.state.oldModule.lat + " " + this.state.oldModule.lng),
                        createData('Dia de Início:', this.state.oldInic),
                        createData('Dia de Término:', this.state.oldFim),
                        createData('Humidade máxima registado:', this.state.Max),
                        createData('Humidade mínima registado:', this.state.Min),
                    ];
                }
                if (this.state.value1 === 1) {
                    rows = [
                        createData('Nome da Estação:', this.state.oldModule.localizacao),
                        createData('Nome da Vinha:', this.state.oldVinhaNome),
                        createData('Coordenadas:', this.state.oldModule.lat + " " + this.state.oldModule.lng),
                        createData('Dia de Início:', this.state.oldInic),
                        createData('Dia de Término:', this.state.oldFim),
                        createData('Humidade máxima registado:', this.state.Max),
                        createData('Humidade mínima registado:', this.state.Min),
                    ];
                }
                if (this.state.value1 === 2) {
                    rows = [
                        createData('Nome da Estação:', this.state.oldModule.localizacao),
                        createData('Nome da Vinha:', this.state.oldVinhaNome),
                        createData('Coordenadas:', this.state.oldModule.lat + " " + this.state.oldModule.lng),
                        createData('Dia de Início:', this.state.oldInic),
                        createData('Dia de Término:', this.state.oldFim),
                    ];
                }
            }
            if (this.state.value === 2) {
                if (this.state.value2 === 0) {
                    rows = [
                        createData('Nome da Estação:', this.state.oldModule.localizacao),
                        createData('Nome da Vinha:', this.state.oldVinhaNome),
                        createData('Coordenadas:', this.state.oldModule.lat + " " + this.state.oldModule.lng),
                        createData('Dia de Início:', this.state.oldInic),
                        createData('Dia de Término:', this.state.oldFim),
                    ];
                }
                if (this.state.value2 === 1) {
                    rows = [
                        createData('Nome da Estação:', this.state.oldModule.localizacao),
                        createData('Nome da Vinha:', this.state.oldVinhaNome),
                        createData('Coordenadas:', this.state.oldModule.lat + " " + this.state.oldModule.lng),
                        createData('Dia de Início:', this.state.oldInic),
                        createData('Dia de Término:', this.state.oldFim),
                    ];
                }
                if (this.state.value2 === 2) {
                    rows = [
                        createData('Nome da Estação:', this.state.oldModule.localizacao),
                        createData('Nome da Vinha:',this.state.oldVinhaNome),
                        createData('Coordenadas:', this.state.oldModule.lat + " " + this.state.oldModule.lng),
                        createData('Dia de Início:', this.state.oldInic),
                        createData('Dia de Término:', this.state.oldFim),
                    ];
                }
            }

        }


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
                            Cálculos
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
                            <Tab label="Evapotranspiração" />
                            <Tab label="Inimigos da Cultura" />
                            <Tab label="Fisiologia da Cultura" />
                        </Tabs>
                    </Paper>
                    {this.state.value === 1 &&
                        <Paper className={classes.root} style={{ backgroundColor: "#f8f8f8" }}>
                            <Tabs
                                value={this.state.value1}
                                onChange={this.handleChange1}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                className={classes.Tabs}
                            >
                                <Tab label="Períodos de humidade" />
                                <Tab label="Períodos de Infeção" />
                                <Tab label="Períodos de Humectação" />
                            </Tabs>
                        </Paper>

                    }
                    {this.state.value === 2 &&
                        <Paper className={classes.root} style={{ backgroundColor: "#f8f8f8" }}>
                            <Tabs
                                value={this.state.value2}
                                onChange={this.handleChange2}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                className={classes.Tabs}
                            >
                                <Tab label="Horas Fitoativas" />
                                <Tab label="Horas de Frio" />
                                <Tab label="Temperaturas crepusculares" />
                            </Tabs>
                        </Paper>

                    }

                    {this.state.value === 0 &&
                        <Container maxWidth="lg" className={classes.container}>
                            <Collapse in={this.state.checked} style={{ backgroundColor: "#f3f3f3" }}>

                                {this.state.vinhas !== undefined &&
                                    <div style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
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
                                    </div>
                                }

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Data de Início"
                                            value={this.state.DataInic}
                                            onChange={(evt) => this.handleDateChange(evt)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline1"
                                            label="Data de Termino"
                                            value={this.state.DataFim}
                                            onChange={(evt) => this.handleDateChange1(evt)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <div className={classes.colapseButton} >
                                    <IconButton onClick={() => this.calcEtp(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                        <DoubleArrowIcon />
                                    </IconButton>
                                </div>
                            </Collapse>
                            {this.state.checked === true ? (
                                <div className={classes.colapseButton}>
                                    <IconButton onClick={() => this.setState({ checked: false })}>
                                        <ExpandLessIcon />
                                    </IconButton>
                                </div>

                            ) : (
                                    <div className={classes.colapseButton}>
                                        <IconButton onClick={() => this.setState({ checked: true })}>
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </div>
                                )}
                            {this.state.first === true &&
                                <h3 style={{ textAlign: "center" }}>Está na Página de Cálculos, Por favor insira a data de Início e de Fim e a Estação.</h3>
                            }
                            {this.state.data !== undefined ? (
                                <div>
                                    <Container maxWidth="lg" className={classes.container} style={{ "width": "75%" }}>
                                        <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Vinha:</h1>
                                        <TableContainer className={classes.table} component={Paper}>
                                            <Table aria-label="simple table" >
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <TableRow key={row.name}>
                                                            <TableCell style={{ fontWeight: "bold" }} component="th" scope="row"> {row.name}
                                                            </TableCell>
                                                            <TableCell align="center">{row.value}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                    </Container>

                                    <Container maxWidth="lg" className={classes.container}>
                                        <Scatter1line key={this.state.key} title={"Evapotranspiração"} data={this.state.data} />
                                    </Container>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        endIcon={<EmailIcon />}
                                        onClick={() => { this.ExcelClick("Evapotranspiracao") }}
                                    >
                                        Enviar para email em formato excel
                                </Button>
                                </div>
                            ) : (
                                    <div>
                                        {this.state.first !== true &&
                                            <div style={cardAlert}>
                                                <Card >
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            Não existem dados suficientes para fazer o cálculo da evapotranspiracao, se este erro persistir por favor entrar em contacto
                                                        </Typography>
                                                        <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        }
                                    </div>
                                )}

                        </Container>

                    }


                    {this.state.value === 1 &&
                        <div>
                            <div>
                                {this.state.value1 === 0 &&

                                    <Container maxWidth="lg" className={classes.container}>

                                        <Collapse in={this.state.checked} style={{ backgroundColor: "#f3f3f3" }}>

                                            {this.state.vinhas !== undefined &&
                                                <div style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
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
                                                </div>
                                            }

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline2"
                                                        label="Data de Início"
                                                        value={this.state.DataInic}
                                                        onChange={(evt) => this.handleDateChange(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline3"
                                                        label="Data de Termino"
                                                        value={this.state.DataFim}
                                                        onChange={(evt) => this.handleDateChange1(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <TextField style={corteStyle} inputProps={{ min: "0", max: "100", step: "1" }} type="number" id="outlined-basic" label="Corte" variant="outlined" value={this.state.corte} onChange={(val) => this.corteupd(val.target.value)} />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <div className={classes.colapseButton} >
                                                <IconButton onClick={() => this.calcPhum(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                                    <DoubleArrowIcon />
                                                </IconButton>
                                            </div>
                                        </Collapse>

                                        {this.state.checked === true ? (
                                            <div className={classes.colapseButton}>
                                                <IconButton onClick={() => this.setState({ checked: false })}>
                                                    <ExpandLessIcon />
                                                </IconButton>
                                            </div>

                                        ) : (
                                                <div className={classes.colapseButton}>
                                                    <IconButton onClick={() => this.setState({ checked: true })}>
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        {this.state.first === true &&
                                            <h3 style={{ textAlign: "center" }}>Está na Página de Cálculos, Por favor insira a data de Início e de Fim e a Estação.</h3>
                                        }
                                        {this.state.data !== undefined ? (
                                            <div>
                                                <Container maxWidth="lg" className={classes.container} style={{ "width": "75%" }}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Vinha:</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow key={row.name}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row"> {row.name}
                                                                        </TableCell>
                                                                        <TableCell align="center">{row.value}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>


                                                </Container>

                                                <Container maxWidth="lg" className={classes.container}>
                                                    <HumGraph value={0} key={this.state.key} title={"Períodos de Humidade"} data={this.state.data} corte={this.state.corte} />
                                                </Container>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    endIcon={<EmailIcon />}
                                                    onClick={() => { this.ExcelClick("Períodos de Humidade") }}
                                                >
                                                    Enviar para email em formato excel
                        </Button>
                                            </div>
                                        ) : (

                                                <div>
                                                    {this.state.first !== true &&
                                                    <div>
                                                        {this.state.empty !== true ?(
                                                        <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem dados suficientes para fazer o cálculo dos períodos de humidade, se este erro persistir por favor entrar em contacto
                                                                    </Typography>
                                                                    <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                        ):(
                                                            <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem períodos de humidade.
                                                                    </Typography>
                                                                    <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                            </div> 
                                                        )
                                                        }
                                                        </div>
                                                    }
                                                </div>

                                            )}


                                    </Container>
                                }
                            </div>
                            <div>
                                {this.state.value1 === 1 &&
                                    <Container maxWidth="lg" className={classes.container}>

                                        <Collapse in={this.state.checked} style={{ backgroundColor: "#f3f3f3" }}>

                                            {this.state.vinhas !== undefined &&
                                                <div style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
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
                                                </div>
                                            }

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline2"
                                                        label="Data de Início"
                                                        value={this.state.DataInic}
                                                        onChange={(evt) => this.handleDateChange(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline3"
                                                        label="Data de Termino"
                                                        value={this.state.DataFim}
                                                        onChange={(evt) => this.handleDateChange1(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <div className={classes.colapseButton} >
                                                <IconButton onClick={() => this.calcPinf(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                                    <DoubleArrowIcon />
                                                </IconButton>
                                            </div>
                                        </Collapse>

                                        {this.state.checked === true ? (
                                            <div className={classes.colapseButton}>
                                                <IconButton onClick={() => this.setState({ checked: false })}>
                                                    <ExpandLessIcon />
                                                </IconButton>
                                            </div>

                                        ) : (
                                                <div className={classes.colapseButton}>
                                                    <IconButton onClick={() => this.setState({ checked: true })}>
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        {this.state.first === true &&
                                            <h3 style={{ textAlign: "center" }}>Está na Página de Cálculos, Por favor insira a data de Início e de Fim e a Estação.</h3>
                                        }
                                        {this.state.data !== undefined ? (
                                            <div>
                                                <Container maxWidth="lg" className={classes.container} style={{ "width": "75%" }}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Vinha:</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow key={row.name}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row"> {row.name}
                                                                        </TableCell>
                                                                        <TableCell align="center">{row.value}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>


                                                </Container>

                                                <Container maxWidth="lg" className={classes.container}>
                                                    <HumGraph value={0} key={this.state.key} title={"Períodos de Infecção"} data={this.state.data} corte={90} />
                                                </Container>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    endIcon={<EmailIcon />}
                                                    onClick={() => { this.ExcelClick("Períodos de Infecção") }}
                                                >
                                                    Enviar para email em formato excel
                        </Button>
                                            </div>
                                        ) : (
                                                <div>
                                                    {this.state.first !== true &&
                                                    <div>
                                                        {this.state.empty !== true ?(
                                                        <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem dados suficientes para fazer o cálculo dos períodos de infeção, se este erro persistir por favor entrar em contacto
                                                                    </Typography>
                                                                    <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                        ):(
                                                            <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem períodos de infeção
                                                                    </Typography>
                                                                    <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                            </div> 
                                                        )
                                                        }
                                                        </div>
                                                    }
                                                </div>

                                            )}

                                    </Container>
                                }
                            </div>
                            <div>
                                {this.state.value1 === 2 &&
                                    <Container maxWidth="lg" className={classes.container}>

                                        <Collapse in={this.state.checked} style={{ backgroundColor: "#f3f3f3" }}>

                                            {this.state.vinhas !== undefined &&
                                                <div style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
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
                                                </div>
                                            }

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline2"
                                                        label="Data de Início"
                                                        value={this.state.DataInic}
                                                        onChange={(evt) => this.handleDateChange(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline3"
                                                        label="Data de Termino"
                                                        value={this.state.DataFim}
                                                        onChange={(evt) => this.handleDateChange1(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <div className={classes.colapseButton} >
                                                <IconButton onClick={() => this.calcPHume(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                                    <DoubleArrowIcon />
                                                </IconButton>
                                            </div>
                                        </Collapse>

                                        {this.state.checked === true ? (
                                            <div className={classes.colapseButton}>
                                                <IconButton onClick={() => this.setState({ checked: false })}>
                                                    <ExpandLessIcon />
                                                </IconButton>
                                            </div>

                                        ) : (
                                                <div className={classes.colapseButton}>
                                                    <IconButton onClick={() => this.setState({ checked: true })}>
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        {this.state.first === true &&
                                            <h3 style={{ textAlign: "center" }}>Está na Página de Cálculos, Por favor insira a data de Início e de Fim e a Estação.</h3>
                                        }
                                        {this.state.data !== undefined ? (
                                            <div>
                                                <Container maxWidth="lg" className={classes.container} style={{ "width": "75%" }}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Vinha:</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow key={row.name}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row"> {row.name}
                                                                        </TableCell>
                                                                        <TableCell align="center">{row.value}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>


                                                </Container>

                                                <Container maxWidth="lg" className={classes.container}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Períodos de Humectacção</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {this.state.data.map((row) => (
                                                                    <TableRow key={row.inic}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row">Início: {row.inic}
                                                                        </TableCell>
                                                                        <TableCell style={{ fontWeight: "bold" }} align="center">Fim: {row.fim}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Container>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    endIcon={<EmailIcon />}
                                                    onClick={() => { this.ExcelClick("Períodos de Humectacção") }}
                                                >
                                                    Enviar para email em formato excel
                        </Button>
                                            </div>
                                        ) : (

                                                <div>
                                                    {this.state.first !== true &&
                                                    <div>
                                                        {this.state.empty !== true ?(
                                                        <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem dados suficientes para fazer o cálculo dos períodos de humectação, se este erro persistir por favor entrar em contacto
                                                                    </Typography>
                                                                    <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                        ):(
                                                            <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem períodos de humectação
                                                                    </Typography>
                                                                    <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                            </div> 
                                                        )
                                                        }
                                                        </div>
                                                    }
                                                </div>

                                            )}

                                    </Container>
                                }
                            </div>
                        </div>
                    }
                    {this.state.value === 2 &&
                        <div>
                            <div>
                                {this.state.value2 === 0 &&

                                    <Container maxWidth="lg" className={classes.container}>

                                        <Collapse in={this.state.checked} style={{ backgroundColor: "#f3f3f3" }}>

                                            {this.state.vinhas !== undefined &&
                                                <div style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
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
                                                </div>
                                            }

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline2"
                                                        label="Data de Início"
                                                        value={this.state.DataInic}
                                                        onChange={(evt) => this.handleDateChange(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline3"
                                                        label="Data de Termino"
                                                        value={this.state.DataFim}
                                                        onChange={(evt) => this.handleDateChange1(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <div className={classes.colapseButton} >
                                                <IconButton onClick={() => this.calcHFito(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                                    <DoubleArrowIcon />
                                                </IconButton>
                                            </div>
                                        </Collapse>

                                        {this.state.checked === true ? (
                                            <div className={classes.colapseButton}>
                                                <IconButton onClick={() => this.setState({ checked: false })}>
                                                    <ExpandLessIcon />
                                                </IconButton>
                                            </div>

                                        ) : (
                                                <div className={classes.colapseButton}>
                                                    <IconButton onClick={() => this.setState({ checked: true })}>
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        {this.state.first === true &&
                                            <h3 style={{ textAlign: "center" }}>Está na Página de Cálculos, Por favor insira a data de Início e de Fim e a Estação.</h3>
                                        }
                                        {this.state.data !== undefined ? (
                                            <div>
                                                <Container maxWidth="lg" className={classes.container} style={{ "width": "75%" }}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Vinha:</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow key={row.name}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row"> {row.name}
                                                                        </TableCell>
                                                                        <TableCell align="center">{row.value}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>


                                                </Container>

                                                <Container maxWidth="lg" className={classes.container}>
                                                    <HumGraph value={1} key={this.state.key} title={"Horas Fitoativas"} data={this.state.data} corte={null} />
                                                </Container>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    endIcon={<EmailIcon />}
                                                    onClick={() => { this.ExcelClick("Horas Fitoativas") }}
                                                >
                                                    Enviar para email em formato excel
                        </Button>
                                            </div>
                                        ) : (

                                                <div>
                                                    {this.state.first !== true &&
                                                        <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem dados suficientes para fazer o cálculo das horas fitoativas, se este erro persistir por favor entrar em contacto
                                                                    </Typography>
                                                                    <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    }
                                                </div>

                                            )}


                                    </Container>
                                }
                            </div>
                            <div>
                                {this.state.value2 === 1 &&
                                    <Container maxWidth="lg" className={classes.container}>

                                        <Collapse in={this.state.checked} style={{ backgroundColor: "#f3f3f3" }}>

                                            {this.state.vinhas !== undefined &&
                                                <div style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
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
                                                </div>
                                            }

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline2"
                                                        label="Data de Início"
                                                        value={this.state.DataInic}
                                                        onChange={(evt) => this.handleDateChange(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline3"
                                                        label="Data de Termino"
                                                        value={this.state.DataFim}
                                                        onChange={(evt) => this.handleDateChange1(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </Grid>
                                                     <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                                    <TextField style={corteStyle} inputProps={{ min: "-10", max: "60", step: "1" }} type="number" id="outlined-basic" label="limite superior" variant="outlined" value={this.state.max} onChange={(val) => this.maxeupd(val.target.value)} />
                                                    <TextField style={corteStyle} inputProps={{ min: "-10", max: "60", step: "1" }} type="number" id="outlined-basic" label="limite inferior" variant="outlined" value={this.state.min} onChange={(val) => this.mineupd(val.target.value)} />
                                                    <TextField style={corteStyle} inputProps={{ min: "-10", max: "60", step: "1" }} type="number" id="outlined-basic" label="valor critico" variant="outlined" value={this.state.critico} onChange={(val) => this.criticoeupd(val.target.value)} />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <div className={classes.colapseButton} >
                                                <IconButton onClick={() => this.calcHFrio(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                                    <DoubleArrowIcon />
                                                </IconButton>
                                            </div>
                                        </Collapse>

                                        {this.state.checked === true ? (
                                            <div className={classes.colapseButton}>
                                                <IconButton onClick={() => this.setState({ checked: false })}>
                                                    <ExpandLessIcon />
                                                </IconButton>
                                            </div>

                                        ) : (
                                                <div className={classes.colapseButton}>
                                                    <IconButton onClick={() => this.setState({ checked: true })}>
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        {this.state.first === true &&
                                            <h3 style={{ textAlign: "center" }}>Está na Página de Cálculos, Por favor insira a data de Início e de Fim e a Estação.</h3>
                                        }
                                        {this.state.data !== undefined ? (
                                            <div>
                                                <Container maxWidth="lg" className={classes.container} style={{ "width": "75%" }}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Vinha:</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow key={row.name}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row"> {row.name}
                                                                        </TableCell>
                                                                        <TableCell align="center">{row.value}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>


                                                </Container>

                                                <Container maxWidth="lg" className={classes.container}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Horas de Frio:</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {this.state.data.map((row) => (
                                                                    <TableRow key={row.inic}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row">Dia: {row.date}
                                                                        </TableCell>
                                                                        <TableCell style={{ fontWeight: "bold" }} align="center">Horas de Frio: {row.horas}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Container>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    endIcon={<EmailIcon />}
                                                    onClick={() => { this.ExcelClick("Horas de frio") }}
                                                >
                                                    Enviar para email em formato excel
                        </Button>
                                            </div>
                                        ) : (

                                                <div>
                                                    {this.state.first !== true &&
                                                        <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem dados suficientes para fazer o cálculo das horas de frio, se este erro persistir por favor entrar em contacto
                                                                    </Typography>
                                                                    <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    }
                                                </div>

                                            )}

                                    </Container>
                                }
                            </div>
                            <div>
                                {this.state.value2 === 2 &&
                                    <Container maxWidth="lg" className={classes.container}>

                                        <Collapse in={this.state.checked} style={{ backgroundColor: "#f3f3f3" }}>

                                            {this.state.vinhas !== undefined &&
                                                <div style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
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
                                                </div>
                                            }

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around" style={{ "width": "65%", "flex": "1", "margin": "auto" }}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline2"
                                                        label="Data de Início"
                                                        value={this.state.DataInic}
                                                        onChange={(evt) => this.handleDateChange(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline3"
                                                        label="Data de Termino"
                                                        value={this.state.DataFim}
                                                        onChange={(evt) => this.handleDateChange1(evt)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <div className={classes.colapseButton} >
                                                <IconButton onClick={() => this.calcTcrepusc(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                                    <DoubleArrowIcon />
                                                </IconButton>
                                            </div>
                                        </Collapse>

                                        {this.state.checked === true ? (
                                            <div className={classes.colapseButton}>
                                                <IconButton onClick={() => this.setState({ checked: false })}>
                                                    <ExpandLessIcon />
                                                </IconButton>
                                            </div>

                                        ) : (
                                                <div className={classes.colapseButton}>
                                                    <IconButton onClick={() => this.setState({ checked: true })}>
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </div>
                                            )}
                                        {this.state.first === true &&
                                            <h3 style={{ textAlign: "center" }}>Está na Página de Cálculos, Por favor insira a data de Início e de Fim e a Estação.</h3>
                                        }
                                        {this.state.data !== undefined ? (
                                            <div>
                                                <Container maxWidth="lg" className={classes.container} style={{ "width": "75%" }}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Vinha:</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow key={row.name}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row"> {row.name}
                                                                        </TableCell>
                                                                        <TableCell align="center">{row.value}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>


                                                </Container>

                                                <Container maxWidth="lg" className={classes.container}>
                                                    <h1 style={{ "font-size": "medium", "padding": "5px", fontWeight: "bold" }}>Temperaturas crepusculares</h1>
                                                    <TableContainer className={classes.table} component={Paper}>
                                                        <Table aria-label="simple table" >
                                                            <TableBody>
                                                                {this.state.data.map((row) => (
                                                                    <TableRow key={row.inic}>
                                                                        <TableCell style={{ fontWeight: "bold" }} component="th" scope="row">Data: {row.date}
                                                                        </TableCell>
                                                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Temperatura: {row.temp}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Container>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    endIcon={<EmailIcon />}
                                                    onClick={() => { this.ExcelClick("Temperaturas crepusculares") }}
                                                >
                                                    Enviar para email em formato excel
                        </Button>
                                            </div>
                                        ) : (

                                                <div>
                                                    {this.state.first !== true &&
                                                        <div style={cardAlert}>
                                                            <Card >
                                                                <CardContent>
                                                                    <Typography variant="h5" component="h2">
                                                                        Não existem dados suficientes para fazer o cálculo das temperaturas crepusculares, se este erro persistir por favor entrar em contacto
                                                                    </Typography>
                                                                    <ErrorIcon fontSize="large" style={{ color: red[500] }} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    }
                                                </div>

                                            )}

                                    </Container>
                                }
                            </div>
                        </div>


                    }
                    <Dialog
                        open={this.state.emailDialogOpen}
                        onClose={this.handleEmailDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Email enviado com sucesso"}</DialogTitle>
                        <div style={{textAlign:"center"}}><CheckCircleIcon fontSize="large" style={{ color: green[500] }} /></div>
                        <DialogActions>
                            <Button onClick={this.handleEmailDialogClose} color="primary">
                                OK
                    </Button>
                        </DialogActions>
                    </Dialog>
                </main>
            </div >
        )
    }
}
export default withStyles(useStyles)(Compare)