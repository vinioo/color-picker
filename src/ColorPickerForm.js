import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

export default class ColorPickerForm extends Component {
    state = {
        currentColor: 'teal',
        newName: ''
    };
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }
    updateCurrentColor = newColor => {
        this.setState({ currentColor: newColor.hex });
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newName
        };
        this.props.addNewColor(newColor);
        this.setState({ newName: '' });
    };
    render() {
        const { paletteIsFull } = this.props;
        const { currentColor, newName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        name="newName"
                        value={newName}
                        onChange={this.handleChange}
                        validators={[
                            'required',
                            'isColorNameUnique',
                            'isColorUnique'
                        ]}
                        errorMessages={[
                            'Enter a color name',
                            'The color name must be unique',
                            'Color already in use!'
                        ]}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        style={{
                            backgroundColor: paletteIsFull
                                ? 'grey'
                                : this.state.currentColor
                        }}
                        disabled={paletteIsFull}>
                        {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}
