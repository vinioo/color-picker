import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { arrayMove } from 'react-sortable-hoc';
import classNames from 'classnames';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import styles from '../styles/NewPaletteFormStyles';
import seedColors from '../seedColors';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    };
    state = {
        open: false,
        colors: seedColors[0].colors
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = newColor => {
        this.setState({
            colors: [...this.state.colors, newColor],
            newName: ''
        });
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    clearColors = () => {
        this.setState({ colors: [] });
    };

    addRandomColor = () => {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = this.state.colors.some(
                color => color.name === randomColor.name
            );
        }
        this.setState({ colors: [...this.state.colors, randomColor] });
    };

    handleSubmit = newPalette => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    };

    removeColor = colorName => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }));
    };

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.dprimarywer}
                    variant="persistent"
                    primary
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}>
                    <div className={classes.container}>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <Typography variant="h4" gutterBottom>
                            Design Your Palette
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.clearColors}>
                                Clear Palette
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.addRandomColor}
                                disabled={paletteIsFull}>
                                Random Color
                            </Button>
                        </div>
                        <ColorPickerForm
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                            colors={colors}
                        />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}>
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                        distance={18}
                    />
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
