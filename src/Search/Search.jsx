import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import numeral from 'numeral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDestination from './Modal/Modal';
import Header from './Component/Header';

const Search = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);

    //Nhận prop
    const { category } = route.params;
    // Thẻ ref dùng để gọi hàm useImperativeHandle trong component ModalDestination
    const modalRef = useRef();
    // Thẻ ref dùng để gọi hàm useImperativeHandle trong component Header
    const valueRef = useRef();

    const openModal = () => {
        modalRef.current.openModal();
    };
    //chuyển đổi số lớn
    const formatNumber = (number) => {
        if (number >= 1000) {
            return numeral(number).format('0.[0]a').toUpperCase();
        }
        return number;
    };

    //Chuyển đổi tiền tệ
    const formatNumberWithCommas = useCallback((number) => {
        return numeral(number).format('0,0');
    }, []);

    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }

    //Tìm gía nhỏ nhất trong gói
    const minPricePackage = useCallback((data) => {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    }, []);

    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = useCallback(async (id, image, name, star, category, cityId, city, packages) => {
        //Chuyển sang trang sản phẩm
        navigation.push('Product', {
            id: id,
            category: category,
            cityId: cityId,
        });

        // Lưu sản phẩm vào AsyncStorage
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
    }, []);

    // Phần tử render trong FlatList
    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() => handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
        >
            <View style={{ position: 'relative' }}>
                <FastImage
                    style={{ height: 160, borderRadius: 12 }}
                    source={{
                        uri: item.image,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={{ marginTop: 6, color: '#747878' }}>
                    {item.category} <IconEntypo name="dot-single" /> {item.city}
                </Text>
                <Text
                    numberOfLines={3}
                    style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#000',
                        marginTop: 6,
                    }}
                >
                    {item.name}
                </Text>
                <View style={{ marginTop: 6, flexDirection: 'row' }}>
                    <Text
                        style={{
                            color: '#fe9428',
                            fontWeight: '600',
                        }}
                    >
                        <IconAntDesign name="star" color="#fe9428" />
                        {item.star}
                    </Text>
                    <Text style={{ marginLeft: 12, color: '#747878' }}>
                        ({item.evaluate})
                        <IconEntypo name="dot-single" />
                        {formatNumber(item.booked)} Đã được đặt
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#000',
                        marginTop: 6,
                    }}
                >
                    {item.package.length === 0 && <Text style={{ color: '#ccc', fontWeight: '700' }}>Đã hết hàng</Text>}
                    {item.package.length > 1 && (
                        <>
                            <Text style={{ fontWeight: '700', color: '#000', marginRight: 2 }}>Từ </Text>
                            <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                        </>
                    )}
                    {item.package.length === 1 && item.package[0].quantitys.length > 1 && (
                        <>
                            <Text
                                style={{
                                    fontWeight: '700',
                                    color: '#000',
                                    marginRight: 2,
                                }}
                            >
                                Từ{' '}
                            </Text>
                            <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                        </>
                    )}
                    {item.package.length === 1 && item.package[0].quantitys.length === 1 && (
                        <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                    )}
                </Text>
                <IconAntDesign name="hearto" size={25} color="#fff" style={{ position: 'absolute', right: 12, top: 20 }} />
            </View>
        </TouchableWithoutFeedback>
    );

    // Sử lý giá trị input trong component Header
    const setValueInput = (cityName) => {
        valueRef.current.setValueInput(cityName);
    };

    // Sử lý khi bấm vào tên thành phố
    const setListProduct = async (cityId) => {
        const res = await axios.get(`http://192.168.0.113:8080/api/getAllProductOfCity/${cityId}`);
        setProducts(res.data);
    };

    // Gọi api lần đầu
    useEffect(() => {
        async function fetchData() {
            // category được truyền qua từ trang trước
            const res = await axios.get(`http://192.168.0.113:8080/api/getAllProductOfCategory/${category}`);
            setProducts(res.data);
        }
        fetchData();
    }, []);

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <Header navigation={navigation} openModal={openModal} ref={valueRef} />

            <View
                style={{
                    paddingHorizontal: 12,
                    backgroundColor: '#fff',
                }}
            >
                {/* phần tử */}
                <FlatList
                    data={products}
                    renderItem={useCallback(renderItem, [])}
                    keyExtractor={(item) => item.id}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    windowSize={3}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                    ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
                    ListHeaderComponent={
                        <View style={{ backgroundColor: '#fff' }}>
                            <Text style={{ color: '#000', paddingVertical: 15 }}>Tìm thấy {products.length} kết quả</Text>
                        </View>
                    }
                />
            </View>

            <ModalDestination ref={modalRef} setValueInput={setValueInput} setListProduct={setListProduct} />
        </View>
    );
};

export default Search;
