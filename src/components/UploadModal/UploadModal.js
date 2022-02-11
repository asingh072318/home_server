import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Image from './static/upload.png';

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    bodySection: {
        display:'flex',
        flexDirection:'column',
        width:'100%',
        height:'100%',
    },
    uploadSection:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'start',
        alignItems:'start',
        height:'100%',
        width:'100%',
        backgroundColor: '#F7F8FA',
    },
    uploadsleft:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-end',
        width:'50%',
    },
    progressright:{
        width:'50%',
        backgroundColor:'green',
    },
    uploadImage:{
        width:'70%',
        maxHeight:'100%',
    },
    tableItem:{
        verticalAlign:"center",
        fontSize:'16px',
    },
});

class UploadModal extends Component{
    constructor(props){
        super(props); 
        this.state = {
        open:false,
        setOpen: false,
        files: [],
        events: [],
        };
    }

    handleClose = () => {
        this.setState({open:false});
    }

    onAdd = (event) => {
        var files = this.state.files;
        files.push(event.target.files[0]);
        var events = this.state.events;
        events.push(event);
        this.setState({events:events,files:files});
    }

    handleOpen = () => {
        this.setState({open:true});
    }

    onUpload = (index) => {
        console.log("uploading file ",index);
        //this.props.save(this.props.token,this.state.events[index].target.files);
    }

    onSad = (index) => {
        console.log("uploading file ",index);
        //this.props.save(this.props.token,this.state.events[index].target.files);
    }

    renderProgress = () => {
        if(!this.state.files.length){
            return(
                <div>No Files Selected</div>
            )
        }
        else{
            return Object.keys(this.state.files).map((eachfile,index) => {
                console.log('returning :',this.state.files[eachfile]);
                return(
                    <div key={index}>{this.state.files[eachfile]['name']}</div>
                );
            })
        }
    }

    onDelete = (index) => {
        console.log("On Delete");
        var files = this.state.files;
        files.splice(index,1);
        console.log(this.state.files,files);
        this.setState({files:files});
    }

    render() {
        const {classes} = this.props;
        return(
            <div>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    onClick={this.handleOpen}
                    >
                    Upload
                </Button>
                <Dialog fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                            <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            Upload Files
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleClose}>
                            Save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.bodySection}>
                        <div className={classes.uploadSection}>
                            <div className={classes.uploadsleft}>
                            <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">File Name</th>
                                    <th scope="col">File Size</th>
                                    <th scope="col">Last Modified</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.files.map((item,index) => (
                                    <tr key={index}>
                                    <th scope="row" className={classes.tableItem}>{index+1}</th>
                                    <td className={classes.tableItem}>{item['name']}</td>
                                    <td className={classes.tableItem}>{item['size']}</td>
                                    <td className={classes.tableItem}>{item['lastModified']}</td>
                                    <td>
                                        <input className='myclass' type='button' value='Delete' onClick={(index) => this.onDelete(index)}/>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {/* <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                component='label'
                                >
                                Click Here to Select Files.
                                <form >
                                <input type='file' hidden onChange={(event) => this.onUpload(event)}/>
                                </form>
                            </Button> */}
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                component='label'
                                >
                                Click Here to Select Files.
                                <form >
                                <input type='file' hidden onChange={(event) => this.onAdd(event)}/>
                                </form>
                            </Button>
                            </div>
                            <div className={classes.progressright}>
                                {this.renderProgress()}
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(UploadModal);