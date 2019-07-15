import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';

export default class PaletteMetaForm extends Component {
    state = {
        open: true,
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
    render() {
        const { newPaletteName } = this.state;
        const { hideForm, handleSubmit } = this.props;
        return (
            <Dialog
                open={this.state.open}
                onClose={hideForm}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Choose a Palette Name
                </DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your palette.
                        </DialogContentText>

                        <Picker />

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
        );
    }
}
