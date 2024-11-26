import { View, Text, TouchableWithoutFeedback, Modal, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import numeral from 'numeral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import Config from '../../.env/Config';

const Part2 = ({ navigation, city, id }) => {
    const [products, setProducts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const topRef = useRef(new Animated.Value(-58));
    //chuyển đổi số lớn
    const formatNumber = (number) => {
        if (number >= 1000) {
            return numeral(number).format('0.[0]a').toUpperCase();
        }
        return number;
    };
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

    // Hàm sử lí gọi thông báo khi bấm vào trái tim
    const handleNotify = (info) => {
        setMessage(info);
        //Thiết lập chuyển động
        Animated.timing(topRef.current, {
            toValue: 36,
            duration: 500,
            useNativeDriver: false,
        }).start();

        setVisible(true);
        // Đóng modal sau 1 khoảng thời gian
        setTimeout(() => {
            setVisible(false);
            topRef.current.setValue(-58);
        }, 1500);
    };
    // Thêm và xóa sản phẩm yêu thích
    const handleAddLike = async (idProduct) => {
        setLikes([...likes, idProduct]);
        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            await axios.post(`${Config.API_URL}/api/addProductFavorite`, { idProduct, idUser });
            handleNotify('Đã thêm vào danh sách yêu thích!');
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteLike = async (idProduct) => {
        const newlikes = likes.filter((item) => item !== idProduct);
        setLikes(newlikes);

        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            await axios.delete(`${Config.API_URL}/api/deleteProductFavorite/${idUser}/${idProduct}`);
            handleNotify('Đã xóa khỏi danh sách yêu thích!');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            const res1 = await axios.get(`${Config.API_URL}/api/getProductOfCity/${id}/4/${idUser}`);
            setProducts(res1.data);
            setLikes(
                res1.data.map((ele, index) => {
                    if (ele.isLike === true) {
                        return index;
                    }
                })
            );
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
                                width: '48%',
                                marginBottom: moderateScale(10),
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
                                    }}
                                >
                                    {product.name}
                                </Text>
                                <Text numberOfLines={1} style={{ marginTop: 6, flexDirection: 'row' }}>
                                    <Text
                                        style={{
                                            color: '#fe9428',
                                            fontWeight: '600',
                                        }}
                                    >
                                        <IconAntDesign name="star" color="#fe9428" />
                                        {product.star}
                                    </Text>
                                    <Text style={{ color: '#747878' }}>
                                        ({product.evaluate})
                                        <IconEntypo name="dot-single" />
                                        {formatNumber(product.booked)} Đã được đặt
                                    </Text>
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
                            {likes.includes(product.id) || (
                                <TouchableOpacity
                                    onPress={() => handleAddLike(product.id)}
                                    style={{
                                        position: 'absolute',
                                        right: scale(12),
                                        top: verticalScale(12),
                                        padding: 6,
                                    }}
                                >
                                    <IconAntDesign name="hearto" size={moderateScale(25)} color="#fff" />
                                </TouchableOpacity>
                            )}
                            {likes.includes(product.id) && (
                                <TouchableOpacity
                                    onPress={() => handleDeleteLike(product.id)}
                                    style={{
                                        position: 'absolute',
                                        right: scale(12),
                                        top: verticalScale(12),
                                        padding: 6,
                                    }}
                                >
                                    <IconAntDesign name="heart" size={moderateScale(25)} color="red" />
                                </TouchableOpacity>
                            )}
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
            {/* Modal Component */}
            <Modal
                animationType="slide" // Kiểu hoạt ảnh: "slide", "fade", hoặc "none"
                transparent={true} // Cho phép modal trong suốt
                visible={visible} // Trạng thái hiển thị modal
                onRequestClose={() => setVisible(false)} // Gọi khi người dùng nhấn nút Back
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        alignItems: 'center',
                    }}
                >
                    <Animated.View
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            padding: 6,
                            borderRadius: 6,
                            width: scale(160),
                            position: 'absolute',
                            top: topRef.current,
                        }}
                    >
                        <Text style={{ textAlign: 'center' }}>{message}</Text>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

export default Part2;
