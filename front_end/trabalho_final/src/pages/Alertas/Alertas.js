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
import AuthContext from "../../configs/authContext";
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import services from "../../services";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

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
    table: {
        minWidth: 650,
    },
});

const cardAlert = {
    textAlign: "center", 
    position: "relative",
    width:"30%",
    top: "10%",
    marginRight:"auto",
    marginLeft:"auto"
}


function createData(id, nome, prioridade, msg, hora, dia) {
    return { id, nome, prioridade, msg, hora, dia };
}

const rows = [];
const drawerWidth = 240;

class Alertas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            open: true,
            datas: [],
            page: 0,
            rowsPerPage: 5,
            noAlertas: false
        }
    };
    static contextType = AuthContext;

    componentDidMount() {
        services.avisos.getUserAvisos(this.context.user.id).then(data => {
            if(data.length === 0) this.setState({noAlertas: true})
            this.setState({ datas: data }); 
            this.sortAlertas();
        }).catch();
        services.avisos.CountUserAvisos(this.context.user.id).then(data => { this.setState({ count: data }) }).catch();
    }

    submitAlertas(id) {
        services.avisos.removeAviso(id);
        window.location.reload();
    }

    sortAlertas() {
        let aux = [];
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < this.state.datas.length; j++) {
                if (this.state.datas[j].prioridade === i) {
                    aux.push(this.state.datas[j]);
                }
            }
        }
        this.setState({ datas: aux });
    }

    render() {
        const { logout } = this.context;
        const { classes } = this.props;

        const handleChangePage = (event, newPage) => {
            this.setState({ page: newPage })
        };

        const handleChangeRowsPerPage = (event) => {
            this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
            this.setState({ page: 0 })
        };
        for (let i = 0; i < this.state.datas.length; i++) {
            rows[i] = createData(this.state.datas[i].id, this.state.datas[i].nomeVinha, this.state.datas[i].prioridade, this.state.datas[i].msgErro, this.state.datas[i].hora, this.state.datas[i].dia);
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
                            Alertas
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

                    {this.state.noAlertas &&
                        <div style={cardAlert}>
                            <Card >
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Não tem nenhum alerta
                                    </Typography>
                                    <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                                </CardContent>
                            </Card>
                        </div>
                    }

                    {this.state.noAlertas === false &&
                    <Container maxWidth="lg" className={classes.container}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    {(this.state.rowsPerPage > 0
                                        ? rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                        : rows
                                    ).map((row) => (
                                        <TableRow key={row.name} style={{ "width": "100%" }}>
                                            <div style={{ "width": "100%" }}>
                                                {row.prioridade === 1 &&
                                                    <TableCell style={{ "width": "1%" }} colspan="2" >
                                                        <Alert severity="error" style={{ "width": "100%" }} action={<IconButton aria-label="delete" color="primary" onClick={() => { this.submitAlertas(row.id) }}>
                                                            <DeleteIcon />
                                                        </IconButton>}>{row.msg} no dia {row.dia.split("T")[0]} as {row.hora} na vinha {row.nome} </Alert>
                                                    </TableCell>
                                                }
                                            </div>

                                            <div>
                                                {row.prioridade === 2 &&
                                                    <TableCell style={{ "width": "1%" }} colspan="2">
                                                        <Alert severity="warning" style={{ "width": "100%" }} action={<IconButton aria-label="delete" color="primary" onClick={() => { this.submitAlertas(row.id) }}>
                                                            <DeleteIcon />
                                                        </IconButton>}>{row.msg} no dia {row.dia.split("T")[0]} as {row.hora} na vinha {row.nome} </Alert>
                                                    </TableCell>
                                                }
                                            </div>

                                            <div>
                                                {row.prioridade === 3 &&
                                                    <TableCell style={{ "width": "1%" }} colspan="2">
                                                        <Alert severity="info" justify="center" style={{ "width": "100%" }} action={<IconButton aria-label="delete" color="primary" onClick={() => { this.submitAlertas(row.id) }}>
                                                            <DeleteIcon />
                                                        </IconButton>}>{row.msg} no dia {row.dia.split("T")[0]} as {row.hora} na vinha {row.nome} </Alert>
                                                    </TableCell>
                                                }
                                            </div>

                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={rows.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'rows per page' },
                                                native: true,
                                            }}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Container>
                    } 
                </main>
            </div >
        )
    }
}
export default withStyles(useStyles)(Alertas)