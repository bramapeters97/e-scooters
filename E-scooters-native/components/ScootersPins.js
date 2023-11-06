import images from "./Images"

const scooters = [{
        id: 0,
        brand: 'lime',
        lat: 59.3448,
        lon: 18.0394,
        battery: 75,
    },
    {
        id: 1,
        brand: 'lime',
        lat: 59.34578,
        lon: 18.07181,
        battery: 45,
    },
    {
        id: 2,
        brand: 'bird',
        lat: 59.347438,
        lon: 18.072783,
        battery: 60,
    },
    {
        id: 3,
        brand: 'lime',
        lat: 59.345706,
        lon: 18.070787,
        battery: 90,
    },
    {
        id: 4,
        brand: 'lime',
        lat: 59.344906,
        lon: 18.072996,
        battery: 100,
    },
    {
        id: 5,
        brand: 'voi',
        lat: 59.345915,
        lon: 18.074003,
        battery: 93,
    },
]

const brandPins = {
    'lime': {
        icon: images.pins.lime,
        iconWidth: 34.1,
        iconHeight: 44.25,
    },
    'voi': {
        icon: images.pins.voi,
        iconWidth: 34.1,
        iconHeight: 44.25,
    },
    'bird': {
        icon: images.pins.bird,
        iconWidth: 34.1,
        iconHeight: 44.25,
    }
}

export default getScooters = () => {
    result = []
    scooters.forEach(scooter => {
        pin = brandPins[scooter.brand]

        if (pin === undefined) {
            result.push({...scooter })
        } else {
            result.push({...scooter, ...pin })
        }
    })
    return result
}