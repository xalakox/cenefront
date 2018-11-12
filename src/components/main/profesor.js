
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { history } from '../../configureStore.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';


import { getProfesor } from './_actions';


const maxResults = 20;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'calc(100% - 71px)',
  },
  divider: {
    margin: '10px 0 15px 0',
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

class Profesor extends React.Component {
  state = {
    search: '',
  };
  componentDidMount() {
    const { profesorId } = this.props.match.params;
    this.props.getProfesor(profesorId);
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
    const { classes, location, token, comentarios, loading, profesor } = this.props;
    const results = comentarios
      .map(e => ({ ...e, fullName: `${e.nombre} ${e.apellidos}` }))
      .filter(p => p.fullName.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1);
    if (!token) {
      return (<Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />);
    }
    return loading ? <CircularProgress className={classes.progress} /> : <div>
      {profesor ? <Typography variant="h4" className={classes.title} color="textSecondary" gutterBottom>
        {profesor.nombre} {profesor.apellidos }
      </Typography> : undefined}
      {results.length > 0 ? results.slice(0, maxResults).map(comentario => <Card key={comentario.id}>
        <CardContent>
          <Typography color="textSecondary">
            {comentario.Autore.nombre} {moment(comentario.createdAt).fromNow()}
          </Typography>
          <Divider className={classes.divider}/>
          <Typography color="textSecondary">
            {comentario.comentario}
          </Typography>
        </CardContent>
      </Card>) : undefined}
    </div>;
  }
}

Profesor.propTypes = {
  classes: PropTypes.object,
  getProfesores: PropTypes.func,
  location: PropTypes.object,
  profesores: PropTypes.array,
  token: PropTypes.string,
};

const mapStateToProps = ({ auth, profesor }) => ({
  token: auth.token,
  comentarios: profesor.data,
  loading: profesor.loading,
  profesor: profesor.profesor,
});

export default connect(mapStateToProps, { getProfesor })(withStyles(styles)(Profesor));
