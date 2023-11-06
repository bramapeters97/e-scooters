import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default ImageButton = ({
    imageSource,
    buttonStyle,
    imageStyle,
    onClick
}) => {

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onClick}
            activeOpacity={0.8}>
            <Image source={imageSource}
                style={imageStyle} />
        </TouchableOpacity>
    );
}
