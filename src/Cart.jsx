import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';

import IconFeather from 'react-native-vector-icons/Feather';

const Cart = () => {
    return (
        // <View
        //     style={{
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         flex: 1,
        //         paddingHorizontal: 24,
        //         backgroundColor: '#fff',
        //     }}>
        //     <Image
        //         height={90}
        //         width={90}
        //         style={{ marginBottom: 32 }}
        //         source={{
        //             uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
        //         }}
        //     />
        //     <Text
        //         style={{
        //             textAlign: 'center',
        //             fontWeight: '600',
        //             color: '#000',
        //             fontSize: 16,
        //         }}>
        //         Giỏ hàng
        //     </Text>
        //     <Text style={{ textAlign: 'center', marginTop: 12 }}>
        //         Đăng nhập để thêm dịch vụ vào giỏ hàng
        //     </Text>
        //     <TouchableWithoutFeedback>
        //         <Text
        //             style={{
        //                 color: '#fff',
        //                 backgroundColor: '#ff5c19',
        //                 fontWeight: '600',
        //                 paddingVertical: 8,
        //                 paddingHorizontal: 14,
        //                 borderRadius: 8,
        //                 marginTop: 16,
        //             }}>
        //             Đăng nhập
        //         </Text>
        //     </TouchableWithoutFeedback>
        // </View>

        // <View
        //     style={{
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         flex: 1,
        //         paddingHorizontal: 24,
        //         backgroundColor: '#fff',
        //     }}>
        //     <Image
        //         height={90}
        //         width={90}
        //         style={{ marginBottom: 32 }}
        //         source={{
        //             uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
        //         }}
        //     />
        //     <Text
        //         style={{
        //             textAlign: 'center',
        //             fontWeight: '600',
        //             color: '#000',
        //             fontSize: 16,
        //         }}>
        //         Giỏ hàng đang trống
        //     </Text>
        //     <Text style={{ textAlign: 'center', marginTop: 12 }}>
        //         Và giờ đã trở thành ổ của mèo. Khám phá Klook để thêm vào giỏ
        //         hàng của bạn.
        //     </Text>
        //     <TouchableWithoutFeedback>
        //         <Text
        //             style={{
        //                 color: '#fff',
        //                 backgroundColor: '#ff5c19',
        //                 fontWeight: '600',
        //                 paddingVertical: 8,
        //                 paddingHorizontal: 14,
        //                 borderRadius: 8,
        //                 marginTop: 16,
        //             }}>
        //             Về trang chủ
        //         </Text>
        //     </TouchableWithoutFeedback>
        // </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 12 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        marginTop: 12,
                    }}>
                    <Image
                        height={90}
                        width={90}
                        borderRadius={12}
                        source={{
                            uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                        }}></Image>
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#000',
                            }}>
                            Du thuyền sài gòn với bữa tối trên tàu Saigon
                            Princess
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    marginRight: 20,
                                }}>
                                đ 690,000
                            </Text>
                            <IconFeather name="trash-2" color="red" size={24} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Cart;
