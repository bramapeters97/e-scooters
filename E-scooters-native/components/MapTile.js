/**
 * Map Tile, displaying an image from OpenStreetMap open data
 * 
 * TODO add a layer to credit OpenStreetMap
 */

import React from 'react';
import {
    Animated,
    Image,
    StyleSheet
} from "react-native";

import UserAgent from 'react-native-user-agent';

// Sizes
const TILE_SIZE = 256
const DISPLAY_SIZE = TILE_SIZE

const styles = StyleSheet.create({
    image: {
        width: DISPLAY_SIZE,
        height: DISPLAY_SIZE,
        backgroundColor: "#ddd",
        resizeMode: 'stretch',
        resizeMode: "cover",
        // Uncomment to see the tile behaviour
        // borderWidth: 1,
        // borderColor: '#ff0000'
    }
})

/**
 * Transform coordinaates (x,y,zoom) to a OSM tile url 
 */
const toUrl = (x, y, z) => {
    return "https://b.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png"
}

// User Agent: Needed to access OSM data
const userAgent = UserAgent.getUserAgent()

export default MapTile = ({ x, y, z, relativeX, relativeY, style }) => {
    const url = toUrl(x + relativeX, y + relativeY, z)
    // console.log("MapTile: ", x, y, z, "url=", url)
    return (
        <Image style={[styles.image,
            style]}
            source={{
                uri: url,
                headers: {
                    'User-Agent': userAgent
                }
            }}
        />
    )
}