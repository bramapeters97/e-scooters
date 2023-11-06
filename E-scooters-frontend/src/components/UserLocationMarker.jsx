
/**
 * Marker for the user position on the map 
 */

import { Marker, useMapEvent } from 'react-leaflet'
import { useState } from "react"
import { userMarker } from './MapMarkers'
import React from 'react'


const UserLocationMarker = ({ onClick, setUserPosition }) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvent('locationfound',
        e => {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            if (setUserPosition !== undefined) {
                setUserPosition(e.latlng)
            }
        })

    return position === null ? null : (
        // TODO[Antoine] Update the display of the User-Location marker
        <Marker
            position={position}
            icon={userMarker}
            eventHandlers={{ click: onClick }} />
    )
}

export default UserLocationMarker