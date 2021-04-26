import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import { browserHistory } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import {DropzoneDialog} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchBar from "material-ui-search-bar";
import * as pgutils from "../utils/pgutils";
import { ThumbDownSharp } from "@material-ui/icons";
// Binding the state and actions. These will be available as props to component
const styles = theme => ({
  rootpage:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96vw',
    height: '84vh',
  },
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    width:'100%',
  },
  content:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
  },
  tableItem:{
    verticalAlign:"center",
    fontSize:'16px',
  },
  button: {
    margin: theme.spacing(1),
  },
  mainsection:{
    display:'flex',
    width:'75%',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  logsection:{
    display:'flex',
    width:'25%',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
  }
});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"",
      files: [],
      open: false,
    };
    if(!props.coach.currentuser['isLoggedIn'])
      browserHistory.push('/');
    else if(props.coach.currentuser['isLoggedIn'] && props.coach.currentuser['admin'])
      browserHistory.push('/admin');
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({
      files: nextProps.coach.currentuser['files']
    })
  }

  componentDidMount(){
    pgutils.getfiles(this.props.coach.currentuser['token']);
  }

  handleClose = () => {
    this.setState({
        open: false
    });
  }

  handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false
    });
  }

  handleOpen = () => {
    this.setState({
        open: true,
    });
  }
  renderFiles = () => {
    
  }
  render() {
    console.log(this.state.files);
    const { classes } = this.props;
    return (
      <div className={classes.rootpage}>
        <div className={classes.mainsection}>
          <div className={classes.header}>
            <SearchBar
              onChange={() => console.log('onChange')}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                width:'80%',
              }}
            />
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={() => this.handleOpen()}
            >
              Upload
            </Button>
            <DropzoneDialog
              open={this.state.open}
              onSave={(files) => this.handleSave(files)}
              showPreviews={true}
              maxFileSize={5000000}
              dropzoneText={"Drag and Drop file or Click here"}
              onClose={() => this.handleClose()}
            />    
          </div>
          <div className={classes.content}>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">File Name</th>
                <th scope="col">File Size</th>
                <th scope="col">Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((item,index) => (
                <tr key={index}>
                  <th scope="row" className={classes.tableItem}>{index+1}</th>
                  <td className={classes.tableItem}>{item['filename']}</td>
                  <td className={classes.tableItem}>{item['filesize']}</td>
                  <td className={classes.tableItem}>{item['uploaded_at']}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className={classes.logsection}>
          Logs Section
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));