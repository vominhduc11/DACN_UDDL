import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import FastImage from 'react-native-fast-image';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import numeral from 'numeral';

import Config from '../../.env/Config';

const ListSearch = ({ category, handlePressProduct, nameCity }, ref) => {
    const [products, setProducts] = useState([]);

    //Thiết lập hàm cho component cha
    useImperativeHandle(ref, () => ({
        setListProduct(param) {
            setListProduct(param); // Gọi state setter
        },
    }));
    //Tìm gía nhỏ nhất trong gói
    const minPricePackage = useCallback((data) => {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    }, []);
    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }

    //Chuyển đổi tiền tệ
    const formatNumberWithCommas = useCallback((number) => {
        return numeral(number).format('0,0');
    }, []);

    //chuyển đổi số lớn
    const formatNumber = (number) => {
        if (number >= 1000) {
            return numeral(number).format('0.[0]a').toUpperCase();
        }
        return number;
    };

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

    // Sử lý khi bấm vào tên thành phố
    const setListProduct = async (cityId) => {
        const res = await axios.get(`${Config.API_URL}/api/getAllProductOfCity/${cityId}`);
        setProducts(res.data);
    };

    // Gọi api lần đầu
    useEffect(() => {
        async function fetchData() {
            if (nameCity) {
                const res = await axios.get(`${Config.API_URL}/api/getAllProductOfCategoryAndCity/${category}/${nameCity}`);
                setProducts(res.data);
            } else {
                // category được truyền qua từ trang trước
                const res = await axios.get(`${Config.API_URL}/api/getAllProductOfCategory/${category}`);
                setProducts(res.data);
            }
        }
        fetchData();
    }, []);
    return (
        <FlatList
            style={{ paddingHorizontal: 12, flex: 1 }}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={3}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
            contentContainerStyle={{ flexGrow: 1 }}
            ListHeaderComponent={
                <View style={{ backgroundColor: '#fff' }}>
                    <Text style={{ color: '#000', paddingVertical: 15 }}>Tìm thấy {products.length} kết quả</Text>
                </View>
            }
            ListFooterComponent={() => <View style={{ height: 12 }} />}
        />
    );
};

export default forwardRef(ListSearch);
