
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { history } from '../../configureStore.js';

import { getProfesores } from './_actions';

const maxResults = 20;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'calc(100% - 71px)',
  },
  divider: {
    margin: '25px 0 25px 0',
    width: '100%',
  },
  container: {
    display: 'flex',
    textAlign: 'center',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  results: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Main extends React.Component {
  state = {
    search: '',
  };
  componentDidMount() {
    this.props.getProfesores();
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleClick = (key) => {
    history.push(`/profesor/${key}`);
  }
  render() {
    const { classes, location, token, profesores, loading } = this.props;
    const results = profesores
      .map(e => ({ ...e, fullName: `${e.nombre} ${e.apellidos}` }))
      .filter(p => p.fullName.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1);
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
          <TextField
            id="search"
            fullWidth
            label="Buscar por nombre"
            className={classes.textField}
            value={this.state.search}
            onChange={this.handleChange('search')}
            margin="normal"
            variant="outlined"
          />
          <Divider className={classes.divider} />
          {loading ? <CircularProgress className={classes.progress} /> :
            <div className={classes.results}>

              {results.length > 0 ? results.slice(0, maxResults).map(profesor => <Chip
                key={profesor.id}
                avatar={
                  <Avatar>
                    <FaceIcon />
                  </Avatar>
                }
                label={profesor.fullName}
                onClick={(e) => this.handleClick(profesor.id, e)}
                // onDelete={handleDelete}
                className={classes.chip}
              />) : <Typography gutterBottom variant="h6" component="h6">
            No se encontraron resultados
              </Typography>
              }{results.length > maxResults ? <p>{`... ${results.length - 50} más...`}</p> : undefined}
            </div>

          }

        </Grid>
      </form>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object,
  getProfesores: PropTypes.func,
  location: PropTypes.object,
  profesores: PropTypes.array,
  token: PropTypes.string,
};

const mapStateToProps = ({ auth, profesores }) => ({
  token: auth.token,
  profesores: profesores.data,
  loading: profesores.loading,
});

export default connect(mapStateToProps, { getProfesores })(withStyles(styles)(Main));
