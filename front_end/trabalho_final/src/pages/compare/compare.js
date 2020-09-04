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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import calcService from '../../services/calc';
import Scatter1line from '../graphs/Scatter1line'
import HumGraph from '../graphs/HumGraph'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import dataService from '../../services/data';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



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



function createData(name, value) {
    return {name, value};
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

class Compare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            data:undefined,
            value: 0,
            value1: 0,
            value2:0,
            checked: true,
            Max: undefined,
            Min: undefined,
            DataInic: new Date(),
            DataFim: new Date(),
            vinhas: [],
            datas: undefined,
            selected: undefined,
            vinhaNome: undefined,
            module:undefined,
            first: true,
            corte: 50,
            oldInic: undefined,
            oldFim:undefined,
            key: 0,
        }
    };
    static contextType = AuthContext;

    componentDidMount() {

        let a;
    vinhaService.getModulesUser(this.context.user.id)
    .then(data =>{a=data[0].modules[0].module_id;
      this.setState({ vinhas: data, selected:data[0].modules[0].module_id });
      vinhaService.getModule(a).then(data => this.setState({module: data[0]}))
    })
        let d = new Date();
       d.setDate(d.getDate() - 7);
       this.setState({DataInic: d});
       let dataIni = calcService.formatedDate(d);
       let dataFim = calcService.formatedDate(this.state.DataFim);
    calcService.etp({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
        data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMin(data); if(M != null){this.setState({key:this.state.key +1 ,oldInic:dataIni, oldFim:dataFim  ,data:data, Max:M[0], Min:M[1], first: false})}}  }).catch();
    }

    handleDateChange = (date) => {
        console.log(date)
       this.setState({DataInic: date})
      };
      handleDateChange1 = (date) => {
        console.log(date)
       this.setState({DataFim: date})
      };


      upd= a =>{
        this.setState({selected: a})
      };

      calcEtp = (dIn, dFim, m_id) =>{
          let dataIni = calcService.formatedDate(dIn);
          let dataFim = calcService.formatedDate(dFim);
          console.log(dataIni);
          calcService.etp({dataInic: dataIni, dataFim: dataFim, module_id: m_id}).then(
              data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMin(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({first: false, checked:true, data:undefined})}  }).catch();
      };

      calcPhum = (dIn, dFim, m_id) =>{
        let dataIni = calcService.formatedDate(dIn);
        let dataFim = calcService.formatedDate(dFim);
        console.log(dataIni);
        calcService.pHum({dataInic: dataIni, dataFim: dataFim, module_id: m_id, corte: this.state.corte}).then(
            data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({first: false, checked:true, data:undefined})}  }).catch();
    };

    calcPinf = (dIn, dFim, m_id) =>{
        let dataIni = calcService.formatedDate(dIn);
        let dataFim = calcService.formatedDate(dFim);
        console.log(dataIni);
        calcService.pInf({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
            data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({first: false, checked:true, data:undefined})}  }).catch();
    };

    calcPHume = (dIn, dFim, m_id) =>{
        let dataIni = calcService.formatedDate(dIn);
        let dataFim = calcService.formatedDate(dFim);
        console.log(dataIni);
        calcService.pHume({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
            data => { console.log(data.length); if(data.length !== 0){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, first: false, checked:false})}else{this.setState({first: false, checked:true, data:undefined})}}).catch();
    };

    calcHFito = (dIn, dFim, m_id) =>{
        let dataIni = calcService.formatedDate(dIn);
        let dataFim = calcService.formatedDate(dFim);
        console.log(dataIni);
        calcService.hFito({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
            data => { console.log(data); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({first: false, checked:true, data:undefined})}  }).catch();
    };

    calcTcrepusc = (dIn, dFim, m_id) =>{
        let dataIni = calcService.formatedDate(dIn);
        let dataFim = calcService.formatedDate(dFim);
        console.log(dataIni);
        calcService.tcrepusc({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
            data => { console.log(data); if(data.length !== 0){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, first: false, checked:false})}else{this.setState({first: false, checked:true, data:undefined})}}).catch();
    };

      handleChange = (event, newValue) => {
        this.setState({ value: newValue });
        if(newValue ===0){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})
            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);
            calcService.etp({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
             data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMin(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false})}}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}  }).catch();
        
        
            }
        if(newValue === 1){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})
            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);
            calcService.pHum({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected, corte: this.state.corte}).then(
                data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}  }).catch();
        }

        if(newValue === 2){
            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})

            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);

            calcService.hFito({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
                data => { console.log(data); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}  }).catch();
        
        }
    };

    handleChange1 = (event, newValue) => {
        this.setState({ value1: newValue });
        if(newValue ===0){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})

            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);

            calcService.pHum({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected, corte: this.state.corte}).then(
                data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}  }).catch();
        
        
            }
        if(newValue === 1){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})

            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);

            calcService.pInf({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
                data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}  }).catch();
                
        }
        if(newValue === 2){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})

            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);

            calcService.pHume({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
                data => { console.log(data.length); if(data.length !== 0){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, first: false, checked:false})} else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}}).catch();
                
        }
    };

    handleChange2 = (event, newValue) => {
        this.setState({ value2: newValue });
        if(newValue ===0){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})

            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);

            calcService.hFito({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
                data => { console.log(data); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}  }).catch();
        
        
            }
        if(newValue === 1){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})

            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);

            calcService.pInf({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
                data => { console.log(data.length); if(data.length !== 0){let M = calcService.MaxMinPhum(data); if(M != null){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, Max:M[0], Min:M[1], first: false, checked:false})}}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}  }).catch();
                
        }
        if(newValue === 2){

            let d = new Date();
            console.log(d);
            this.setState({DataFim: d});
            let f = new Date();
            f.setDate(f.getDate() - 7);
            this.setState({DataInic: f})

            let dataIni = calcService.formatedDate(f);
            let dataFim = calcService.formatedDate(d);

            calcService.tcrepusc({dataInic: dataIni, dataFim: dataFim, module_id: this.state.selected}).then(
                data => { console.log(data); if(data.length !== 0){this.setState({key:this.state.key +1, oldInic:dataIni, oldFim:dataFim  , data:data, first: false, checked:false})}else{this.setState({data:undefined, Max:undefined, Min:undefined, first:true, checked:true})}}).catch();
                
        }
    };

    corteupd = (a) => {
        console.log(a);
        if(a <=100 && a>=0){
            this.setState({corte: a});
        }
        
    }


    render() {
        var rows = [{name:"yes", value:"no"}]
        const { logout } = this.context;
        const { classes } = this.props;
        if(this.state.data !== undefined && this.state.module !== undefined){

                if(this.state.value === 0){
                    rows = [
                        createData('Nome da Estação:', this.state.module.localizacao),
                        createData('Nome da Vinha:', "Vinha das Videiras"),
                        createData('Coordenadas:', this.state.module.lat +" "+ this.state.module.lng),
                        createData('Dia de Início:', this.state.oldInic),
                        createData('Dia de Término:', this.state.oldFim),
                        createData('ETP maximo registado:', this.state.Max),
                        createData('ETP minimo registado:', this.state.Min),
                      ];
                }
                if(this.state.value === 1){
                    if(this.state.value1 === 0){
                        rows = [
                            createData('Nome da Estação:', this.state.module.localizacao),
                            createData('Nome da Vinha:', "Vinha das Videiras"),
                            createData('Coordenadas:', this.state.module.lat +" "+ this.state.module.lng),
                            createData('Dia de Início:', this.state.oldInic),
                            createData('Dia de Término:', this.state.oldFim),
                            createData('Humidade maxima registado:', this.state.Max),
                            createData('Humidade minima registado:', this.state.Min),
                          ];
                    }
                    if(this.state.value1 === 1){
                        rows = [
                            createData('Nome da Estação:', this.state.module.localizacao),
                            createData('Nome da Vinha:', "Vinha das Videiras"),
                            createData('Coordenadas:', this.state.module.lat +" "+ this.state.module.lng),
                            createData('Dia de Início:', this.state.oldInic),
                            createData('Dia de Término:', this.state.oldFim),
                            createData('Humidade maxima registado:', this.state.Max),
                            createData('Humidade minima registado:', this.state.Min),
                          ];
                    }
                    if(this.state.value1 === 2){
                        rows = [
                            createData('Nome da Estação:', this.state.module.localizacao),
                            createData('Nome da Vinha:', "Vinha das Videiras"),
                            createData('Coordenadas:', this.state.module.lat +" "+ this.state.module.lng),
                            createData('Dia de Início:', this.state.oldInic),
                            createData('Dia de Término:', this.state.oldFim),
                            createData('Períodos de humectacão', ''),
                          ];
                    }
                }
                if(this.state.value === 2){
                    if(this.state.value2 === 0){
                        rows = [
                            createData('Nome da Estação:', this.state.module.localizacao),
                            createData('Nome da Vinha:', "Vinha das Videiras"),
                            createData('Coordenadas:', this.state.module.lat +" "+ this.state.module.lng),
                            createData('Dia de Início:', this.state.oldInic),
                            createData('Dia de Término:', this.state.oldFim),
                            createData('Temperatura máxima registado:', this.state.Max),
                            createData('Temperatura minima registado:', this.state.Min),
                          ];
                    }
                    if(this.state.value2 === 1){
                        rows = [
                            createData('Nome da Estação:', this.state.module.localizacao),
                            createData('Nome da Vinha:', "Vinha das Videiras"),
                            createData('Coordenadas:', this.state.module.lat +" "+ this.state.module.lng),
                            createData('Dia de Início:', this.state.oldInic),
                            createData('Dia de Término:', this.state.oldFim),
                            createData('Temperatura máxima registado:', this.state.Max),
                            createData('Temperatura minima registado:', this.state.Min),
                          ];
                    }
                    if(this.state.value2 === 2){
                        rows = [
                            createData('Nome da Estação:', this.state.module.localizacao),
                            createData('Nome da Vinha:', "Vinha das Videiras"),
                            createData('Coordenadas:', this.state.module.lat +" "+ this.state.module.lng),
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
                            Modulos
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
                    {this.state.value ===1 &&
                        <Paper className={classes.root} style = {{backgroundColor: "#f8f8f8"}}>
                        <Tabs
                            value={this.state.value1}
                            onChange={this.handleChange1}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            className={classes.Tabs}
                        >
                            <Tab label="Periodos de humidade" />
                            <Tab label="Periodos de Infeção" />
                            <Tab label="Periodos de Humectaçao" />
                        </Tabs>
                    </Paper>
                    
                    }
                    {this.state.value ===2 &&
                        <Paper className={classes.root} style = {{backgroundColor: "#f8f8f8"}}>
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
                             <Collapse in={this.state.checked}  style = {{backgroundColor: "#f3f3f3"}}>

                                {this.state.vinhas !== undefined &&
                                <div style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                                <FormControl className={classes.formControl}>
                                <InputLabel className={classes.menu} htmlFor="grouped-native-select">Modules</InputLabel>
                                <Select className={classes.menu}
                                    value={this.state.selected ? this.state.selected : ''} onChange={(evt)=>this.upd(evt.target.value)}
                                >
                                    {this.state.vinhas.map((vinha, index) => {
                                    let a =[];
                                    a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                                        for(let i=0;i<vinha.modules.length;i++){
                                        a.push(<MenuItem className={classes.menu}  value={vinha.modules[i].module_id}>
                                            {vinha.modules[i].localizacao}
                                        </MenuItem>) 
                                        }
                                        return(a)
                                        }

                                    )}
                                </Select>
                                </FormControl>
                                </div>
                            }

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around" style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                                <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Data de Início"
                                value={this.state.DataInic}
                                onChange={(evt)=>this.handleDateChange(evt)}
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
                                onChange={(evt)=>this.handleDateChange1(evt)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                             </Grid>
                             </MuiPickersUtilsProvider>
                             <div className={classes.colapseButton} >
                                    <IconButton onClick={()=> this.calcEtp(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                        <DoubleArrowIcon />
                                    </IconButton>
                                </div>
                             </Collapse>
                             {this.state.checked === true ?(
                                 <div className={classes.colapseButton}>
                                 <IconButton onClick={() => this.setState({checked: false})}>
                                     <ExpandLessIcon />
                                 </IconButton>
                                </div>

                             ):(
                                <div className={classes.colapseButton}>
                                <IconButton onClick={() => this.setState({checked: true})}>
                                    <ExpandMoreIcon />
                                </IconButton>
                               </div>
                             )}
                             {this.state.first === true && 
                                <h3 style = {{textAlign:"center"}}>Está na Página de Cálculos, Por favor insira a data de inicio e Fim e o modulo.</h3>
                             }
                            {this.state.data !== undefined ? (
                                <div>
                                <Container maxWidth="lg" className={classes.container} style = {{"width":"75%"}}>
                                    <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Vinha:</h1>
                                <TableContainer className={classes.table} component={Paper}>
                                    <Table aria-label="simple table" >
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell style={{fontWeight: "bold"}} component="th" scope="row"> {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
    
    
                                </Container>
                                                
                                <Container maxWidth="lg" className={classes.container}>
                                    {console.log(this.state.data)}
                                        <Scatter1line key = {this.state.key} title = {"Evapotranspiração"} data = {this.state.data} />
                                </Container>
                                </div>
                            ):(
                                <div>
                                    {this.state.first !== true &&
                                <Container maxWidth="lg" className={classes.container}>
                                <p>Não existem dados suficientes para fazer o calculo da evapotranspiracao, se este erro persistir por favor entrar em contacto</p>
                                </Container> 
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
                       
                    <Collapse in={this.state.checked}  style = {{backgroundColor: "#f3f3f3"}}>

                       {this.state.vinhas !== undefined &&
                       <div style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                       <FormControl className={classes.formControl}>
                       <InputLabel className={classes.menu} htmlFor="grouped-native-select">Modules</InputLabel>
                       <Select className={classes.menu}
                           value={this.state.selected ? this.state.selected : ''} onChange={(evt)=>this.upd(evt.target.value)}
                       >
                           {this.state.vinhas.map((vinha, index) => {
                           let a =[];
                           a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                               for(let i=0;i<vinha.modules.length;i++){
                               a.push(<MenuItem className={classes.menu}  value={vinha.modules[i].module_id}>
                                   {vinha.modules[i].localizacao}
                               </MenuItem>) 
                               }
                               return(a)
                               }

                           )}
                       </Select>
                       </FormControl>
                       </div>
                   }

                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <Grid container justify="space-around" style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                       <KeyboardDatePicker
                       disableToolbar
                       variant="inline"
                       format="dd/MM/yyyy"
                       margin="normal"
                       id="date-picker-inline2"
                       label="Data de Início"
                       value={this.state.DataInic}
                       onChange={(evt)=>this.handleDateChange(evt)}
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
                       onChange={(evt)=>this.handleDateChange1(evt)}
                       KeyboardButtonProps={{
                           'aria-label': 'change date',
                       }}
                       />
                        <TextField inputProps={{ min: "0", max: "100", step: "1" }}  type="number" id="outlined-basic" label="Corte" variant="outlined" value={this.state.corte} onChange = {(val)=>this.corteupd(val.target.value)}/>
                    </Grid>
                    </MuiPickersUtilsProvider>
                    <div className={classes.colapseButton} >
                           <IconButton onClick={()=> this.calcPhum(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                               <DoubleArrowIcon />
                           </IconButton>
                       </div>
                    </Collapse>

                    {this.state.checked === true ?(
                        <div className={classes.colapseButton}>
                        <IconButton onClick={() => this.setState({checked: false})}>
                            <ExpandLessIcon />
                        </IconButton>
                       </div>

                    ):(
                       <div className={classes.colapseButton}>
                       <IconButton onClick={() => this.setState({checked: true})}>
                           <ExpandMoreIcon />
                       </IconButton>
                      </div>
                    )}
                    {this.state.first === true && 
                       <h3 style = {{textAlign:"center"}}>Está na Página de Cálculos, Por favor insira a data de inicio e Fim e o modulo.</h3>
                    }
                   {this.state.data !== undefined ? (
                       <div>
                       <Container maxWidth="lg" className={classes.container} style = {{"width":"75%"}}>
                           <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Vinha:</h1>
                       <TableContainer className={classes.table} component={Paper}>
                           <Table aria-label="simple table" >
                               <TableBody>
                                   {rows.map((row) => (
                                       <TableRow key={row.name}>
                                           <TableCell style={{fontWeight: "bold"}} component="th" scope="row"> {row.name}
                                           </TableCell>
                                           <TableCell align="center">{row.value}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       </TableContainer>


                       </Container>
                                       
                       <Container maxWidth="lg" className={classes.container}>
                           {console.log(this.state.data)}
                               <HumGraph value = {0} key = {this.state.key} title = {"Períodos de Humidade"} data = {this.state.data} corte = {this.state.corte} />
                       </Container>
                       </div>
                   ):(

                    <div>
                    {this.state.first !== true &&
                         <Container maxWidth="lg" className={classes.container}>
                            <p>Não existem dados suficientes para fazer o calculo da evapotranspiracao, se este erro persistir por favor entrar em contacto</p>
                            </Container> 
                    }
                </div> 

                   )}
                    
                    
               </Container>
               }
            </div>
            <div>
                {this.state.value1 === 1 &&
                    <Container maxWidth="lg" className={classes.container}>
                       
                    <Collapse in={this.state.checked}  style = {{backgroundColor: "#f3f3f3"}}>

                       {this.state.vinhas !== undefined &&
                       <div style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                       <FormControl className={classes.formControl}>
                       <InputLabel className={classes.menu} htmlFor="grouped-native-select">Modules</InputLabel>
                       <Select className={classes.menu}
                           value={this.state.selected ? this.state.selected : ''} onChange={(evt)=>this.upd(evt.target.value)}
                       >
                           {this.state.vinhas.map((vinha, index) => {
                           let a =[];
                           a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                               for(let i=0;i<vinha.modules.length;i++){
                               a.push(<MenuItem className={classes.menu}  value={vinha.modules[i].module_id}>
                                   {vinha.modules[i].localizacao}
                               </MenuItem>) 
                               }
                               return(a)
                               }

                           )}
                       </Select>
                       </FormControl>
                       </div>
                   }

                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <Grid container justify="space-around" style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                       <KeyboardDatePicker
                       disableToolbar
                       variant="inline"
                       format="dd/MM/yyyy"
                       margin="normal"
                       id="date-picker-inline2"
                       label="Data de Início"
                       value={this.state.DataInic}
                       onChange={(evt)=>this.handleDateChange(evt)}
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
                       onChange={(evt)=>this.handleDateChange1(evt)}
                       KeyboardButtonProps={{
                           'aria-label': 'change date',
                       }}
                       />
                    </Grid>
                    </MuiPickersUtilsProvider>
                    <div className={classes.colapseButton} >
                           <IconButton onClick={()=> this.calcPinf(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                               <DoubleArrowIcon />
                           </IconButton>
                       </div>
                    </Collapse>

                    {this.state.checked === true ?(
                        <div className={classes.colapseButton}>
                        <IconButton onClick={() => this.setState({checked: false})}>
                            <ExpandLessIcon />
                        </IconButton>
                       </div>

                    ):(
                       <div className={classes.colapseButton}>
                       <IconButton onClick={() => this.setState({checked: true})}>
                           <ExpandMoreIcon />
                       </IconButton>
                      </div>
                    )}
                    {this.state.first === true && 
                       <h3 style = {{textAlign:"center"}}>Está na Página de Cálculos, Por favor insira a data de inicio e Fim e o modulo.</h3>
                    }
                   {this.state.data !== undefined ? (
                       <div>
                       <Container maxWidth="lg" className={classes.container} style = {{"width":"75%"}}>
                           <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Vinha:</h1>
                       <TableContainer className={classes.table} component={Paper}>
                           <Table aria-label="simple table" >
                               <TableBody>
                                   {rows.map((row) => (
                                       <TableRow key={row.name}>
                                           <TableCell style={{fontWeight: "bold"}} component="th" scope="row"> {row.name}
                                           </TableCell>
                                           <TableCell align="center">{row.value}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       </TableContainer>


                       </Container>
                                       
                       <Container maxWidth="lg" className={classes.container}>
                           {console.log(this.state.data)}
                               <HumGraph value = {0} key = {this.state.key} title = {"Períodos de Infecção"} data = {this.state.data} corte = {90} />
                       </Container>
                       </div>
                   ):(

                    <div>
                    {this.state.first !== true &&
                         <Container maxWidth="lg" className={classes.container}>
                            <p>Não existem dados suficientes para fazer o calculo da evapotranspiracao, se este erro persistir por favor entrar em contacto</p>
                            </Container> 
                    }
                </div>  

                   )}
                     
               </Container>
                }
            </div>
            <div>
                {this.state.value1 === 2 &&
                    <Container maxWidth="lg" className={classes.container}>
                       
                    <Collapse in={this.state.checked}  style = {{backgroundColor: "#f3f3f3"}}>

                       {this.state.vinhas !== undefined &&
                       <div style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                       <FormControl className={classes.formControl}>
                       <InputLabel className={classes.menu} htmlFor="grouped-native-select">Modules</InputLabel>
                       <Select className={classes.menu}
                           value={this.state.selected ? this.state.selected : ''} onChange={(evt)=>this.upd(evt.target.value)}
                       >
                           {this.state.vinhas.map((vinha, index) => {
                           let a =[];
                           a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                               for(let i=0;i<vinha.modules.length;i++){
                               a.push(<MenuItem className={classes.menu}  value={vinha.modules[i].module_id}>
                                   {vinha.modules[i].localizacao}
                               </MenuItem>) 
                               }
                               return(a)
                               }

                           )}
                       </Select>
                       </FormControl>
                       </div>
                   }

                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                   <Grid container justify="space-around" style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                       <KeyboardDatePicker
                       disableToolbar
                       variant="inline"
                       format="dd/MM/yyyy"
                       margin="normal"
                       id="date-picker-inline2"
                       label="Data de Início"
                       value={this.state.DataInic}
                       onChange={(evt)=>this.handleDateChange(evt)}
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
                       onChange={(evt)=>this.handleDateChange1(evt)}
                       KeyboardButtonProps={{
                           'aria-label': 'change date',
                       }}
                       />
                    </Grid>
                    </MuiPickersUtilsProvider>
                    <div className={classes.colapseButton} >
                           <IconButton onClick={()=> this.calcPHume(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                               <DoubleArrowIcon />
                           </IconButton>
                       </div>
                    </Collapse>

                    {this.state.checked === true ?(
                        <div className={classes.colapseButton}>
                        <IconButton onClick={() => this.setState({checked: false})}>
                            <ExpandLessIcon />
                        </IconButton>
                       </div>

                    ):(
                       <div className={classes.colapseButton}>
                       <IconButton onClick={() => this.setState({checked: true})}>
                           <ExpandMoreIcon />
                       </IconButton>
                      </div>
                    )}
                    {this.state.first === true && 
                       <h3 style = {{textAlign:"center"}}>Está na Página de Cálculos, Por favor insira a data de inicio e Fim e o modulo.</h3>
                    }
                   {this.state.data !== undefined ? (
                       <div>
                       <Container maxWidth="lg" className={classes.container} style = {{"width":"75%"}}>
                           <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Vinha:</h1>
                       <TableContainer className={classes.table} component={Paper}>
                           <Table aria-label="simple table" >
                               <TableBody>
                                   {rows.map((row) => (
                                       <TableRow key={row.name}>
                                           <TableCell style={{fontWeight: "bold"}} component="th" scope="row"> {row.name}
                                           </TableCell>
                                           <TableCell align="center">{row.value}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       </TableContainer>


                       </Container>
                                       
                       <Container maxWidth="lg" className={classes.container}>
                       <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Períodos de Humectacção</h1>
                       <TableContainer className={classes.table} component={Paper}>
                           <Table aria-label="simple table" >
                               <TableBody>
                                   {this.state.data.map((row) => (
                                       <TableRow key={row.inic}>
                                           <TableCell style={{fontWeight: "bold"}} component="th" scope="row">Início: {row.inic}
                                           </TableCell>
                                           <TableCell align="center">Fim: {row.fim}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       </TableContainer>
                       </Container>
                       </div>
                   ):(

                    <div>
                    {this.state.first !== true &&
                         <Container maxWidth="lg" className={classes.container}>
                            <p>Não existem dados suficientes para fazer o calculo da evapotranspiracao, se este erro persistir por favor entrar em contacto</p>
                            </Container> 
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
                        
                     <Collapse in={this.state.checked}  style = {{backgroundColor: "#f3f3f3"}}>
 
                        {this.state.vinhas !== undefined &&
                        <div style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                        <FormControl className={classes.formControl}>
                        <InputLabel className={classes.menu} htmlFor="grouped-native-select">Modules</InputLabel>
                        <Select className={classes.menu}
                            value={this.state.selected ? this.state.selected : ''} onChange={(evt)=>this.upd(evt.target.value)}
                        >
                            {this.state.vinhas.map((vinha, index) => {
                            let a =[];
                            a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                                for(let i=0;i<vinha.modules.length;i++){
                                a.push(<MenuItem className={classes.menu}  value={vinha.modules[i].module_id}>
                                    {vinha.modules[i].localizacao}
                                </MenuItem>) 
                                }
                                return(a)
                                }
 
                            )}
                        </Select>
                        </FormControl>
                        </div>
                    }
 
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline2"
                        label="Data de Início"
                        value={this.state.DataInic}
                        onChange={(evt)=>this.handleDateChange(evt)}
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
                        onChange={(evt)=>this.handleDateChange1(evt)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                     </Grid>
                     </MuiPickersUtilsProvider>
                     <div className={classes.colapseButton} >
                            <IconButton onClick={()=> this.calcHFito(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                <DoubleArrowIcon />
                            </IconButton>
                        </div>
                     </Collapse>
 
                     {this.state.checked === true ?(
                         <div className={classes.colapseButton}>
                         <IconButton onClick={() => this.setState({checked: false})}>
                             <ExpandLessIcon />
                         </IconButton>
                        </div>
 
                     ):(
                        <div className={classes.colapseButton}>
                        <IconButton onClick={() => this.setState({checked: true})}>
                            <ExpandMoreIcon />
                        </IconButton>
                       </div>
                     )}
                     {this.state.first === true && 
                        <h3 style = {{textAlign:"center"}}>Está na Página de Cálculos, Por favor insira a data de inicio e Fim e o modulo.</h3>
                     }
                    {this.state.data !== undefined ? (
                        <div>
                        <Container maxWidth="lg" className={classes.container} style = {{"width":"75%"}}>
                            <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Vinha:</h1>
                        <TableContainer className={classes.table} component={Paper}>
                            <Table aria-label="simple table" >
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell style={{fontWeight: "bold"}} component="th" scope="row"> {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
 
 
                        </Container>
                                        
                        <Container maxWidth="lg" className={classes.container}>
                            {console.log(this.state.data)}
                                <HumGraph value = {1} key = {this.state.key} title = {"Horas Fitoativas"} data = {this.state.data} corte = {null} />
                        </Container>
                        </div>
                    ):(
 
                        <div>
                            {this.state.first !== true &&
                         <Container maxWidth="lg" className={classes.container}>
                            <p>Não existem dados suficientes para fazer o calculo da evapotranspiracao, se este erro persistir por favor entrar em contacto</p>
                            </Container> 
                    }
                </div>  
 
                    )}
                     
                     
                </Container>
                }
             </div>
             <div>
                 {this.state.value2 === 1 &&
                     <Container maxWidth="lg" className={classes.container}>
                        
                     <Collapse in={this.state.checked}  style = {{backgroundColor: "#f3f3f3"}}>
 
                        {this.state.vinhas !== undefined &&
                        <div style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                        <FormControl className={classes.formControl}>
                        <InputLabel className={classes.menu} htmlFor="grouped-native-select">Modules</InputLabel>
                        <Select className={classes.menu}
                            value={this.state.selected ? this.state.selected : ''} onChange={(evt)=>this.upd(evt.target.value)}
                        >
                            {this.state.vinhas.map((vinha, index) => {
                            let a =[];
                            a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                                for(let i=0;i<vinha.modules.length;i++){
                                a.push(<MenuItem className={classes.menu}  value={vinha.modules[i].module_id}>
                                    {vinha.modules[i].localizacao}
                                </MenuItem>) 
                                }
                                return(a)
                                }
 
                            )}
                        </Select>
                        </FormControl>
                        </div>
                    }
 
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline2"
                        label="Data de Início"
                        value={this.state.DataInic}
                        onChange={(evt)=>this.handleDateChange(evt)}
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
                        onChange={(evt)=>this.handleDateChange1(evt)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                     </Grid>
                     </MuiPickersUtilsProvider>
                     <div className={classes.colapseButton} >
                            <IconButton onClick={()=> this.calcEtp(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                <DoubleArrowIcon />
                            </IconButton>
                        </div>
                     </Collapse>
 
                     {this.state.checked === true ?(
                         <div className={classes.colapseButton}>
                         <IconButton onClick={() => this.setState({checked: false})}>
                             <ExpandLessIcon />
                         </IconButton>
                        </div>
 
                     ):(
                        <div className={classes.colapseButton}>
                        <IconButton onClick={() => this.setState({checked: true})}>
                            <ExpandMoreIcon />
                        </IconButton>
                       </div>
                     )}
                     {this.state.first === true && 
                        <h3 style = {{textAlign:"center"}}>Está na Página de Cálculos, Por favor insira a data de inicio e Fim e o modulo.</h3>
                     }
                    {this.state.data !== undefined ? (
                        <div>
                        <Container maxWidth="lg" className={classes.container} style = {{"width":"75%"}}>
                            <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Vinha:</h1>
                        <TableContainer className={classes.table} component={Paper}>
                            <Table aria-label="simple table" >
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell style={{fontWeight: "bold"}} component="th" scope="row"> {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
 
 
                        </Container>
                                        
                        <Container maxWidth="lg" className={classes.container}>
                            {console.log(this.state.data)}
                                <HumGraph key = {this.state.key} title = {"Períodos de Infecção"} data = {this.state.data} corte = {90} />
                        </Container>
                        </div>
                    ):(
 
                        <div>
                    {this.state.first !== true &&
                         <Container maxWidth="lg" className={classes.container}>
                            <p>Não existem dados suficientes para fazer o calculo da evapotranspiracao, se este erro persistir por favor entrar em contacto</p>
                            </Container> 
                    }
                </div>  
 
                    )}
                      
                </Container>
                 }
             </div>
             <div>
                 {this.state.value2 === 2 &&
                     <Container maxWidth="lg" className={classes.container}>
                        
                     <Collapse in={this.state.checked}  style = {{backgroundColor: "#f3f3f3"}}>
 
                        {this.state.vinhas !== undefined &&
                        <div style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                        <FormControl className={classes.formControl}>
                        <InputLabel className={classes.menu} htmlFor="grouped-native-select">Modules</InputLabel>
                        <Select className={classes.menu}
                            value={this.state.selected ? this.state.selected : ''} onChange={(evt)=>this.upd(evt.target.value)}
                        >
                            {this.state.vinhas.map((vinha, index) => {
                            let a =[];
                            a.push(<ListSubheader>{vinha.nome}</ListSubheader>)
                                for(let i=0;i<vinha.modules.length;i++){
                                a.push(<MenuItem className={classes.menu}  value={vinha.modules[i].module_id}>
                                    {vinha.modules[i].localizacao}
                                </MenuItem>) 
                                }
                                return(a)
                                }
 
                            )}
                        </Select>
                        </FormControl>
                        </div>
                    }
 
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style = {{"width":"65%","flex":"1", "margin":"auto"}}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline2"
                        label="Data de Início"
                        value={this.state.DataInic}
                        onChange={(evt)=>this.handleDateChange(evt)}
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
                        onChange={(evt)=>this.handleDateChange1(evt)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                     </Grid>
                     </MuiPickersUtilsProvider>
                     <div className={classes.colapseButton} >
                            <IconButton onClick={()=> this.calcTcrepusc(this.state.DataInic, this.state.DataFim, this.state.selected)}>
                                <DoubleArrowIcon />
                            </IconButton>
                        </div>
                     </Collapse>
 
                     {this.state.checked === true ?(
                         <div className={classes.colapseButton}>
                         <IconButton onClick={() => this.setState({checked: false})}>
                             <ExpandLessIcon />
                         </IconButton>
                        </div>
 
                     ):(
                        <div className={classes.colapseButton}>
                        <IconButton onClick={() => this.setState({checked: true})}>
                            <ExpandMoreIcon />
                        </IconButton>
                       </div>
                     )}
                     {this.state.first === true && 
                        <h3 style = {{textAlign:"center"}}>Está na Página de Cálculos, Por favor insira a data de inicio e Fim e o modulo.</h3>
                     }
                    {this.state.data !== undefined ? (
                        <div>
                        <Container maxWidth="lg" className={classes.container} style = {{"width":"75%"}}>
                            <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Vinha:</h1>
                        <TableContainer className={classes.table} component={Paper}>
                            <Table aria-label="simple table" >
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell style={{fontWeight: "bold"}} component="th" scope="row"> {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
 
 
                        </Container>
                                        
                        <Container maxWidth="lg" className={classes.container}>
                        <h1 style= {{"font-size": "medium", "padding": "5px",fontWeight: "bold"}}>Períodos de Humectacção</h1>
                        <TableContainer className={classes.table} component={Paper}>
                            <Table aria-label="simple table" >
                                <TableBody>
                                    {this.state.data.map((row) => (
                                        <TableRow key={row.inic}>
                                            <TableCell style={{fontWeight: "bold"}} component="th" scope="row">Data: {row.date}
                                            </TableCell>
                                            <TableCell align="center" style={{fontWeight: "bold"}}>Temperatura: {row.temp}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Container>
                        </div>
                    ):(
 
                        <div>
                        {this.state.first !== true &&
                             <Container maxWidth="lg" className={classes.container}>
                                <p>Não existem dados suficientes para fazer o calculo da evapotranspiracao, se este erro persistir por favor entrar em contacto</p>
                                </Container> 
                        }
                    </div>  
 
                    )}
                      
                </Container>
                 }
             </div>
             </div>

                    
                }

                </main>
            </div >
        )
    }
}
export default withStyles(useStyles)(Compare)