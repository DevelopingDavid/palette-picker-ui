import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: [],
      open: false
    }
  }

  toggleDrawer = () => {
    this.setState(state => ({ open: !state.open }));
  };

  componentDidMount() {
    this.fetchPalette();
  }

  fetchPalette = async () => {
    const { project } = this.props;
    const id = project.id;
    const response = await fetch(`http://localhost:3001/api/v1/projects/${id}/palettes`);
    const data = await response.json();
    this.setState({ palettes: data });
  }

  render() {
    const { classes } = this.props;
    const { project } = this.props;
    return (
      <div>
        <ListItem button onClick={this.toggleDrawer}>
          <ListItemIcon>{<i className="material-icons">palette</i>}</ListItemIcon>
          <ListItemText inset primary={project.project_name} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            {this.state.palettes.map((palette) => (
              <List component="div" disablePadding>
                <Divider />
                  <ListItemIcon>{<i className="material-icons">style</i>}</ListItemIcon>
                  <ListItem className={classes.nested}>
                    <ListItemText primary={palette.color_one} style={{backgroundColor: palette.color_one}} />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <ListItemText primary={palette.color_two} style={{backgroundColor: palette.color_two}} />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <ListItemText primary={palette.color_three} style={{backgroundColor: palette.color_three}} />
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <ListItemText primary={palette.color_four} style={{backgroundColor: palette.color_four}}/>
                  </ListItem>
                  <ListItem className={classes.nested}>
                    <ListItemText primary={palette.color_five} style={{backgroundColor: palette.color_five}}/>
                  </ListItem>
                <Divider />
              </List>
            ))}
        </Collapse>
      </div>
    )
  }
}

Project.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Project);


