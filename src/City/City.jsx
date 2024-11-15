import { View, Text, ImageBackground, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';

import Header from './Component/Header';

import BackgroundMain from './Component/BackgroundMain';
import Part1 from './Component/Part1';
import Part2 from './Component/Part2';
import Part3 from './Component/Part3';
import axios from 'axios';

const City = ({ navigation, route }) => {
    const [opacity, setOpacity] = useState(0);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [color, setColor] = useState('#fff');
    const [bottom, setBottom] = useState(0);
    const [city, setCity] = useState({});

    // const [backgroundBtn, setBackgroundBtn] = useState('#fff');

    // Lấy dữ liệu id khi vào trang thành phố
    const { id } = route.params;

    const handleScroll = (event) => {
        // Lấy tọa độ của scroll
        const scrollY = event.nativeEvent.contentOffset.y;
        setOpacity(scrollY / 160);
        setBottom(scrollY / 5);
        setOpacityBackground(1.2 - scrollY / 160);

        if (scrollY >= 160) {
            setColor('#f5f5f5');
            // setZIndex(1);
        } else {
            setColor('#fff');
            // setZIndex(10);
        }
    };
    // Gọi Api
    useEffect(() => {
        async function fetchData() {
            const res1 = await axios.get(`http://10.150.3.6:8080/api/getCity/${id}`);
            setCity(res1.data); // Truy cập vào dữ liệu trong response
        }
        fetchData();
    }, []);
    return (
        <View style={{ position: 'relative' }}>
            <Header opacity={opacity} color={color} navigation={navigation} />
            <ScrollView
                onScroll={handleScroll}
                style={{ backgroundColor: '#fff', height: '100%' }}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                overScrollMode="always"
            >
                <BackgroundMain bottom={bottom} opacityBackground={opacityBackground} city={city} />
                <View
                    style={{
                        paddingHorizontal: 12,
                        zIndex: 10,
                        borderRadius: 12,
                        backgroundColor: '#fff',
                        marginTop: -12,
                        paddingTop: 20,
                        paddingBottom: 12,
                    }}
                >
                    <Part1 id={id} />
                    <Part2 navigation={navigation} city={city} id={id} />
                    <Part3 />
                </View>
            </ScrollView>
        </View>
    );
};

export default City;
