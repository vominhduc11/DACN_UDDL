import { View, Text, ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Config from '../../.env/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function User_page({ route, navigation }) {
    const [user, setUser] = useState({});
    const { setActive } = route.params;
    // Sử lý khi đăng xuất
    const handleExit = async () => {
        // Xóa idUser rồi navigate sang trang login
        try {
            await AsyncStorage.removeItem('idUser');
        } catch (error) {
            console.log(error);
        }

        navigation.reset({
            index: 0, // Vị trí của màn hình ban đầu
            routes: [
                { name: 'Login' }, // Đặt tên màn hình mới
            ],
        });
    };
    // Lấy người dùng
    useEffect(() => {
        async function fetchData() {
            try {
                const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
                const res = await axios.get(`${Config.API_URL}/api/getUser/${idUser}`);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <View>
            <ImageBackground
                style={{ paddingHorizontal: 12, paddingVertical: 24 }}
                source={{
                    uri: 'https://png.pngtree.com/thumb_back/fh260/back_our/20190628/ourmid/pngtree-hand-painted-flowers-background-material-image_268999.jpg',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 30,
                            }}
                            source={{
                                uri: `http://192.168.0.113:8080/api/image/${user.image}`,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: '#000',
                                }}
                            >
                                {user.name}
                            </Text>
                            <Text style={{ fontSize: 12, color: '#000' }}>Cập nhật thông tin cá nhân</Text>
                        </View>
                    </View>
                    <IconMaterialAntDesign style={{ marginTop: 12 }} name="message1" size={25} />
                </View>
            </ImageBackground>
            <View style={{ paddingHorizontal: 12 }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        marginTop: 12,
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            navigation.navigate('Order_page');
                            setActive.setOrder(4);
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                            }}
                        >
                            <IconEntypo name="shopping-bag" size={24} color="#000" />
                            <Text style={{ marginLeft: 8, color: '#000' }}>Đơn hàng</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                        onPress={handleExit}
                        activeOpacity={1}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                        }}
                    >
                        <IconIonicons name="exit" color="#000" size={24} />
                        <Text style={{ marginLeft: 8, color: '#000' }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default User_page;
