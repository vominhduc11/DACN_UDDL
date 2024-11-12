import { View, Text, ImageBackground } from 'react-native';
import React from 'react';

const BackgroundMain = ({ bottom, opacityBackground, city }) => {
    return (
        <View style={{ position: 'relative' }}>
            <ImageBackground
                style={{
                    paddingTop: 148,
                    paddingBottom: 52,
                    paddingHorizontal: 12,
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
                        fontSize: 24,
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
