import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Header from './Component/Header';
import BackgroundMain from './Component/BackgroundMain';
import Container from './Component/Container';
import { scale, verticalScale } from 'react-native-size-matters';

const Feature_Activity = ({ navigation }) => {
    const [opacity, setOpacity] = useState(0);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [color1, setColor1] = useState('#fff');
    const [color2, setColor2] = useState('transparent');
    const [bottom, setBottom] = useState(0);

    const handleScroll = (event) => {
        // Lấy tọa độ của scroll
        const scrollY = event.nativeEvent.contentOffset.y;
        setOpacity(scrollY / 160);
        setBottom(scrollY / 5);
        setOpacityBackground(1.2 - scrollY / 160);

        if (scrollY >= 160) {
            setColor1('#000');
            setColor2('#000');
            // setZIndex(1);
        } else {
            setColor1('#fff');
            setColor2('transparent');
            // setZIndex(10);
        }
    };
    return (
        <View style={{ position: 'relative' }}>
            <Header opacity={opacity} color1={color1} color2={color2} navigation={navigation} />

            <ScrollView
                onScroll={handleScroll}
                style={{
                    backgroundColor: '#fff',
                    height: '100%',
                }}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
            >
                <BackgroundMain bottom={bottom} opacityBackground={opacityBackground} />
                <View
                    style={{
                        paddingHorizontal: scale(12),
                        paddingBottom: verticalScale(20), // Adjusting padding for flexibility
                        paddingTop: verticalScale(16), // Adjust top padding with vertical scale
                    }}
                >
                    <Container />
                </View>
            </ScrollView>
        </View>
    );
};

export default Feature_Activity;
