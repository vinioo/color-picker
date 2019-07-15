import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
    state = {
        palettes:
            JSON.parse(window.localStorage.getItem('palettes')) || seedColors
    };
    findPalette = (id) => {
        return this.state.palettes.find(function(palette) {
            return palette.id === id;
        });
    }

    deletePalette = (id) => {
        this.setState(st => ({
                palettes: st.palettes.filter(palette => palette.id !== id)
            }),
            this.syncLocalStorage
        );
    }

    savePalette = newPalette => {
        this.setState(
            { palettes: [...this.state.palettes, newPalette] },
            this.syncLocalStorage
        );
    };

    syncLocalStorage() {
        console.log('oi');
        window.localStorage.setItem(
            'palettes',
            JSON.stringify(this.state.palettes)
        );
    }
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/palette/new"
                    render={routeProps => (
                        <NewPaletteForm
                            savePalette={this.savePalette}
                            {...routeProps}
                            palettes={this.state.palettes}
                        />
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={routeProps => (
                        <PaletteList
                            palettes={this.state.palettes}
                            deletePalette={this.deletePalette}
                            {...routeProps}
                        />
                    )}
                />
                <Route
                    exact
                    path="/palette/:id"
                    render={routeProps => (
                        <Palette
                            palette={generatePalette(
                                this.findPalette(routeProps.match.params.id)
                            )}
                        />
                    )}
                />
                <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={routeProps => (
                        <SingleColorPalette
                            colorId={routeProps.match.params.colorId}
                            palette={generatePalette(
                                this.findPalette(
                                    routeProps.match.params.paletteId
                                )
                            )}
                        />
                    )}
                />
            </Switch>

            // <div>
            //     <Palette palette={generatePalette(seedColors[4])} />
            // </div>
        );
    }
}

export default App;
