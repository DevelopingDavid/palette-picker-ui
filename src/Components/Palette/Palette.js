import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import { displaySavedPalette } from '../../Actions'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Palette extends Component {

  deletePalette = async () => {
    const { id, project_id } = this.props.palette;
    const options = {method: 'DELETE'}
    await fetch(`http://localhost:3001/api/v1/projects/${project_id}/palettes/${id}`, options);
    await this.props.fetchPalette()
  }

  displayPalette = () => {
    const { displaySavedPalette, palette } = this.props
    const formattedPalette = [ 
      {
        hex: palette.color_one,
        locked:false
      },
      {
        hex: palette.color_two,
        locked:false
      },
      {
        hex: palette.color_three,
        locked:false
      },
      {
        hex: palette.color_four,
        locked:false
      },
      {
        hex: palette.color_five,
        locked:false
      }
  ]
    displaySavedPalette(formattedPalette)
  }

  render() {
    const { classes } = this.props;
    const { palette } = this.props;
    return (
      <List component="div" disablePadding>
        <Divider />
        <ListItemIcon>{<i className="material-icons palette-icon">style</i>}</ListItemIcon>
        <div className='sidebar-palette-container' onClick={this.displayPalette}>
          <ListItem className={classes.nested}>
            <Avatar style={{ backgroundColor: palette.color_one }}></Avatar>
            <ListItemText primary={palette.color_one} />
          </ListItem>
          <ListItem className={classes.nested}>
            <Avatar style={{ backgroundColor: palette.color_two }}></Avatar>
            <ListItemText primary={palette.color_two} />
          </ListItem>
          <ListItem className={classes.nested}>
            <Avatar style={{ backgroundColor: palette.color_three }}></Avatar>
            <ListItemText primary={palette.color_three} />
          </ListItem>
          <ListItem className={classes.nested}>
            <Avatar style={{ backgroundColor: palette.color_four }}></Avatar>
            <ListItemText primary={palette.color_four} />
          </ListItem>
          <ListItem className={classes.nested}>
            <Avatar style={{ backgroundColor: palette.color_five }}></Avatar>
            <ListItemText primary={palette.color_five} />
          </ListItem>
        </div>
        <div className='delete-container'>
          <Button variant="contained" onClick={this.deletePalette}>Delete palette</Button>
        </div>
        <Divider />
      </List>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  displaySavedPalette: (palette) => dispatch(displaySavedPalette(palette))
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(Palette));