import React from 'react';
import { StyleSheet } from 'react-native';

import ImageButton from './ImageButton';

const styles = StyleSheet.create({
    image: {
        width:32,
        height:32,
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        borderRadius: 9999,
        width: 64,
        height: 64,
        padding: 16,
        margin: 16,
    },
    shadow: {
        // See https://blog.logrocket.com/applying-box-shadows-in-react-native/
        // IOS
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,

        // Android
        elevation: 10,
        shadowColor: '#000000',
    }
})

export default LocateUserButton = ({ onClick }) => {
    return (
        <ImageButton
            imageSource={require('../img/locate_user.png')}
            imageStyle={styles.image}
            buttonStyle={[styles.button, styles.shadow]}
            onClick={onClick}
            />
    );
}