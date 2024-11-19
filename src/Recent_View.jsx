import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import numeral from 'numeral';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Recent_View = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }

    //Tìm gía nhỏ nhất trong gói
    const minPricePackage = (data) => {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    };

    //Chuyển thành kiểu tiền tệ
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
    };

    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = async (id, image, name, star, category, cityId, city, packages) => {
        //Chuyển sang trang sản phẩm
        navigation.navigate('Product', {
            id: id,
            category: category,
            cityId: cityId,
            cityName: city,
        });

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

    useEffect(() => {
        async function fetchData() {
            const products = await AsyncStorage.getItem('product');
            setProducts(JSON.parse(products));
        }
        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginTop: 12 }}
            onPress={() => handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
        >
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 12,
                }}
            >
                <FastImage
                    style={{ height: 100, width: 100, borderRadius: 12 }}
                    source={{
                        uri: item.image,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ color: '#000' }}>
                        {item.category} <IconEntypo name="dot-single" /> {item.city}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text style={{ marginTop: 6 }} numberOfLines={1}>
                        <IconAntDesign name="star" color="#fe9428" />{' '}
                        <Text
                            style={{
                                color: '#fe9428',
                                fontWeight: '600',
                            }}
                        >
                            {item.star}
                        </Text>
                        (152)
                        <IconEntypo name="dot-single" />
                        2K+ Đã được đặt
                    </Text>
                    <View
                        style={{
                            marginTop: 12,
                            flexDirection: 'row',
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
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={{ paddingBottom: 12 }}>
            <FlatList
                data={products}
                renderItem={useCallback(renderItem, [])}
                keyExtractor={(item) => item.id}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
            />
        </View>
    );
};

export default Recent_View;
