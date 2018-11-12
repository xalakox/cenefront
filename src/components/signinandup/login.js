
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doLogin } from './_actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'calc(100% - 50px)',
  },
  divider: {
    margin: '25px 0 25px 0',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleLogin = () => {
    this.props.doLogin(this.state.email, this.state.password);
  }
  render() {
    const { classes, doLogin, loading } = this.props;
    return (
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Usuario Existente
        </Typography>
        <TextField
          id="email"
          label="Correo Electr&oacute;nico"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          type="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="Contrase&ntilde;a"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleLogin}
          disabled={loading}
        >
        Abrir Sesión
        </Button>
        <Divider className={classes.divider} />
        <Link to="/signUp">
          <Typography variant="h6" component="h6">
            ¿ No tienes cuenta ?
          </Typography>
        </Link>
      </CardContent>

    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
});

export default connect(mapStateToProps, {
  doLogin,
})(withStyles(styles)(Login));

