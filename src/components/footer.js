
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { logout } from '../components/signinandup/_actions';
import { history } from '../configureStore.js';

const styles = theme => ({
  container: {
    textAlign: 'right',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Footer extends React.Component {
  doLogout = () => {
    this.props.logout();
  }
  doProfesores = () => {
    history.push('/main');
  }
  render() {
    const { classes } = this.props;
    return (<div className={ classes.container }>
      {this.props.token ? <div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.doProfesores}
        >Profesores</Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.doLogout}
        >Cerrar Sesi&oacute;n</Button>
      </div> : null}
    </div>);
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
});

export default connect(mapStateToProps, {
  logout,
})(withStyles(styles)(Footer));
