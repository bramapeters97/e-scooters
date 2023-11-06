import { Marker, useMap } from 'react-leaflet'
import { testMarker, limeMarker, voiMarker, birdMarker, tierMarker } from './MapMarkers'
import React from 'react'


const BRANDS_ICON = {
	lime: limeMarker,
	voi: voiMarker,
	bird: birdMarker,
	tier: tierMarker,
}

const ScooterPin = ({ scooterInfo, scooterClickHandler, showModal }) => {
	let icon = BRANDS_ICON[scooterInfo?.brand]
	if (icon === undefined) {
		icon = testMarker // If the brand isn't related to an icon, display react icon
	}

	const map = useMap()

	const onClickFunction = () => {
		// Center the map on the pin's location, and than call the provided callback
		map.flyTo(scooterInfo?.position, map.getZoom())
		scooterClickHandler(scooterInfo)
		showModal()
	}

	return (
		<Marker
			position={scooterInfo.position}
			icon={icon}
			eventHandlers={{ click: onClickFunction }}
		/>
	)
}

export default ScooterPin
