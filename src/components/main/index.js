
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getProfesores } from './_actions';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'calc(100% - 71px)',
  },
  divider: {
    margin: '25px 0 25px 0',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

});

class Main extends React.Component {
  state = {
    email: '',
    password: '',
  };
  componentDidMount() {
    this.props.getProfesores();
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { classes, location, token } = this.props;
    return (
      <form className={classes.container}>
        {!token ? <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        /> : undefined}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          Hello there
        </Grid>
      </form>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
});

export default connect(mapStateToProps, { getProfesores })(withStyles(styles)(Main));
