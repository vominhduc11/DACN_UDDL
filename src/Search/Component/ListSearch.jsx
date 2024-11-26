import { View, Text, FlatList, TouchableWithoutFeedback, Animated, Modal, TouchableOpacity } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import FastImage from 'react-native-fast-image';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import numeral from 'numeral';

import Config from '../../.env/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ListSearch = ({ category, handlePressProduct, nameCity }, ref) => {
    const [products, setProducts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const topRef = useRef(new Animated.Value(-58));

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

    // Sử lý khi bấm vào tên thành phố
    const setListProduct = async (cityId) => {
        const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
        const res = await axios.get(`${Config.API_URL}/api/getAllProductOfCity/${cityId}/${idUser}`);
        setProducts(res.data);
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
            </View>
        </TouchableWithoutFeedback>
    );

    // Gọi api lần đầu
    useEffect(() => {
        async function fetchData() {
            try {
                const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
                if (nameCity) {
                    const res = await axios.get(`${Config.API_URL}/api/getAllProductOfCategoryAndCity/${category}/${nameCity}/${idUser}`);
                    setProducts(res.data);
                    setLikes(
                        res.data.map((ele) => {
                            if (ele.isLike) {
                                return ele.id;
                            }
                        })
                    );
                } else {
                    // category được truyền qua từ trang trước
                    const res = await axios.get(`${Config.API_URL}/api/getAllProductOfCategory/${category}/${idUser}`);
                    setProducts(res.data);
                    setLikes(
                        res.data.map((ele) => {
                            if (ele.isLike) {
                                return ele.id;
                            }
                        })
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <>
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
        </>
    );
};

export default forwardRef(ListSearch);
