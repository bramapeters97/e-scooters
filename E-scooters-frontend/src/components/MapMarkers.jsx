import L from 'leaflet'


const baseMarker = new L.Icon({
	iconUrl: 'img/base_pin.svg',
	iconRetinaUrl: 'img/base_pin.svg',
	iconAnchor: [24, 45],
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [48, 64],
})

const testMarker = new L.Icon({
	iconUrl: 'img/logo.svg',
	iconRetinaUrl: 'img/logo.svg',
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [48, 48],
})

const limeMarker = new L.Icon({
	iconUrl: 'img/lime_pin.svg',
	iconRetinaUrl: 'img/lime_pin.svg',
	iconAnchor: [24, 45],
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [48, 64],
})

const voiMarker = new L.Icon({
	iconUrl: 'img/voi_pin.svg',
	iconRetinaUrl: 'img/voi_pin.svg',
	iconAnchor: [24, 45],
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [48, 64],
})

const birdMarker = new L.Icon({
	iconUrl: 'img/bird_pin.svg',
	iconRetinaUrl: 'img/bird_pin.svg',
	iconAnchor: [24, 45],
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [48, 64],
})

const tierMarker = new L.Icon({
	iconUrl: 'img/tier_pin.svg',
	iconRetinaUrl: 'img/tier_pin.svg',
	iconAnchor: [24, 45],
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [48, 64],
})

const userMarker = new L.Icon({
	iconUrl: 'img/user_pin.svg',
	iconRetinaUrl: 'img/user_pin.svg',
	iconAnchor: [16, 16],
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [32, 32],
})

export { baseMarker, testMarker, userMarker, limeMarker, voiMarker, birdMarker, tierMarker }
