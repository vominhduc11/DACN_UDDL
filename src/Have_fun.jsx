import { View, Text, FlatList, TouchableOpacity, Animated, Modal } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import numeral from 'numeral';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import Config from './.env/Config';

const Have_fun = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const topRef = useRef(new Animated.Value(-58));

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
    // Phần tử render trong FlatList
    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
            style={{ position: 'relative' }}
        >
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
            {likes.includes(item.id) || (
                <TouchableOpacity
                    onPress={() => handleAddLike(item.id)}
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
            {likes.includes(item.id) && (
                <TouchableOpacity
                    onPress={() => handleDeleteLike(item.id)}
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
        </TouchableOpacity>
    );

    // Gọi api lần đầu cho product
    useEffect(() => {
        async function fetchData() {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            try {
                const res = await axios.get(`${Config.API_URL}/api/getAllProductOfCity/${idCity}/${idUser}`);
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
                style={{ paddingHorizontal: 12, flex: 1, backgroundColor: '#fff' }}
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

export default Have_fun;
