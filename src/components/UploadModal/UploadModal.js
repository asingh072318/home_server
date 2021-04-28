import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


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
        alignItems:'center',
        justifyContent: 'center',
        height:'60%',
        backgroundColor: '#F7F8FA',
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
        };
    }

    handleClose = () => {
        this.setState({open:false});
    }

    handleOpen = () => {
        this.setState({open:true});
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
                            <img src={require('./static/upload.jpg')} className={classes.uploadImage}/>
                        </div>
                        <div className={classes.previewSection}>
                            PreviewSection
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(UploadModal);