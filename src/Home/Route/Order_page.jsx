import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

function Order_page({ navigation }) {
    return (
        <>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingTop: 30,
                    paddingBottom: 12,
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: '700' }}>Đơn hàng</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 16 }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            marginTop: 16,
                            padding: 12,
                            borderRadius: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: '700',
                                color: '#000',
                            }}
                            numberOfLines={1}
                        >
                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 16,
                            }}
                        >
                            <View>
                                <Text>Đã thanh toán: đ 0</Text>
                                <Text style={{ color: '#1cb57a', marginTop: 2 }}>Đơn hàng đã được xác nhận</Text>
                            </View>
                            <View>
                                <FastImage
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 8,
                                    }}
                                    source={{
                                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            marginTop: 16,
                            padding: 12,
                            borderRadius: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: '700',
                                color: '#000',
                            }}
                            numberOfLines={1}
                        >
                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 16,
                            }}
                        >
                            <View>
                                <Text>Đã thanh toán: đ 0</Text>
                                <Text style={{ color: '#1cb57a', marginTop: 2 }}>Đơn hàng đã được xác nhận</Text>
                            </View>
                            <View>
                                <FastImage
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 8,
                                    }}
                                    source={{
                                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            marginTop: 16,
                            padding: 12,
                            borderRadius: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: '700',
                                color: '#000',
                            }}
                            numberOfLines={1}
                        >
                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 16,
                            }}
                        >
                            <View>
                                <Text>Đã thanh toán: đ 0</Text>
                                <Text style={{ color: '#1cb57a', marginTop: 2 }}>Đơn hàng đã được xác nhận</Text>
                            </View>
                            <View>
                                <FastImage
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 8,
                                    }}
                                    source={{
                                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            marginTop: 16,
                            padding: 12,
                            borderRadius: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: '700',
                                color: '#000',
                            }}
                            numberOfLines={1}
                        >
                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 16,
                            }}
                        >
                            <View>
                                <Text>Đã thanh toán: đ 0</Text>
                                <Text style={{ color: '#1cb57a', marginTop: 2 }}>Đơn hàng đã được xác nhận</Text>
                            </View>
                            <View>
                                <FastImage
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 8,
                                    }}
                                    source={{
                                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
        // <View style={{ backgroundColor: '#fff', flex: 1 }}>
        //     <Text
        //         style={{
        //             fontSize: 24,
        //             fontWeight: '600',
        //             color: '#000',
        //             paddingHorizontal: 12,
        //             paddingTop: 32,
        //         }}>
        //         Đơn hàng
        //     </Text>
        //     <View
        //         style={{
        //             flexDirection: 'column',
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //             flex: 1,
        //             paddingHorizontal: 24,
        //         }}>
        // <FastImage
        //                             style={{
        //                                 height: 90,
        //                                 width: 90,
        //                                 marginBottom: 32
        //                             }}
        //                             source={{
        //                                 uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
        //                                 priority: FastImage.priority.high,
        //                             }}
        //                             resizeMode={FastImage.resizeMode.cover}
        //                         />
        //         <Text style={{ textAlign: 'center' }}>
        //             Hãy đăng nhập để xem danh sách đơn hàng của mình
        //         </Text>
        //         <TouchableWithoutFeedback>
        //             <Text
        //                 style={{
        //                     color: '#fff',
        //                     backgroundColor: '#ff5c19',
        //                     fontWeight: '600',
        //                     paddingVertical: 8,
        //                     paddingHorizontal: 14,
        //                     borderRadius: 8,
        //                     marginTop: 16,
        //                 }}>
        //                 Đăng nhập
        //             </Text>
        //         </TouchableWithoutFeedback>
        //     </View>
        // </View>
        // <View style={{ backgroundColor: '#fff', flex: 1 }}>
        //     <Text
        //         style={{
        //             fontSize: 24,
        //             fontWeight: '600',
        //             color: '#000',
        //             paddingHorizontal: 12,
        //             paddingTop: 32,
        //         }}>
        //         Đơn hàng
        //     </Text>
        //     <View
        //         style={{
        //             flexDirection: 'column',
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //             flex: 1,
        //             paddingHorizontal: 24,
        //         }}>
        // <FastImage
        //                             style={{
        //                                 height: 90,
        //                                 width: 90,
        //                                 marginBottom: 32
        //                             }}
        //                             source={{
        //                                 uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
        //                                 priority: FastImage.priority.high,
        //                             }}
        //                             resizeMode={FastImage.resizeMode.cover}
        //                         />
        //         <Text
        //             style={{
        //                 textAlign: 'center',
        //                 fontWeight: '600',
        //                 color: '#000',
        //                 fontSize: 16,
        //             }}>
        //             Chưa có đơn hàng nào ở đây
        //         </Text>
        //         <Text style={{ textAlign: 'center', marginTop: 12 }}>
        //             Hiện tại chưa có đơn hàng nào được đặt, vui lòng mua hàng và
        //             hoạt động này sẽ được lưu tại đây.
        //         </Text>
        //         <TouchableWithoutFeedback>
        //             <Text
        //                 style={{
        //                     color: '#fff',
        //                     backgroundColor: '#ff5c19',
        //                     fontWeight: '600',
        //                     paddingVertical: 8,
        //                     paddingHorizontal: 14,
        //                     borderRadius: 8,
        //                     marginTop: 16,
        //                 }}>
        //                 Tiếp tục
        //             </Text>
        //         </TouchableWithoutFeedback>
        //     </View>
        // </View>
    );
}

export default Order_page;
