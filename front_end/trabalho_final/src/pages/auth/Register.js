import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import services from "../../services";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sign: {
    margin: theme.spacing(0, 0, 2),
  },
});

class RegisterPage extends React.Component  {

  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "", name: "", surname: "", type: "",
    isOpen: false }; 
  }
  handleSubmit(evt) {
    evt.preventDefault();
    services.auth.register(this.state).then(()=> {this.setState({isOpen:true})})
    .catch((err) => {console.log(err)})
  }
  handleClose(){
    this.setState({isOpen:false});
  }
  endRegister(){
    this.props.history.push("/");
  }

render(){
  const { classes } = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',}}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={(evt) => this.handleSubmit(evt)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(evt) => this.setState({ username: evt.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                name="Nome"
                autoComplete="Nome"
                onChange={(evt) => this.setState({ name: evt.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Sobrenome"
                name="Sobrenome"
                autoComplete="Sobrenome"
                onChange={(evt) => this.setState({ surname: evt.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="Email"
                autoComplete="Email"
                onChange={(evt) => this.setState({ email: evt.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(evt) => this.setState({ password: evt.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.sign}
            onClick={() => this.props.history.push("/login")}
          >
            Sign In
          </Button>
        </form>
      </div>
      
      <Dialog
        open={this.state.isOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Registado com sucesso
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button href="/"/* onClick={this.endRegister} */ color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>  
      </Container>
    
  );
}
}

export default withStyles(useStyles)(RegisterPage)