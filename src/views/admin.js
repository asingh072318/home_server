import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import { withStyles } from '@material-ui/core/styles';
// Binding the state and actions. These will be available as props to component
const styles = theme => ({
  rootpage:{
    width:'300px',
    backgroundColor:'white',
  },
});


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"",
    };
    if(!props.coach.currentuser['isLoggedIn'])
      browserHistory.push('/');
    else if(props.coach.currentuser['isLoggedIn'] && !props.coach.currentuser['admin']){
      browserHistory.push("/home");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className = {classes.rootpage}>
        Admin
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    coach: state.coach
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Admin));