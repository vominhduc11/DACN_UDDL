import { View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import React, { memo } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

function User_page({ route, navigation }) {
    const { navigate_set } = route.params;

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
                                uri: 'https://png.pngtree.com/png-clipart/20191121/original/pngtree-user-icon-png-image_5097430.jpg',
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
                                Võ Minh Đức
                            </Text>
                            <Text style={{ fontSize: 12 }}>Cập nhật thông tin cá nhân</Text>
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
                            navigate_set(4);
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
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                        }}
                    >
                        <IconIonicons name="exit" color="#000" size={24} />
                        <Text style={{ marginLeft: 8, color: '#000' }}>Đăng xuất</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default User_page;
