
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  container: {
    textAlign: 'center',
  },
});

class LoadingView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
}

export default withStyles(styles)(LoadingView);
