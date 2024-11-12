import { View, Text, ImageBackground, Image, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native';
import React, { useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import ModalDestination from './Modal/ModalDestination';
import ModalCategory from './Modal/ModalCategory';
import Destination from './Destination';
import Category from './Category';

const Fun_experience = ({ navigation }) => {
    const [opacity, setOpacity] = useState(0);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [color1, setColor1] = useState('#fff');
    const [color2, setColor2] = useState('transparent');
    const [bottom, setBottom] = useState(0);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [nameCity, setNameCity] = useState(undefined);
    const [nameCategory, setNameCategory] = useState(undefined);
    const [active, setActive] = useState(undefined);

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
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    backgroundColor: 'red',
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                    paddingTop: 24,
                    paddingBottom: 12,
                    paddingHorizontal: 12,
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 100,
                }}
            >
                <IconEntypo onPress={() => navigation.navigate('Home')} name="chevron-left" size={30} color={color1} />
            </View>
            <ScrollView
                onScroll={handleScroll}
                style={{ backgroundColor: '#fff', height: '100%' }}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
            >
                <View style={{ position: 'relative' }}>
                    <ImageBackground
                        style={{
                            paddingTop: 100,
                            paddingBottom: 80,
                            paddingHorizontal: 12,
                            position: 'relative',
                            bottom: bottom,
                            opacity: opacityBackground,
                        }}
                        source={{
                            uri: 'https://dep.com.vn/wp-content/uploads/2018/08/khinh-khi-cau_1.jpg',
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 28,
                                fontWeight: '600',
                            }}
                        >
                            Vui chơi & Trải nghiệm
                        </Text>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 14,
                                marginTop: 8,
                            }}
                        >
                            Tour, công viên, spa và nhiều hoạt động khác
                        </Text>
                    </ImageBackground>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        zIndex: 10,
                        borderRadius: 12,
                        backgroundColor: '#fff',
                        marginTop: -12,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000',
                            marginTop: 20,
                        }}
                    >
                        Bạn đang tìm gì?
                    </Text>
                    {/* Điểm đến */}
                    <Destination nameCity={nameCity} setModalVisible1={setModalVisible1} />
                    <ModalDestination
                        modalVisible1={modalVisible1}
                        setModalVisible1={setModalVisible1}
                        setNameCity={setNameCity}
                    />
                    {/* Danh mục */}
                    <Category nameCategory={nameCategory} setModalVisible2={setModalVisible2} />
                    <ModalCategory
                        active={active}
                        modalVisible2={modalVisible2}
                        setModalVisible2={setModalVisible2}
                        setNameCategory={setNameCategory}
                        setActive={setActive}
                    />
                    {/* Btn khám phá */}
                    <View style={{ height: 38 }} />
                    <TouchableWithoutFeedback>
                        <Text
                            style={{
                                backgroundColor: '#ff5c19',
                                color: '#fff',
                                fontWeight: '600',
                                textAlign: 'center',
                                padding: 14,
                                borderRadius: 12,
                            }}
                        >
                            Khám phá
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        </View>
    );
};

export default Fun_experience;
