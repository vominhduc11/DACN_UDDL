import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import numeral from 'numeral';

import { API_URL } from '@env';

const Have_fun = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);

    const { nameCity, idCity } = route.params;

    //chuyển đổi số lớn
    const formatNumber = (number) => {
        if (number >= 1000) {
            return numeral(number).format('0.[0]a').toUpperCase();
        }
        return number;
    };
    //Tìm gía nhỏ nhất trong gói
    const minPricePackage = (data) => {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    };
    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }

    //Chuyển đổi tiền tệ
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
    };

    // Phần tử render trong FlatList
    const renderItem = ({ item }) => (
        <View style={{ position: 'relative' }}>
            <FastImage
                style={{
                    height: 160,
                    borderRadius: 12,
                }}
                source={{
                    uri: item.image,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={{ marginTop: 6, color: '#c0c0c0' }}>
                {item.category} <IconEntypo name="dot-single" /> {item.city}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#000',
                    marginTop: 6,
                }}
            >
                {item.name}
            </Text>
            <Text style={{ marginTop: 6, color: '#c0c0c0' }}>
                <IconAntDesign name="star" color="#fe9428" />{' '}
                <Text
                    style={{
                        color: '#fe9428',
                        fontWeight: '600',
                    }}
                >
                    {item.star}
                </Text>
                ({item.evaluate})
                <IconEntypo name="dot-single" />
                {formatNumber(item.booked)} Đã được đặt
            </Text>
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
    );

    // Gọi api lần đầu cho product
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}/api/getAllProductOfCity/${idCity}`);
                console.log(idCity);
                setProducts(res.data);
            } catch (error) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    paddingHorizontal: 12,
                    paddingTop: 24,
                    paddingBottom: 12,
                }}
            >
                <IconEntypo name="chevron-left" color="#000" size={30} onPress={() => navigation.goBack()} />
                <Text
                    style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: '700',
                        marginLeft: 24,
                    }}
                >
                    Vui hết cỡ tại {nameCity}
                </Text>
            </View>
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
                ListHeaderComponent={() => <View style={{ height: 12 }} />}
                ListFooterComponent={() => <View style={{ height: 12 }} />}
            />
        </View>
    );
};

export default Have_fun;
