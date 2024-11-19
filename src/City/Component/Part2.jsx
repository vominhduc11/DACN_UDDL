import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import numeral from 'numeral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { API_URL } from '@env';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Part2 = ({ navigation, city, id }) => {
    const [products, setProducts] = useState([]);

    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }
    //Tìm gía nhỏ nhất trong gói
    function minPricePackage(data) {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    }
    //Chuyển thành kiểu tiền tệ
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
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
    };

    useEffect(() => {
        async function fetchData() {
            const res1 = await axios.get(`${API_URL}/api/getProductOfCity/${id}/4`);
            setProducts(res1.data);
        }

        fetchData();
    }, []);
    return (
        <View style={{ marginTop: moderateScale(28) }}>
            <Text
                style={{
                    color: '#000',
                    fontSize: moderateScale(18),
                    fontWeight: '700',
                }}
            >
                Vui hết cỡ tại {city.name}
            </Text>
            <View
                style={{
                    marginTop: moderateScale(24),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {products.map((product) => (
                    <TouchableWithoutFeedback
                        key={product.id}
                        onPress={() =>
                            handlePressProduct(
                                product.id,
                                product.image,
                                product.name,
                                product.star,
                                product.category,
                                product.cityId,
                                product.city,
                                product.package
                            )
                        }
                    >
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#DDDDDD',
                                borderRadius: 12,
                                width: scale(140),
                                marginBottom: moderateScale(15),
                                position: 'relative',
                            }}
                        >
                            <FastImage
                                style={{
                                    height: verticalScale(100),
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{ uri: product.image, priority: FastImage.priority.high }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: moderateScale(5),
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: verticalScale(140),
                                    }}
                                >
                                    {product.name}
                                </Text>
                                <Text style={{ marginTop: moderateScale(6) }}>
                                    <IconAntDesign name="star" size={moderateScale(16)} color="#FFCC33" />
                                    <Text
                                        style={{
                                            color: '#FFCC33',
                                        }}
                                    >
                                        {product.star}
                                    </Text>
                                    (362)
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: '700',
                                        marginTop: moderateScale(6),
                                        color: '#000',
                                    }}
                                >
                                    đ {formatNumberWithCommas(minPricePackage(product.package))}
                                </Text>
                            </View>
                            <IconAntDesign
                                name="hearto"
                                size={moderateScale(25)}
                                color="#fff"
                                style={{
                                    position: 'absolute',
                                    right: scale(12),
                                    top: verticalScale(12),
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Have_fun', { nameCity: city.name, idCity: city.id })}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#000',
                        fontWeight: '700',
                        borderWidth: 1,
                        paddingVertical: moderateScale(12),
                        borderRadius: 12,
                    }}
                >
                    Xem tất cả
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Part2;
