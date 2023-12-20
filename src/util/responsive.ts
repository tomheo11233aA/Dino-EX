import { HEIGHT_BOTTOM_TAB } from '@navigation/Container';
import { Dimensions, Platform } from 'react-native';

export const { width, height } = Dimensions.get('screen'); // width, height của màn hình

//iPhone 12
const DESIGN_WIDTH: number = 390;
const DESIGN_HEIGHT: number = 844;

const WIDTH: number = width > height ? height : width;
const HEIGHT: number = width > height ? width : height;
// scale theo xoay ngang xoay dọc
const scale = (size: number): number => {
    return (WIDTH / DESIGN_WIDTH) * size;
};
// scale chiều dọc theo kích thước màn hình
const verticalScale = (size: number): number => {
    return (HEIGHT / DESIGN_HEIGHT) * size;
};
// scale theo kích thước màn hình
const moderateScale = (size: number, factor: number = 0.5): number => {
    return size + (scale(size) - size) * factor;
};

export const heightBottomTab = () => {
    return Platform.OS === 'ios' ? HEIGHT_BOTTOM_TAB / 2 : HEIGHT_BOTTOM_TAB 
}

/**
 * getSize.m(10) Responsive for padding - margin - fontSize.
 *
 * getSize.s(10) Responsive by width screen. (Image Size)
 *
 * getSize.v(10) Responsive by height screen.
 **/

export const getSize = {
    m: moderateScale,
    s: scale,
    v: verticalScale,
};
