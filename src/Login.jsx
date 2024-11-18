import { Image, ImageBackground, KeyboardAvoidingView, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Chase } from 'react-native-animated-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [authen, setAuthen] = useState([undefined, undefined]);
    const [load, setLoad] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Sử lý xác thực đăng kí
    const authenLogin = () => {
        const newAuthen = authen.map((ele, index) => {
            if (index === 0) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (valueEmail.trim().length === 0 || !emailRegex.test(valueEmail)) {
                    return false;
                } else {
                    return true;
                }
            }
            if (index === 1) {
                if (valuePassword.trim().length < 6) {
                    return false;
                } else {
                    return true;
                }
            }
        });
        setAuthen(newAuthen);
        return newAuthen;
    };

    // Sử lý khi nhấn nút đăng nhập
    const handlePressLogin = async () => {
        const result = authenLogin().some((ele) => ele === false);
        if (!result) {
            setLoad(true);
            try {
                const res = await axios.post('http://192.168.0.113:8080/api/authenAccount', {
                    email: valueEmail,
                    password: valuePassword,
                });
                setLoad(false);
                if (res.data) {
                    // Nếu thành công thì chuyển sang trang Home và lưu id người dùng vào AsyncStorage sau đó
                    navigation.reset({
                        index: 0, // Đặt index là 0 để chuyển đến màn hình đầu tiên
                        routes: [{ name: 'Home' }], // Đặt tên màn hình mà bạn muốn chuyển đến
                    });

                    await AsyncStorage.setItem('idUser', JSON.stringify(res.data));
                    await AsyncStorage.setItem('cart', JSON.stringify([]));
                } else {
                    setShowAlert(true);
                }
            } catch (error) {
                setShowAlert(true);
            }
        }
    };

    // Sự kiện khi input được focus
    const handleFocus = (position) => {
        const newAuthen = authen.map((ele, index) => {
            if (index === position) {
                return undefined;
            }
            return ele;
        });

        setAuthen(newAuthen);
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ImageBackground
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                source={{
                    uri: 'https://cdn.photoroom.com/v2/image-cache?path=gs://background-7ef44.appspot.com/backgrounds_v3/white/Photoroom_white_background_extremely_fine_texture_only_white_co_d6a2d66a-dfe4-41fc-80fd-ec55764101bb.jpg',
                }}
            >
                <View
                    style={{
                        width: 250,
                    }}
                >
                    {/* logo */}
                    <View
                        style={{
                            alignItems: 'center',
                            marginBottom: 24,
                        }}
                    >
                        <FastImage
                            style={{ width: 85, height: 85 }}
                            source={{
                                uri: 'https://png.pngtree.com/png-vector/20190121/ourlarge/pngtree-earth-travel-abroad-travel-tourism-tourism-promotion-png-image_505653.jpg',
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    {/* Email */}
                    <TextInput
                        onFocus={() => handleFocus(0)}
                        onChangeText={setValueEmail}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            paddingHorizontal: 12,
                            borderWidth: 1,
                            borderColor: authen[0] === true || authen[0] === undefined ? '#ccc' : 'red',
                            color: '#000',
                        }}
                        placeholder="Nhập Email ..."
                        placeholderTextColor="#c0c0c0"
                        keyboardType="email-address" // Đặt kiểu bàn phím email
                        autoCapitalize="none" // Tắt viết hoa tự động cho email
                    />
                    {/* Password */}
                    <TextInput
                        onFocus={() => handleFocus(1)}
                        onChangeText={setValuePassword}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            marginTop: 12,
                            paddingHorizontal: 12,
                            borderWidth: 1,
                            borderColor: authen[1] === true || authen[1] === undefined ? '#ccc' : 'red',
                            color: '#000',
                        }}
                        placeholder="Nhập Password ..."
                        placeholderTextColor="#c0c0c0"
                        secureTextEntry={true}
                    />
                    {/* Button Login */}
                    <TouchableOpacity
                        onPress={handlePressLogin}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: '#00c0a7',
                            padding: 12,
                            borderRadius: 10,
                            marginTop: 30,
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                textAlign: 'center',
                            }}
                        >
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 14,
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                marginRight: 6,
                                textDecorationLine: 'underline',
                            }}
                        >
                            Quên mật khẩu ?
                        </Text>
                        <Text style={{ color: '#00c0a7' }} onPress={() => navigation.navigate('Sign')}>
                            Đăng ký
                        </Text>
                    </View>
                </View>
            </ImageBackground>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Thông báo"
                message="Email hoặc mật khẩu không đúng!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Thử lại"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => setShowAlert(false)}
            />
            <Modal
                animationType="fade" // Loại animation: 'slide', 'fade', 'none'
                transparent={true} // Làm nền trong suốt
                visible={load} // Điều khiển hiển thị Modal
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối mờ
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Chase color="#d87005" />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default Login;
