
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { history } from '../../configureStore.js';
import { saveComment, getProfesor } from './_actions';



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
  card: {
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
    comment: '',
  };

  componentDidMount() {
    const { profesorId } = this.props.match.params;
    this.props.getProfesor(profesorId);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.saving && prevProps.saving) {
      // se guardo el comentario, tenemos que borrar la entrada
      if (this.state.comment) this.setState({ comment: '' });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  saveComment = () => {
    const { profesorId } = this.props.match.params;
    this.props.saveComment(this.state.comment, profesorId);
  }

  render() {
    const {
      classes, location, token, comentarios, loading, profesor, saving,
    } = this.props;
    const results = comentarios;
    if (!token) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      );
    }
    return loading ? <CircularProgress className={classes.progress} /> : (
      <div>
        {profesor ? (
          <Typography variant="h4" className={classes.title} color="textSecondary" gutterBottom>
            {profesor.nombre}
            {' '}
            {profesor.apellidos }
          </Typography>
        ) : undefined}
        {results.length > 0 ? results.slice(0, maxResults).map(comentario => (
          <Card key={comentario.id} className={classes.card}>
            <CardContent>
              <Typography color="textSecondary">
                {comentario.Autore.nombre}
                {' '}
                {moment(comentario.createdAt).fromNow()}
              </Typography>
              <Divider className={classes.divider} />
              <Typography color="textSecondary">
                {comentario.comentario}
              </Typography>
            </CardContent>
          </Card>
        )) : undefined}
        <Card className={classes.card}>
          <CardContent>
            <TextField
              multiline
              fullWidth
              id="comment"
              label="Añadir comentario"
              className={classes.textField}
              value={this.state.comment}
              onChange={this.handleChange('comment')}
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              disabled={saving}
              className={classes.button}
              onClick={this.saveComment}
            >
Guardar Comentario

            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Profesor.propTypes = {
  classes: PropTypes.object,
  getProfesor: PropTypes.func,
  location: PropTypes.object,
  comentarios: PropTypes.array,
  saveComment: PropTypes.func,
  token: PropTypes.string,
  saving: PropTypes.bool,
};

const mapStateToProps = ({ auth, profesor }) => ({
  token: auth.token,
  comentarios: profesor.data,
  loading: profesor.loading,
  profesor: profesor.profesor,
  saving: profesor.saving,
});

export default connect(mapStateToProps, { getProfesor, saveComment })(withStyles(styles)(Profesor));
