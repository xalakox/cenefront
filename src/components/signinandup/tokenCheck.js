
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import { checkSignUpToken, createNewUser } from './_actions';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  container: {
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});
class TokenCheck extends React.Component {
  constructor(props) {
    super(props);
    const { signUpToken } = queryString.parse(props.location.search);
    this.state = { checked: false, password: '', nombre: '', signUpToken };
  }
  componentDidMount() {
    const { signUpToken } = queryString.parse(this.props.location.search);
    this.props.checkSignUpToken(signUpToken);
  }
  componentWillReceiveProps(next) {
    if (this.props.loading && !next.loading) {
      this.setState({ checked: true });
    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleNewUser = () => {
    this.props.createNewUser(this.state.signUpToken, this.state.nombre, this.state.password);
  }
  render() {
    const { classes, signUpTokenOk, loading } = this.props;
    const loader = <CircularProgress className={classes.progress} />;
    const errorMsj = (
      <Typography gutterBottom variant="h5" component="h2">
        Link Inválido o expirado.<br />
        <Link to="/signUp">Intentar de Nuevo</Link>
      </Typography>
    );
    const allGood = (
      <div>
        <Typography gutterBottom variant="h5" component="h2">
          Configura tu cuenta
        </Typography>
        <TextField
          id="nombre"
          label="Nombre Completo"
          className={classes.textField}
          value={this.state.nombre}
          onChange={this.handleChange('nombre')}
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
          onClick={this.handleNewUser}
        >
        Guardar Contraseña
        </Button>
      </div>
    );
    return (
      <CardContent className={classes.container}>
        { !this.state.checked ? loader : ( signUpTokenOk ? allGood: errorMsj )}
      </CardContent>
    );
  }
}

TokenCheck.propTypes = {
  checkSignUpToken: PropTypes.func,
  classes: PropTypes.object,
  createNewUser: PropTypes.func,
  loading: PropTypes.bool,
  location: PropTypes.object,
  signUpTokenOk: PropTypes.bool,
};


const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  signUpTokenOk: auth.signUpTokenOk,
});

export default connect(mapStateToProps, {
  checkSignUpToken,
  createNewUser,
})(withStyles(styles)(TokenCheck));

