/**
 * Map view
 * -> Displayed in background (z-index = -1) and in all the screen (position absolute)
 * -> Based on OpenStreetMap data, using leaflet
 * -> Handles user interaction by default (slide/zoom)
 */
import React from 'react'

import { MapContainer, TileLayer, MapConsumer } from 'react-leaflet'
import ScooterPin from './ScooterPin'

import UserLocationMarker from './UserLocationMarker'

// see https://wiki.openstreetmap.org/wiki/Tile_servers
const LAYERS_URL = {
	standart: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	nolabel: 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
}

const MapView = ({ setMap, scooterClickHandler, showModal, setUserPosition, allScootersInfo }) => {
	// We need to use the basic "style" components because:
	//      1. Otherwise, it forces the position to be "relative"
	//      2. a negative z index is not offered by tailwind (need <0 to be in the background)
	return (
		<MapContainer
			className="absolute left-0 top-0 w-full h-full"
			center={[59.345915, 18.074003]}
			zoom={16}
			scrollWheelZoom={true}
			zoomControl={false}
			style={{ position: 'absolute', zIndex: -1 }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url={LAYERS_URL['standart']}
			/>

			<MapConsumer>
				{(map) => {
					setMap(map)
					return null
				}}
			</MapConsumer>

			<UserLocationMarker
				onClick={(e) => console.log("Yep, you're here")}
				setUserPosition={setUserPosition} />

			{allScootersInfo.map((scooterInfo) => (
				<ScooterPin
					key={scooterInfo.id}
					scooterInfo={scooterInfo}
					scooterClickHandler={scooterClickHandler}
					showModal={showModal}
				/>
			))}
		</MapContainer>
	)
}

export default MapView
