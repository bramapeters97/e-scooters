/**
 * Static component containing images (references), usable as 'source' for a <Image /> Node.
 * 
 * Ex: 
 * import images from './Images'
 * 
 * return (<Image source={images.pins.lime} />) 
 * 
 * TODO: Maybe increase the definition of the png files (Images node doesn't accept SVG files)
 */

const images = {
    pins: {
        lime: require('../img/lime_pin.png'),
        voi: require('../img/voi_pin.png'),
        bird: require('../img/bird_pin.png')
    }
};
    
export default images;