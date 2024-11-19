import { View, Text, ImageBackground, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';

import Header from './Component/Header';

import BackgroundMain from './Component/BackgroundMain';
import Part1 from './Component/Part1';
import Part2 from './Component/Part2';
import Part3 from './Component/Part3';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import Config from '../.env/Config';

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
            try {
                const res = await axios.get(`${Config.API_URL}/api/getCity/${id}`);
                setCity(res.data); // Truy cập vào dữ liệu trong response
            } catch (error) {
                console.log(error);
            }
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
                        paddingHorizontal: scale(12), // Dùng scale cho padding ngang
                        zIndex: 10,
                        borderRadius: moderateScale(12), // Dùng moderateScale cho borderRadius
                        backgroundColor: '#fff',
                        marginTop: verticalScale(-12), // Dùng verticalScale cho marginTop
                        paddingTop: verticalScale(20), // Dùng verticalScale cho paddingTop
                        paddingBottom: verticalScale(12), // Dùng verticalScale cho paddingBottom
                    }}
                >
                    <Part1 id={id} city={city} navigation={navigation} />
                    <Part2 id={id} city={city} navigation={navigation} />
                    <Part3 id={id} city={city} navigation={navigation} />
                </View>
            </ScrollView>
        </View>
    );
};

export default City;
