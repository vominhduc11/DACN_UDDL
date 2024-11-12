import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Header from './Component/Header';
import BackgroundMain from './Component/BackgroundMain';
import Container from './Component/Container';

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
            <ScrollView
                onScroll={handleScroll}
                style={{ backgroundColor: '#fff', height: '100%' }}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
            >
                <BackgroundMain bottom={bottom} opacityBackground={opacityBackground} />
                <Container />
            </ScrollView>
            <Header opacity={opacity} color1={color1} color2={color2} navigation={navigation} />
        </View>
    );
};

export default Feature_Activity;
