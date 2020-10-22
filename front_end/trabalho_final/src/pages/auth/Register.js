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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import FormHelperText from '@material-ui/core/FormHelperText';

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

const cardAlert = {
  padding: "25px 50px 0px 50px"
}

const buttonStyle = {
  textAlign: "center",
  position: "relative",
  marginRight: "auto",
  marginLeft: "auto"
}

class RegisterPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "", password: "", email: "", name: "", surname: "", type: "",
      isOpen: false,
      userNameError: false,
      userNameError2: false,
      userNameError3: false,
      nameError: false,
      nameError2: false,
      sobreNomeError: false,
      sobreNomeError2: false,
      emailError: false,
      emailError2: false,
      passwordError: false,
      passwordError2: false,
    };
  }
  handleSubmit(evt) {
    evt.preventDefault();

    if (!/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/.test(this.state.email)){
      this.setState({emailError2: true});
    }
    
    if(this.state.username.length < 3) this.setState({userNameError3:true})
    if(this.state.name.length < 3) this.setState({nameError2:true})
    if(this.state.surname.length < 3) this.setState({sobreNomeError2:true})
    services.auth.register(this.state).then(() => {
      this.setState({ isOpen: true })
    }).catch((err) => {
      if (err === "username in use") this.setState({userNameError2:true})
      if (err === "invalid email") this.setState({emailError2:true})
      if (err === "invalid password") this.setState({ passwordError2: true })
    })
  }
  handleClose() {
    this.setState({ isOpen: false });
  }

  changeUsername(value) {
    this.setState({ userNameError: false });
    this.setState({ username: value })
    this.setState({ userNameError2: false })
    this.setState({ userNameError3: false })
    if (value === "") this.setState({ userNameError: true })
  }

  changeNome(value) {
    this.setState({ nameError: false });
    this.setState({ name: value });
    this.setState({ nameError2: false });
    if (value === "") this.setState({ nameError: true })
  }

  changeSobrenome(value) {
    this.setState({ sobreNomeError: false });
    this.setState({ sobreNomeError2: false });
    this.setState({ surname: value });
    if (value === "") this.setState({ sobreNomeError: true })
  }

  changeEmail(value) {
    this.setState({ emailError: false });
    this.setState({ email: value });
    this.setState({ emailError2: false })
    if (value === "") this.setState({ emailError: true })
  }

  changePassword(value) {
    this.setState({ passwordError: false });
    this.setState({ password: value });
    this.setState({ passwordError2: false })
    if (value === "") this.setState({ passwordError: true })
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registar
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
                  onChange={(evt) => this.changeUsername(evt.target.value)}
                  aria-describedby="userName-error-text"
                />
                {this.state.userNameError === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O username não pode estar vazio</FormHelperText>
                }
                {this.state.userNameError2 === true &&
                  <FormHelperText error fullWidth id="userName-error-text">Este username não é válido</FormHelperText>
                }
                {this.state.userNameError3 === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O username tem que ser superior a 3 caracteres</FormHelperText>
                }
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
                  onChange={(evt) => this.changeNome(evt.target.value)}
                />
                {this.state.nameError === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O nome não pode estar vazio</FormHelperText>
                }
                {this.state.nameError2 === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O nome tem que ser superior a 3 caracteres</FormHelperText>
                }
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
                  onChange={(evt) => this.changeSobrenome(evt.target.value)}
                />
                {this.state.sobreNomeError === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O sobrenome não pode estar vazio</FormHelperText>
                }
                {this.state.sobreNomeError2 === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O sobrenome tem que ser superior a 3 caracteres</FormHelperText>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  name="Email"
                  autoComplete="Email"
                  onChange={(evt) => this.changeEmail(evt.target.value)}
                />
                {this.state.emailError === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O email não pode estar vazio</FormHelperText>
                }
                {this.state.emailError2 === true &&
                  <FormHelperText error fullWidth id="userName-error-text">O email não é válido</FormHelperText>
                }
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
                  onChange={(evt) => this.changePassword(evt.target.value)}
                />
                {this.state.passwordError === true &&
                  <FormHelperText error fullWidth id="userName-error-text">A password não pode estar vazia</FormHelperText>
                }
                {this.state.passwordError2 === true &&
                  <FormHelperText error fullWidth id="userName-error-text">A password não é válida</FormHelperText>
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registar
          </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.sign}
              onClick={() => this.props.history.push("/login")}
            >
              Log In
          </Button>
          </form>
        </div>

        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={cardAlert}>
            <Typography variant="h5" component="h2">
              Registo efetuado com sucesso
              </Typography>
          </div>
          <DialogActions >
            <Button style={buttonStyle} href="/" color="primary">
              <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

    );
  }
}

export default withStyles(useStyles)(RegisterPage)