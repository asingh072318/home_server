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
        justifyContent:'space-between',
        height:'60%',
        width:'100%',
        backgroundColor: '#F7F8FA',
    },
    uploadsleft:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-end',
        width:'50%',
        backgroundImage: `url(${Image})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
    },
    progressright:{
        width:'50%',
        backgroundColor:'green',
    },
    previewSection:{
        height:'40%',
    },
    uploadImage:{
        width:'70%',
        maxHeight:'100%',
    }
});

class UploadModal extends Component{
    constructor(props){
        super(props);
        this.state = {
        open:false,
        setOpen: false,
        files: [],
        };
    }

    handleClose = () => {
        this.setState({open:false});
    }

    handleOpen = () => {
        this.setState({open:true});
    }

    onUpload = (event) => {
        console.log(typeof(event.target.files),event.target.files)
        this.setState({files: event.target.files})
    }

    renderProgress = () => {
        if(!this.state.files.length){
            return(
                <div>No Files Selected</div>
            )
        }
        else{
            this.state.files.map((eachfile,index) => {
                return(
                    <div>eachfile['filename']</div>
                )
            })
        }
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
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                component='label'
                                >
                                Click Here to Select Files.
                                <form >
                                <input type='file' hidden multiple onChange={(event) => this.onUpload(event)}/>
                                </form>
                            </Button>
                            </div>
                            <div className={classes.progressright}>
                                {this.renderProgress()}
                            </div>
                        </div>
                        <div className={classes.previewSection}>
                            Preview Section
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(UploadModal);