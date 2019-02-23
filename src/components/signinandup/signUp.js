
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { doSignUp } from './_actions';

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

class SignUp extends React.Component {
  state = {
    email: '',
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = () => {
    this.props.doSignUp(this.state.email);
  }

  render() {
    const {
 classes, loading, emailSent, link 
} = this.props;
    return (
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Alta de Usuarios
        </Typography>
        {emailSent ? (
<Typography gutterBottom variant="p" component="p">
          Hemos enviado un correo para confirmar tu cuenta.{link ? <a href={link}>Click Aqui</a> : undefined}
        </Typography>
) : (
<div>
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClick}
            disabled={loading}
          >
            Crear Cuenta
          </Button>
        </div>
)}
        <Divider className={classes.divider} />
        <Link to="/">
          <Typography variant="h6" component="h6">
            ¿ Ya tienes cuenta ?
          </Typography>
        </Link>
      </CardContent>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object,
  loading: PropTypes.bool,
  emailSent: PropTypes.bool,
  link: PropTypes.string,
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  emailSent: auth.signUpEmailSent,
  link: auth.link,
});

export default connect(mapStateToProps, {
  doSignUp,
})(withStyles(styles)(SignUp));
