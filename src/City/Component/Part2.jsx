import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import numeral from 'numeral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

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
    const handlePressProduct = async (id, image, name, star, category, cityId, city, packages) => {
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

        //Chuyển sang trang sản phẩm
        navigation.navigate('Product', {
            id: id,
            category: category,
            cityId: cityId,
        });
    };

    useEffect(() => {
        async function fetchData() {
            const res1 = await axios.get(`http://192.168.0.113:8080/api/getProductOfCity/${id}/4`);
            setProducts(res1.data);
        }

        fetchData();
    }, []);
    return (
        <View style={{ marginTop: 28 }}>
            <Text
                style={{
                    color: '#000',
                    fontSize: 18,
                    fontWeight: '700',
                }}
            >
                Vui hết cỡ tại {city.name}
            </Text>
            <View
                style={{
                    marginTop: 24,
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
                                width: 140,
                                marginBottom: 15,
                                position: 'relative',
                            }}
                        >
                            <FastImage
                                style={{
                                    height: 100,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{ uri: product.image, priority: FastImage.priority.high }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: 140,
                                    }}
                                >
                                    {product.name}
                                </Text>
                                <Text style={{ marginTop: 6 }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
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
                                        marginTop: 6,
                                        color: '#000',
                                    }}
                                >
                                    đ {formatNumberWithCommas(minPricePackage(product.package))}
                                </Text>
                            </View>
                            <IconAntDesign
                                name="hearto"
                                size={25}
                                color="#fff"
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: 12,
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Have_fun')}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#000',
                        fontWeight: '700',
                        borderWidth: 1,
                        paddingVertical: 12,
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
