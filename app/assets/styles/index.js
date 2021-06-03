import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform, PixelRatio} from 'react-native';
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
} = Dimensions.get('window');
const scale =  SCREEN_WIDTH / 360;
let size_scale = scale;
if (scale > 2) {
    size_scale = scale * 0.666;
}
export function normalize(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size_scale * size)) + 2;
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size_scale * size))
    }
}
