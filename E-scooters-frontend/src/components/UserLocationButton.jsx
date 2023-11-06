
/**
 * Button to request the use position on the map
 */

 import React from 'react'


 const UserLocationButton = ({ map }) => {
    function optainCurrentLocation() {
        if (map !== null) {
            map.locate()
        }
    }

    return (
        <img
            src="img/locate_user.svg" 
            onClick={optainCurrentLocation} 
            className="fixed bottom-6 right-2 p-2 w-10 h-10 bg-white rounded-md shadow cursor-pointer"
            alt="Locate the device" />
    )
}

export default UserLocationButton