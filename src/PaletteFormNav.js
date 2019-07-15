import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class PaletteFormNav extends Component {
    state = {
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
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        const { classes, open, handleSubmit } = this.props;
        const { newPaletteName } = this.state;

        return (
            <div>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}>
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                open && classes.hide
                            )}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                            <TextValidator
                                label="Palette Name"
                                onChange={this.handleChange}
                                name="newPaletteName"
                                value={this.state.newPaletteName}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={[
                                    'Enter palette name',
                                    'Name already used'
                                ]}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit">
                                Save Palette
                            </Button>
                            <Link to="/">
                                <Button variant="contained" color="secondary">
                                    GO BACK
                                </Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
