import { View, Text, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import axios from 'axios';
import Config from '../../.env/Config';

const BackgroundMain = ({ bottom, opacityBackground, city }) => {
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
                    uri: city.image,
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
                    Hoạt động nổi bật ở thành phố {city.name}
                </Text>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: moderateScale(16), // Dùng moderateScale cho fontSize
                        marginTop: verticalScale(8), // Dùng verticalScale cho marginTop
                    }}
                >
                    <IconFeather name="map-pin" size={moderateScale(16)} /> {/* Dùng moderateScale cho Icon size */}
                    {city.name}
                </Text>
            </ImageBackground>
        </View>
    );
};

export default BackgroundMain;
