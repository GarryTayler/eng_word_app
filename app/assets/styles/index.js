import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";
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
    /*
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size_scale * size)) + 2;
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size_scale * size))
    } */
    return size;
}

const tabHeight = 95, buttonSpacing = 32;
let safeAreaViewHeight = 0;

if(Platform.OS == 'ios') {
    const statusBarHeight = getStatusBarHeight(true);
    if (isIphoneX()) {
        safeAreaViewHeight = SCREEN_HEIGHT - statusBarHeight - getBottomSpace();
    } else {
        safeAreaViewHeight = SCREEN_HEIGHT - statusBarHeight;
    }
}
else {
    safeAreaViewHeight = SCREEN_HEIGHT - tabHeight - StatusBar.currentHeight;
}

export function calcButtonListMarginTop(buttonCnt, buttonHeight) {
    if(safeAreaViewHeight - (buttonCnt - 1) * (buttonSpacing + buttonHeight) - buttonHeight < 0)
        return 32;
    else
        return (safeAreaViewHeight - (buttonCnt - 1) * (buttonSpacing + buttonHeight) - buttonHeight) / 2;
}

export const fonts = EStyleSheet.create({
    basicFamily: { fontFamily: '$mainFontFamily' },

    size10 : { fontSize: normalize(10), lineHeight: normalize(12) },
    size11 : { fontSize: normalize(11), lineHeight: normalize(13) },
    size12 : { fontSize: normalize(12), lineHeight: normalize(14) },
    size14 : { fontSize: normalize(14), lineHeight: normalize(16) },
    size16 : { fontSize: normalize(16), lineHeight: normalize(20) },
    size18 : { fontSize: normalize(18), lineHeight: normalize(22) },
    size22 : { fontSize: normalize(22), lineHeight: normalize(26) },
    size24 : { fontSize: normalize(24), lineHeight: normalize(28) },
    size32 : { fontSize: normalize(32), lineHeight: normalize(38) },
    size38 : { fontSize: normalize(38), lineHeight: normalize(44) },
    size40 : { fontSize: normalize(40), lineHeight: normalize(50) },

    weightNormal: { fontWeight: 'normal' },
    weightBold: { fontWeight: 'bold' },

    colorRed: { color: '#EB5757' },
    colorBlack: { color: 'black' },
    colorWhite: { color: 'white'},
    colorBlue: { color: '#006DFF'},
    colorRedOpacity: { color: '#F5ABAB'},
    colorBlueOpacity: { color: '#80B6FF' },
    colorLightGray: { color: '#E6E6E6' },
    colorDeepGray: { color: '#737373' }
});
