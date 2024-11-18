import { View, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';

import ModalDestination from './Modal/ModalDestination';
import ModalCategory from './Modal/ModalCategory';
import Destination from './Component/Destination';
import Category from './Component/Category';
import BackgroundMain from './Component/BackgroundMain';
import Header from './Component/Header';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Fun_experience = ({ navigation }) => {
    const [colorAuthenCity, setColorAuthenCity] = useState(true);
    const [colorAuthenCategory, setColorAuthenCategory] = useState(true);

    // Thẻ để component con Destination gọi hàm ở component con modalDestination
    const modalDestinationRef = useRef();
    // Thẻ để component con Category gọi hàm ở component con modalCategory
    const modalCategoryRef = useRef();
    // Thẻ để component con MOdalDestination gọi hàm ở component con Destination
    const destinationRef = useRef();
    // Thẻ để component con MOdalCategory gọi hàm ở component con Category
    const categoryRef = useRef();

    // Hàm trung gian Destination modalDestination
    const openModalDestination = () => {
        modalDestinationRef.current.openModal();
    };
    // Hàm trung gian Category modalCategory
    const openModalCategory = () => {
        modalCategoryRef.current.openModal();
    };

    // Sử lí khi bấm nút khám phá
    const handleWhenOnpressDiscover = () => {
        // Kiểm tra đã chonj tên chưa
        destinationRef.current.getnameCity() ? setColorAuthenCity(true) : setColorAuthenCity(false);
        categoryRef.current.getnameCategory() ? setColorAuthenCategory(true) : setColorAuthenCategory(false);

        // Xét trường hợp để chuyển trang
        if (destinationRef.current.getnameCity() && categoryRef.current.getnameCategory()) {
            navigation.navigate('Search', { category: categoryRef.current.getnameCategory(), nameCity: destinationRef.current.getnameCity() });
        }
    };

    // set giá trị cho thẻ input ở dưới component con Destination
    const setNameCity = (name) => {
        destinationRef.current.setNameCity(name);
    };
    // set giá trị cho thẻ input ở dưới component con Category
    const setNameCategory = (name) => {
        categoryRef.current.setNameCategory(name);
    };

    return (
        <View style={{ position: 'relative' }}>
            <Header navigation={navigation} />
            <ScrollView
                style={{
                    backgroundColor: '#fff',
                    height: '100%',
                }}
                showsVerticalScrollIndicator={false}
            >
                <BackgroundMain />

                <View
                    style={{
                        paddingHorizontal: scale(20), // Scale padding ngang
                        zIndex: 10,
                        borderRadius: moderateScale(12), // Scale border radius
                        backgroundColor: '#fff',
                        marginTop: verticalScale(-12), // Vertical scale margin
                    }}
                >
                    <Text
                        style={{
                            fontSize: moderateScale(17), // Scale font size
                            fontWeight: '700',
                            color: '#000',
                            marginTop: verticalScale(20), // Vertical scale margin
                        }}
                    >
                        Bạn đang tìm gì?
                    </Text>

                    {/* Điểm đến */}
                    <Destination openModalDestination={openModalDestination} colorAuthenCity={colorAuthenCity} ref={destinationRef} />
                    <ModalDestination setNameCity={setNameCity} ref={modalDestinationRef} />

                    {/* Danh mục */}
                    <Category openModalCategory={openModalCategory} colorAuthenCategory={colorAuthenCategory} ref={categoryRef} />
                    <ModalCategory setNameCategory={setNameCategory} ref={modalCategoryRef} />

                    {/* Btn khám phá */}
                    <TouchableOpacity activeOpacity={1} style={{ marginTop: moderateScale(36) }} onPress={handleWhenOnpressDiscover}>
                        <Text
                            style={{
                                backgroundColor: '#ff5c19',
                                color: '#fff',
                                fontWeight: '600',
                                textAlign: 'center',
                                padding: verticalScale(14), // Vertical scale padding
                                borderRadius: moderateScale(12), // Scale border radius
                            }}
                        >
                            Khám phá
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Fun_experience;
