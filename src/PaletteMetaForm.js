import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default class PaletteMetaForm extends Component {
    state = {
        stage: 'form',
        newPaletteName: ''
    };

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    showEmojiPicker = () => {
        this.setState({
            stage: 'emoji'
        });
    };

    savePalette = emoji => {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        };
        this.props.handleSubmit(newPalette);
        this.setState({
            stage: ''
        });
    };
    render() {
        const { newPaletteName } = this.state;
        const { hideForm } = this.props;
        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">
                        Choose a palette emoji
                    </DialogTitle>
                    <Picker onSelect={this.savePalette} title="Pick a palette emoji" />
                </Dialog>
                <Dialog
                    open={this.state.stage === 'form'}
                    onClose={hideForm}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        Choose a Palette Name
                    </DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your palette.
                            </DialogContentText>

                            <TextValidator
                                label="Palette Name"
                                onChange={this.handleChange}
                                name="newPaletteName"
                                value={newPaletteName}
                                fullWidth
                                margin="normal"
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={[
                                    'Enter palette name',
                                    'Name already used'
                                ]}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit">
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}
