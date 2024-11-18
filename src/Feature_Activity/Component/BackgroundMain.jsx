import { View, Text, ImageBackground } from 'react-native';
import React from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const BackgroundMain = ({ bottom, opacityBackground }) => {
    return (
        <View style={{ position: 'relative' }}>
            <ImageBackground
                style={{
                    paddingTop: verticalScale(130), // Dùng verticalScale cho paddingTop
                    paddingBottom: verticalScale(42), // Dùng verticalScale cho paddingBottom
                    paddingHorizontal: scale(12), // Dùng scale cho paddingHorizontal
                    position: 'relative',
                    bottom: bottom,
                    opacity: opacityBackground,
                }}
                source={{
                    uri: 'https://tphcm.dangcongsan.vn/DATA/72/IMAGES/2023/11/tao-da-de-tphcm-phat-trien-thanh-do-thi-thong-minh1517188897.jpg',
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: moderateScale(24), // Dùng moderateScale cho fontSize
                        fontWeight: '600',
                    }}
                    numberOfLines={1}
                >
                    Hoạt động nổi bật ở thành phố Hồ Chí Minh
                </Text>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: moderateScale(16), // Dùng moderateScale cho fontSize
                        marginTop: verticalScale(8), // Dùng verticalScale cho marginTop
                    }}
                >
                    <IconFeather name="map-pin" size={moderateScale(16)} /> {/* Dùng moderateScale cho Icon size */}
                    TP Hồ Chí Minh
                </Text>
            </ImageBackground>
        </View>
    );
};

export default BackgroundMain;
