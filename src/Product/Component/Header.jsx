import { Animated, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { moderateScale, scale } from 'react-native-size-matters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../.env/Config';

const Header = ({ opacity, backgroundBtn, colorBtn, navigation, idProduct }, ref) => {
    const [unviewedCartCount, setUnviewedCartCount] = useState(0);
    const [liked, setLiked] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const topRef = useRef(new Animated.Value(-58));
    // Nút cart trên cùng góc phải
    const btnCartRef = useRef();
    // Mặc định các hàm gọi từ component cha
    useImperativeHandle(ref, () => ({
        async getCoordinates() {
            const coordinates = await new Promise((resolve) => {
                btnCartRef.current.measure((fx, fy, width, height, px, py) => {
                    resolve({ x: px, y: py });
                });
            });

            return { x: coordinates.x, y: coordinates.y };
        },
        setUnviewedCartCount(value) {
            setUnviewedCartCount(value);
        },
        setLiked(value) {
            setLiked(value);
        },
    }));
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
        setLiked(true);

        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            await axios.post(`${Config.API_URL}/api/addProductFavorite`, { idProduct, idUser });
            handleNotify('Đã thêm vào danh sách yêu thích!');
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteLike = async (idProduct) => {
        setLiked(false);

        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            await axios.delete(`${Config.API_URL}/api/deleteProductFavorite/${idUser}/${idProduct}`);
            handleNotify('Đã xóa khỏi danh sách yêu thích!');
        } catch (error) {
            console.log(error);
        }
    };
    // set giá trị số sản phẩm giỏ hàng chưa xem khi focos
    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', async () => {
            if (await AsyncStorage.getItem('unviewedCartCount')) {
                setUnviewedCartCount(JSON.parse(await AsyncStorage.getItem('unviewedCartCount')));
            } else {
                setUnviewedCartCount(0);
            }
        });

        return unsubcribe;
    }, [navigation]);
    return (
        <View
            style={{
                padding: 12,
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: 0,
                right: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            }}
        >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View
                    style={{
                        backgroundColor: backgroundBtn,
                        padding: 10,
                        borderRadius: 30,
                    }}
                >
                    <IconEntypo name="chevron-left" size={moderateScale(25)} color={colorBtn} />
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => handleAddLike(idProduct)}>
                    <View
                        style={{
                            backgroundColor: backgroundBtn,
                            padding: 10,
                            borderRadius: 30,
                            marginRight: 12,
                        }}
                    >
                        {liked && <IconAntDesign onPress={() => handleDeleteLike(idProduct)} name="heart" size={moderateScale(25)} color="red" />}
                        {liked || <IconAntDesign onPress={() => handleAddLike(idProduct)} name="hearto" size={moderateScale(25)} color="#000" />}
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
                    <View
                        ref={btnCartRef}
                        style={{
                            backgroundColor: backgroundBtn,
                            padding: 10,
                            borderRadius: 30,
                        }}
                    >
                        <IconFeather name="shopping-cart" size={moderateScale(25)} color={colorBtn} />
                        {/* Số lượng sản phẩm chưa xem trong giỏ hàng */}

                        {unviewedCartCount === 0 || (
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'red',
                                    width: 18,
                                    height: 18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30,
                                    top: -2,
                                    left: 24,
                                }}
                            >
                                <Text style={{ fontSize: 10, fontWeight: '700' }}>{unviewedCartCount}</Text>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>

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
                    <Animated.View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', width: scale(140), position: 'absolute', top: topRef.current }}>
                        <Text style={{ textAlign: 'center' }}>{message}</Text>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

export default forwardRef(Header);
