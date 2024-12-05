import { ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Modal, Button, Image } from 'react-native';
import React, { useState } from 'react';

import FastImage from 'react-native-fast-image';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Chase } from 'react-native-animated-spinkit';
import { launchImageLibrary } from 'react-native-image-picker';

const Sign = ({ navigation }) => {
    const [valueName, setValueName] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [valueAuthenPassword, setValueAuthenPassword] = useState('');
    const [authen, setAuthen] = useState([undefined, undefined, undefined, undefined]);
    const [load, setLoad] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [textConfirm, setTextConfirm] = useState('');
    const [imageUri, setImageUri] = useState(null);

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

    // Sử lý xác thực đăng kí
    const authenSign = () => {
        const newAuthen = authen.map((ele, index) => {
            if (index === 0) {
                const nameRegex = /^[A-Za-zÀ-ỹà-ỹ\s]{3,40}$/;
                if (!nameRegex.test(valueName)) {
                    return false;
                } else {
                    return true;
                }
            }
            if (index === 1) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (valueEmail.trim().length === 0 || !emailRegex.test(valueEmail)) {
                    return false;
                } else {
                    return true;
                }
            }
            if (index === 2) {
                if (valuePassword.trim().length < 6) {
                    return false;
                } else {
                    return true;
                }
            }
            if (index === 3) {
                if (valueAuthenPassword.trim() === valuePassword.trim() && valuePassword.trim().length >= 6) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        setAuthen(newAuthen);
        return newAuthen;
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    // Sử lý khi nhấn nút đăng nhập
    const handlePressSign = async () => {
        console.log(imageUri.split('/').pop());
        const result = authenSign().some((ele) => ele === false);
        if (!result) {
            setLoad(true);
            try {
                const formData = new FormData();
                // Đính kèm dữ liệu JSON
                formData.append('name', valueName);
                formData.append('email', valueEmail);
                formData.append('password', valuePassword);
                // Đính kèm file (nếu có)
                if (imageUri) {
                    const file = {
                        uri: imageUri,
                        name: imageUri.split('/').pop(), // Tên file gửi lên server
                        type: 'image/jpeg', // Định dạng file
                    };
                    formData.append('fileImage', file);
                }
                const res = await axios.post('http://192.168.0.113:8080/api/addUser', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setLoad(false);
                if (res.data === 'Success') {
                    setAlertMessage('Đăng ký tài khoản thành công, vui lòng quay trở lại trang đăng nhập!');
                    setTextConfirm('Đăng nhập');
                } else {
                    setAlertMessage(res.data);
                    setTextConfirm('Thử lại');
                }
            } catch (error) {
                setAlertMessage('Máy chủ không phản hồi!');
            } finally {
                setShowAlert(true);
            }
        }
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ImageBackground
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
                    {/* Name */}
                    <TextInput
                        onFocus={() => handleFocus(0)}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            paddingHorizontal: 12,
                            borderWidth: 1,
                            borderColor: authen[0] === true || authen[0] === undefined ? '#ccc' : 'red',
                            color: '#000',
                        }}
                        value={valueName}
                        onChangeText={setValueName}
                        placeholder="Nhập tên ...."
                        placeholderTextColor={'#c0c0c0'}
                        autoCapitalize="none" // Tắt viết hoa tự động cho email
                    />
                    {/* Email */}
                    <TextInput
                        onFocus={() => handleFocus(1)}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            paddingHorizontal: 12,
                            marginTop: 12,
                            borderWidth: 1,
                            borderColor: authen[1] === true || authen[1] === undefined ? '#ccc' : 'red',
                            color: '#000',
                        }}
                        value={valueEmail}
                        onChangeText={setValueEmail}
                        placeholder="Nhập Email ...."
                        placeholderTextColor={'#c0c0c0'}
                        keyboardType="email-address" // Đặt kiểu bàn phím email
                        autoCapitalize="none" // Tắt viết hoa tự động cho email
                    />
                    {/* Password */}
                    <TextInput
                        onFocus={() => handleFocus(2)}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            marginTop: 12,
                            paddingHorizontal: 12,
                            borderWidth: 1,
                            borderColor: authen[2] === true || authen[2] === undefined ? '#ccc' : 'red',
                            color: '#000',
                        }}
                        value={valuePassword}
                        onChangeText={setValuePassword}
                        placeholder="Nhập Password ..."
                        placeholderTextColor="#c0c0c0"
                        secureTextEntry={true}
                    />
                    {/*Authen Password */}
                    <TextInput
                        onFocus={() => handleFocus(3)}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            marginTop: 12,
                            paddingHorizontal: 12,
                            borderWidth: 1,
                            borderColor: authen[3] === true || authen[3] === undefined ? '#ccc' : 'red',
                            color: '#000',
                        }}
                        value={valueAuthenPassword}
                        onChangeText={setValueAuthenPassword}
                        placeholder="Nhập Xác Thực Password ..."
                        placeholderTextColor="#c0c0c0"
                        secureTextEntry={true}
                    />
                    {/* Chọn ảnh đại diện */}
                    <View style={{ marginTop: 12, alignItems: 'center' }}>
                        <Button
                            title="Chọn ảnh đại diện"
                            onPress={pickImage}
                            color="#000" // Đặt màu nút giống với các trường nhập liệu
                            style={{
                                backgroundColor: '#fff', // Thêm nền trắng giống các trường TextInput
                                paddingHorizontal: 20, // Thêm khoảng cách trái phải
                                borderRadius: 12, // Bo góc để đồng nhất với TextInput
                                borderWidth: 1, // Đặt border cho nút
                                borderColor: '#ccc', // Đặt màu border giống với các trường nhập liệu
                            }}
                        />
                        {imageUri && (
                            <Image
                                source={{ uri: imageUri }}
                                style={{
                                    marginTop: 20,
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50, // Bo tròn ảnh giống với thiết kế button
                                    borderWidth: 2, // Thêm đường viền cho ảnh
                                    borderColor: '#ccc', // Màu viền ảnh
                                }}
                            />
                        )}
                    </View>
                    {/* Button Login */}
                    <TouchableOpacity
                        onPress={handlePressSign}
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
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: '#00c0a7',
                            textAlign: 'center',
                            marginTop: 12,
                        }}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Đã có tài khoản?
                    </Text>
                </View>
            </ImageBackground>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Thông báo"
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText={textConfirm}
                confirmButtonColor={textConfirm === 'Đăng nhập' ? '#33CCFF' : '#DD6B55'}
                onConfirmPressed={() => {
                    textConfirm === 'Đăng nhập'
                        ? navigation.reset({
                              index: 0, // Đặt index là 0 để chuyển đến màn hình đầu tiên
                              routes: [{ name: 'Login' }], // Đặt tên màn hình mà bạn muốn chuyển đến
                          })
                        : setShowAlert(false);
                }}
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

export default Sign;
