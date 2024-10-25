import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const Notify = () => {
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
        //         height={120}
        //         width={120}
        //         style={{ marginBottom: 32 }}
        //         source={{
        //             uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
        //         }}
        //     />
        //     <Text
        //         style={{
        //             textAlign: 'center',
        //             fontSize: 16,
        //         }}>
        //         Không có thông báo
        //     </Text>
        // </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 16 }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 16,
                        padding: 12,
                        borderRadius: 12,
                    }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000',
                        }}
                        numberOfLines={1}>
                        Mua sản phẩm
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 16,
                        }}>
                        <View>
                            <Text>Đã thanh toán: đ 0</Text>
                            <Text style={{ color: '#1cb57a', marginTop: 2 }}>
                                Đơn hàng đã được xác nhận
                            </Text>
                        </View>
                        <View>
                            <Image
                                height={60}
                                width={60}
                                borderRadius={8}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>

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
        //     <Text style={{ textAlign: 'center' }}>
        //         Hãy đăng nhập để xem danh sách thông báo của mình
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
    );
};

export default Notify;
