import { View, Text, ImageBackground } from 'react-native';
import React from 'react';

import IconFeather from 'react-native-vector-icons/Feather';

const BackgroundMain = ({ bottom, opacityBackground }) => {
    return (
        <View style={{ position: 'relative' }}>
            <ImageBackground
                style={{
                    paddingTop: 130,
                    paddingBottom: 42,
                    paddingHorizontal: 12,
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
                        fontSize: 24,
                        fontWeight: '600',
                    }}
                    numberOfLines={1}
                >
                    Hoạt động nổi bật ở thành phố Hồ Chí Minh
                </Text>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 16,
                        marginTop: 8,
                    }}
                >
                    <IconFeather name="map-pin" size={16} />
                    TP Hồ Chí Minh
                </Text>
            </ImageBackground>
        </View>
    );
};

export default BackgroundMain;
