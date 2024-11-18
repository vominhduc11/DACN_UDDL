import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';

const BackgroundMain = ({ bottom, opacityBackground, city }) => {
    return (
        <View style={{ position: 'relative' }}>
            <ImageBackground
                style={{
                    paddingTop: moderateScale(148),
                    paddingBottom: moderateScale(52),
                    paddingHorizontal: moderateScale(12),
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
                        fontSize: moderateScale(24),
                        fontWeight: '600',
                    }}
                    numberOfLines={1}
                >
                    {city.name}
                </Text>
            </ImageBackground>
        </View>
    );
};

export default BackgroundMain;
