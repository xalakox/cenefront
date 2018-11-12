
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';

import loginHeader from '../../assets/loginHeader.png';
import Login from './login';
import SignUp from './signUp';
import TokenCheck from './tokenCheck';

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

class SignInAndUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={loginHeader}
              title="Login Header"
            />{ token }
            {/* <Typography gutterBottom variant="h5" component="h2">
                Blog de evaluación
            </Typography> */}
            {token ? <Redirect
              to={{
                pathname: '/main',
                state: { from: location },
              }}
            /> : undefined}
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/confirmarCorreo" component={TokenCheck}/>
            <Route exact path="/" component={Login} />
          </Card>
        </Grid>
      </form>
    );
  }
}

SignInAndUp.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
});

export default connect(mapStateToProps, {})(withStyles(styles)(SignInAndUp));
