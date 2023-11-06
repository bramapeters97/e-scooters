/**
 * Marker placed on the map, by coordinates 
 * 
 * Either provide an icon (and iconWidth/iconHeight to ensure that it will be nicelly rendered),
 * or use the default display: a red circle.
 */

import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";

// Default size
const WIDTH = 20
const HEIGHT = 20

// OSM Tile Size
const TILE_SIZE = 256

const styles = StyleSheet.create({
    default: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#ff0000",
        zIndex: 1,
        borderRadius: 99,
    },
    image: {
        width: WIDTH,
        height: HEIGHT,
        zIndex: 1,
    },
    touchableOpacity: {
        position: 'absolute',
        // borderColor: "#00ffff",
        // borderWidth: 1,
    }
})

/**
 * Return the position of a point the OSM space from coordinates (lat/lon) and zoom
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

/**
 * @param icon - image source
 * @param lat - latitude 
 * @param lon - longitude
 * @param zoom - map zoom level
 * @param firstTilePosition - {x,y} position (indexes) of the current left-top tile
 * @param width - width of the marker
 * @param height - height of the marker 
 */
export default MapMarker = ({
    icon,
    lat,
    lon,
    zoom,
    firstTilePosition,
    width,
    height,
    centerX,
    centerY,
    onClick
}) => {
    // Find position
    pixel = pointToPixels(lat, lon, zoom)

    // Set width/height
    if (width === undefined) {
        width = WIDTH
    }
    if (height === undefined) {
        height = HEIGHT
    }
    if (centerX === undefined) {
        centerX = width / 2
    }
    if (centerY === undefined) {
        centerY = height / 2
    }

    // Position = pixelPosition - TilePosition
    let transformStyle = {
        transform: [
            { translateX: pixel.x - firstTilePosition.x * TILE_SIZE - centerX },
            { translateY: pixel.y - firstTilePosition.y * TILE_SIZE - centerY }
        ]
    }

    let sizeStyle = {
        width: width,
        height: height
    }

    // Real marker display
    const markerDisplay = (icon === undefined) ?
        <View style={[styles.default,
            sizeStyle]}
        /> : <Image style={[styles.image,
            sizeStyle]}
            source={icon}
        />

    return (<TouchableOpacity activeOpacity={.8}
        onPress={onClick}
        style={[sizeStyle,
            transformStyle,
            styles.touchableOpacity]}>
        {markerDisplay}
    </TouchableOpacity>
    )
}