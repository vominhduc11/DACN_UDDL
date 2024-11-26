import { View, Text, Modal, TextInput, TouchableWithoutFeedback, ScrollView, Keyboard, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

import Config from '../../.env/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalDestination = ({ setNameCity, navigation }, ref) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [citys, setCitys] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cung cấp hàm openModal cho component cha
    useImperativeHandle(ref, () => ({
        openModal() {
            setVisible(true);
        },
        closeModal() {
            setVisible(false);
        },
    }));

    // Sử lý khi nhấp vào tên thành phố
    const handlePressCity_Name = (cityName) => {
        setVisible(false);
        setValue(cityName);
        setNameCity(cityName);
    };

    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = async (...param) => {
        const [id, image, name, star, category, cityId, city, packages] = param;
        //Chuyển sang trang sản phẩm
        navigation.navigate('Product', {
            id: id,
            category: category,
            cityId: cityId,
            cityName: city,
        });

        //Lưu sản phẩm vào AsyncStorage
        const arr = (await AsyncStorage.getItem('product')) ? JSON.parse(await AsyncStorage.getItem('product')) : [];

        if (!arr.some((item) => item.id === id)) {
            if (arr.length === 10) {
                arr.pop();
            }
            arr.unshift({ id: id, image: image, name: name, star: star, category: category, cityId: cityId, city: city, package: packages });
            await AsyncStorage.setItem('product', JSON.stringify(arr));
        } else {
            // Tách phần tử có id bằng 2 và các phần tử còn lại
            const elementToMove = arr.filter((item) => item.id === id);
            const remainingElements = arr.filter((item) => item.id !== id);

            // Nối phần tử đã lọc lên đầu mảng
            const newArray = elementToMove.concat(remainingElements);
            await AsyncStorage.setItem('product', JSON.stringify(newArray));
        }
    };

    // Các phần tử renderItem
    const renderItemCity = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setVisible(false);
                setNameCity(item.name);
            }}
            activeOpacity={0.5}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(12), // Responsive padding horizontal
                    paddingVertical: verticalScale(6), // Responsive padding vertical
                }}
            >
                {/* Icon */}
                <IconFeather name="map-pin" size={moderateScale(26)} color="#FF6600" />

                {/* Tên thành phố và quốc gia */}
                <View style={{ paddingHorizontal: scale(12) }}>
                    <Text
                        style={{
                            color: '#000',
                            fontWeight: '700',
                            fontSize: moderateScale(16), // Responsive font size
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            color: '#000',
                            fontSize: moderateScale(14), // Responsive font size for country
                        }}
                    >
                        {item.country}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderItemProduct = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() => {
                setVisible(false);
                handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package);
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: scale(12) }}>
                {/* Product Image */}
                <FastImage
                    style={{
                        height: moderateScale(50), // Responsive height
                        width: moderateScale(50), // Responsive width
                        borderRadius: moderateScale(8), // Responsive border radius
                    }}
                    source={{ uri: item.image, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                {/* Product Info */}
                <View style={{ flex: 1, marginLeft: scale(10) }}>
                    <Text style={{ color: '#000', marginBottom: verticalScale(4) }} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={{ color: '#c0c0c0', fontWeight: '700' }}>{item.city}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    useEffect(() => {
        if (value === '') {
            setCitys([]);
            setProducts([]);
        }
        if (loading) {
            return;
        }
        setLoading(true);
        async function fetchData() {
            try {
                const res = await axios.get(`${Config.API_URL}/api/getListCityAccordingString/${value}`);
                setCitys(res.data);

                const res1 = await axios.get(`${Config.API_URL}/api/getListProductAccordingString/${value}`);
                setProducts(res1.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [value]);
    return (
        <Modal animationType="slide" transparent={true} visible={visible} hardwareAccelerated={true}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', flex: 1 }}>
                    {/* Header: Close and Search Input */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: scale(12) }}>
                        <IconAntDesign name="close" size={22} color="#000" onPress={() => setVisible(false)} />
                        <TextInput
                            placeholder="Tìm thành phố hoặc điểm đến"
                            placeholderTextColor="#C0C0C0"
                            value={value}
                            onChangeText={setValue}
                            style={{
                                borderWidth: 1,
                                borderColor: '#f9c197',
                                borderRadius: 30,
                                flex: 1,
                                marginLeft: scale(14),
                                paddingHorizontal: scale(16),
                                paddingVertical: scale(6),
                                color: '#000',
                            }}
                        />
                    </View>

                    {/* City and Product Lists */}
                    {(citys.length !== 0 || products.length !== 0) && (
                        <ScrollView
                            style={{
                                position: 'absolute',
                                zIndex: 1,
                                top: verticalScale(66),
                                width: '100%',
                                backgroundColor: '#fff',
                                height: Dimensions.get('window').height - verticalScale(66),
                            }}
                            keyboardShouldPersistTaps="handled"
                        >
                            {citys.length !== 0 && (
                                <FlatList
                                    style={{ paddingVertical: verticalScale(12) }}
                                    data={citys}
                                    scrollEnabled={false}
                                    renderItem={renderItemCity}
                                    keyExtractor={(item) => item.id}
                                    ListHeaderComponent={() => <View style={{ height: verticalScale(12) }} />}
                                    ItemSeparatorComponent={() => <View style={{ height: verticalScale(12) }} />}
                                />
                            )}
                            {products.length !== 0 && (
                                <>
                                    <View style={{ borderBottomColor: '#dedede', borderBottomWidth: 1 }} />
                                    <FlatList
                                        style={{ paddingVertical: verticalScale(12) }}
                                        data={products}
                                        scrollEnabled={false}
                                        renderItem={renderItemProduct}
                                        keyExtractor={(item) => item.id}
                                        ListHeaderComponent={() => (
                                            <Text style={{ color: '#c0c0c0', paddingHorizontal: scale(12), marginBottom: verticalScale(16) }}>
                                                Có thể bạn sẽ thích
                                            </Text>
                                        )}
                                        ItemSeparatorComponent={() => <View style={{ height: verticalScale(12) }} />}
                                    />
                                </>
                            )}
                        </ScrollView>
                    )}

                    {/* Popular Cities */}
                    <View style={{ flex: 1, paddingHorizontal: scale(14), paddingVertical: verticalScale(24) }}>
                        <Text style={{ fontWeight: '700', color: '#000' }}>Phổ biến nhất</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {['Tokyo', 'Osaka', 'Kyoto', 'Thâm Quyến', 'Bangkok', 'Seoul', 'Sydney', 'Quảng Châu'].map((city, index) => (
                                <Text
                                    key={index}
                                    onPress={() => handlePressCity_Name(city, index + 1)}
                                    style={{
                                        backgroundColor: '#f5f5f5',
                                        paddingVertical: verticalScale(8),
                                        paddingHorizontal: scale(12),
                                        borderRadius: 24,
                                        color: '#000',
                                        marginRight: scale(8),
                                        marginTop: verticalScale(12),
                                    }}
                                >
                                    {city}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default forwardRef(ModalDestination);
