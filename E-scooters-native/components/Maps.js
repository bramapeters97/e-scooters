/**
 * Map component, handling movements and markers
 * 
 * MUST BE PLACED IN A GestureHandlerRootView
 */

import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Animated
} from "react-native";

import { PanGestureHandler } from 'react-native-gesture-handler'

import MapTile from './MapTile';
import MapMarker from './MapMarker';

// OSM Tile Size
const TILE_SIZE = 256

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    animatedView: {
    },

})

/**
 * Retrun TILE position from coorinates (lat/lon) and zoom
 */
const pointToPixels = (lat, lon, zoom) => {
    let n = Math.pow(2, zoom) * TILE_SIZE
    let lat_radian = lat * Math.PI / 180
    let x = Math.floor((lon + 180) / 360 * n)
    let y = Math.floor((1 - Math.log(Math.tan(lat_radian) + 1 / Math.cos(lat_radian)) / Math.PI) / 2 * n)

    return {
        x: x,
        y: y
    }
}

export default class Maps extends Component {
    // Used translation value (see https://blog.bitsrc.io/using-the-gesture-handler-in-react-native-c07f84ddfa49)
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)

    // Number of tiles on horizontal/vertical axis
    horizontal_tile_count = 0
    vertical_tile_count = 0

    // Zoom value (for now fixed)
    zoom = 16

    // Center coordinates (KTH)
    center = {
        lat: 59.346896,
        lon: 18.072280
    }

    // Map object (tiles) bounds 
    mapBounds = {
        width: 0,
        height: 0
    }
    // Screen bounds 
    screenBounds = {
        width: 0,
        height: 0
    }

    // Markers object
    markers = [];

    // Current translation (need to be followed to remember position when stopping motion)
    current_translation = {
        x: 0,
        y: 0
    }

    // Delta to apply on translation transform 
    delta = {
        x: 0,
        y: 0
    }

    constructor() {
        super();
        // Get and set dimensions constants
        let dimensions = Dimensions.get('window')
        this.horizontal_tile_count = Math.ceil(dimensions.width / TILE_SIZE) + 1
        this.vertical_tile_count = Math.ceil(dimensions.height / TILE_SIZE) + 1

        this.mapBounds.width = this.horizontal_tile_count * TILE_SIZE
        this.mapBounds.height = this.vertical_tile_count * TILE_SIZE

        this.screenBounds.width = dimensions.width
        this.screenBounds.height = dimensions.height

        let firstPosition = pointToPixels(this.center.lat, this.center.lon, this.zoom)
        // Use **state** to be enable to update the first tile position
        // The firstTilePosition is the position (in OSM space) of the top-left tile 
        this.state = {
            firstTilePosition: {
                x: parseInt((firstPosition.x - this.screenBounds.width / 2) / TILE_SIZE),
                y: parseInt((firstPosition.y - this.screenBounds.height / 2) / TILE_SIZE)
            }
        }
    }

    updateFirstTilePosition(dx, dy) {
        // console.log("update first tile positon ", dx, dy)
        // For now, just handle x,y changes (not zoom)

        this.setState({
            firstTilePosition: {
                x: this.state.firstTilePosition.x + dx,
                y: this.state.firstTilePosition.y + dy
            }
        })
    }

    centerOn(lat, lon) {
        // Requested position in OSM state
        const requestedCenterPosition = pointToPixels(lat, lon, this.zoom)
        // Current accurate (left-top corner) position in OSM state
        const currentAccuratePosition = {
            x: this.state.firstTilePosition.x * TILE_SIZE,
            y: this.state.firstTilePosition.y * TILE_SIZE
        }
        // Requested position of the left-top corner (in OSM state)
        const requestedActualPosition = {
            x: requestedCenterPosition.x - this.screenBounds.width / 2 + this.current_translation.x,
            y: requestedCenterPosition.y - this.screenBounds.height / 2 + this.current_translation.y,
        }

        // Delta of positions (requested-current)
        let positionDelta = {
            x: requestedActualPosition.x - currentAccuratePosition.x,
            y: requestedActualPosition.y - currentAccuratePosition.y
        }

        // Delta of tiles
        let dx = parseInt(positionDelta.x / TILE_SIZE)
        let dy = parseInt(positionDelta.y / TILE_SIZE)

        if (dx * dx > 0 || dy * dy > 0) {
            // Update the "first" (top-left corner) tile (OSM) position
            this.updateFirstTilePosition(dx, dy)
        }

        // Translate the remaining delta simulating a user input (translation) 
        this.handleGesture({
            nativeEvent: {
                translationX: -(positionDelta.x - dx),
                translationY: -(positionDelta.y - dy),
            }
        })
    }

    /** 
    * Callback whenever the user slides on the map object 
    */
    handleGesture = (evt) => {
        let { nativeEvent } = evt

        // Update current translation
        this.current_translation.x = nativeEvent.translationX + this.delta.x
        this.current_translation.y = nativeEvent.translationY + this.delta.y

        // Handle bounds limits
        if (this.current_translation.x > 0) {
            // Sliding too much to the right
            this.current_translation.x -= TILE_SIZE
            this.delta.x -= TILE_SIZE
            this.updateFirstTilePosition(-1, 0)
        } else if (this.current_translation.x + this.mapBounds.width < this.screenBounds.width) {
            // Sliding too much to the left
            this.current_translation.x += TILE_SIZE
            this.delta.x += TILE_SIZE
            this.updateFirstTilePosition(+1, 0)
        }
        if (this.current_translation.y > 0) {
            // Sliding too much to the bottom
            this.current_translation.y -= TILE_SIZE
            this.delta.y -= TILE_SIZE
            this.updateFirstTilePosition(0, -1)
        } else if (this.current_translation.y + this.mapBounds.height < this.screenBounds.height) {
            // Sliding too much to the top
            this.current_translation.y += TILE_SIZE
            this.delta.y += TILE_SIZE
            this.updateFirstTilePosition(0, +1)
        }

        this.translateX.setValue(this.current_translation.x)
        this.translateY.setValue(this.current_translation.y)
    }

    /**
     * Callback on state change (including user pressing and releasing the screen) 
     */
    handleStateChange = (evt) => {
        let { nativeEvent } = evt
        if (nativeEvent.state == 2) {
            // The user start to touch the screen (state 2)
            this.delta.x = this.current_translation.x
            this.delta.y = this.current_translation.y
        }
    }

    render() {
        let transformStyle = {
            transform: [
                { translateY: this.translateY },
                { translateX: this.translateX }]
        }

        // Build tile views
        let tiles = []
        for (let x = 0; x < this.horizontal_tile_count; x++) {
            for (let y = 0; y < this.vertical_tile_count; y++) {
                tile_style = {
                    transform: [
                        { translateX: x * TILE_SIZE },
                        { translateY: x * (- this.vertical_tile_count * TILE_SIZE) }
                    ]
                }

                tile = <MapTile
                    key={x * this.vertical_tile_count + y}
                    style={tile_style}
                    x={this.state.firstTilePosition.x}
                    y={this.state.firstTilePosition.y}
                    relativeX={x}
                    relativeY={y}
                    z={this.zoom} />

                tiles.push(tile)
            }
        }

        // Build marker views
        let scootersViews = []
        if (this.props.scooters !== undefined) {
            i = 0
            this.props.scooters.forEach(scooter => {
                // console.log("marker:", marker)
                scootersViews.push(
                    <MapMarker
                        key={i++}
                        icon={scooter.icon}
                        width={scooter.iconWidth}
                        height={scooter.iconHeight}
                        centerY={scooter.iconHeight} // To point the marker to the actual position
                        lat={scooter.lat}
                        lon={scooter.lon}
                        zoom={this.zoom}
                        firstTilePosition={this.state.firstTilePosition}
                        onClick={(evt) => {
                            this.centerOn(scooter.lat, scooter.lon) // Center on the scooter marker
                            if (this.props.onScooterClick !== undefined)
                                this.props.onScooterClick(scooter)
                        }} />
                )
            })
            // console.log("markerViews:", markerViews)
        }

        let fillMapStyle = {
            width: this.mapBounds.width,
            height: this.mapBounds.height
        }

        let userPin = undefined
        if (this.props.userPosition !== undefined) {
            userPin =
                <MapMarker
                    icon={require('../img/user_pin.png')}
                    lat={this.props.userPosition.lat}
                    lon={this.props.userPosition.lon}
                    zoom={this.zoom}
                    firstTilePosition={this.state.firstTilePosition}
                    width={42}
                    height={42}
                    onClick={(evt) => { console.log("Yep i'm here") }}
                />
        }

        return (
            <View style={styles.container} >
                <PanGestureHandler onGestureEvent={this.handleGesture}
                    onHandlerStateChange={this.handleStateChange}>
                    <Animated.View style={[
                        styles.animatedView,
                        transformStyle,
                        fillMapStyle]}>
                        <View style={fillMapStyle}>
                            {tiles}
                            {userPin}
                            {scootersViews}
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}