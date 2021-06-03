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

export const fonts = EStyleSheet.create({
    basicFamily: { fontFamily: '$mainFontFamily' },

    size11 : { fontSize: normalize(11), lineHeight: normalize(11) },
    size14 : { fontSize: normalize(14), lineHeight: normalize(14) },
    size16 : { fontSize: normalize(16), lineHeight: normalize(16) },
    size18 : { fontSize: normalize(18), lineHeight: normalize(18) },
    size24 : { fontSize: normalize(24), lineHeight: normalize(24) },
    size38 : { fontSize: normalize(38), lineHeight: normalize(38) },
    size40 : { fontSize: normalize(40), lineHeight: normalize(40) },

    weightNormal: { fontWeight: 'normal' },
    weightBold: { fontWeight: 'bold' },

    colorRed: { color: '#EB5757' },
    colorBlack: { color: 'black' },
    colorWhite: { color: 'white'},
    colorRedOpacity: { color: '#F5ABAB'},
    colorBlueOpacity: { color: '#80B6FF' },
    colorLightGray: { color: '#E6E6E6' },
    colorDeepGray: { color: '#737373' }
});
