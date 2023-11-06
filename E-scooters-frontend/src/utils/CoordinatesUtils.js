import { LatLng } from "leaflet"

const findDistance = (position1, position2) => {
    return new LatLng(position1.lat, position1.lng)
        .distanceTo(new LatLng(position2.lat, position2.lng))
}

const CoordinatesUtils = {
    findDistance: findDistance
}

export default CoordinatesUtils