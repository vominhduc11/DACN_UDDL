import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';

function Like_page({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        // <>
        //     <View style={{ flex: 1 }}>
        //         <View
        //             style={{
        //                 paddingHorizontal: 12,
        //                 paddingTop: 30,
        //                 paddingBottom: 15,
        //             }}>
        //             <Text style={{ fontSize: 24, fontWeight: '700' }}>
        //                 Yêu thích
        //             </Text>
        //             <ScrollView
        //                 style={{ marginTop: 12 }}
        //                 horizontal={true}
        //                 showsHorizontalScrollIndicator={false}>
        //                 <View style={{ flexDirection: 'row' }}>
        //                     <Text
        //                         style={{
        //                             paddingHorizontal: 10,
        //                             paddingVertical: 6,
        //                             borderWidth: 1,
        //                             borderRadius: 28,
        //                             marginRight: 8,
        //                             fontSize: 12,
        //                         }}>
        //                         New ZEALAND
        //                     </Text>
        //                     <Text
        //                         style={{
        //                             paddingHorizontal: 10,
        //                             paddingVertical: 6,
        //                             borderWidth: 1,
        //                             borderRadius: 28,
        //                             marginRight: 8,
        //                             fontSize: 12,
        //                         }}>
        //                         New ZEALAND
        //                     </Text>
        //                     <Text
        //                         style={{
        //                             paddingHorizontal: 10,
        //                             paddingVertical: 6,
        //                             borderWidth: 1,
        //                             borderRadius: 28,
        //                             marginRight: 8,
        //                             fontSize: 12,
        //                         }}>
        //                         New ZEALAND
        //                     </Text>
        //                     <Text
        //                         style={{
        //                             paddingHorizontal: 10,
        //                             paddingVertical: 6,
        //                             borderWidth: 1,
        //                             borderRadius: 28,
        //                             marginRight: 8,
        //                             fontSize: 12,
        //                         }}>
        //                         New ZEALAND
        //                     </Text>
        //                     <Text
        //                         style={{
        //                             paddingHorizontal: 10,
        //                             paddingVertical: 6,
        //                             borderWidth: 1,
        //                             borderRadius: 28,
        //                             marginRight: 8,
        //                             fontSize: 12,
        //                         }}>
        //                         New ZEALAND
        //                     </Text>
        //                     <Text
        //                         style={{
        //                             paddingHorizontal: 10,
        //                             paddingVertical: 6,
        //                             borderWidth: 1,
        //                             borderRadius: 28,
        //                             marginRight: 8,
        //                             fontSize: 12,
        //                         }}>
        //                         New ZEALAND
        //                     </Text>
        //                 </View>
        //             </ScrollView>
        //         </View>
        //         <ScrollView showsVerticalScrollIndicator={false}>
        //             <View
        //                 style={{
        //                     marginTop: 10,
        //                     paddingHorizontal: 12,
        //                     flexDirection: 'row',
        //                     justifyContent: 'space-between',
        //                     flexWrap: 'wrap',
        //                 }}>
        //                 <TouchableWithoutFeedback
        //                     onPress={() => navigation.navigate('Product')}>
        //                     <View
        //                         style={{
        //                             borderWidth: 0.5,
        //                             borderColor: '#DDDDDD',
        //                             borderRadius: 12,
        //                             width: 140,
        //                             marginBottom: 8,
        //                             backgroundColor: '#fff',
        //                             position: 'relative',
        //                         }}>
        // <FastImage
        //                         style={{
        //                             height: 100,
        //                             borderTopLeftRadius: 12,
        //                             borderTopRightRadius: 12,
        //                         }}
        //                         source={{
        //                             uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
        //                             priority: FastImage.priority.high,
        //                         }}
        //                         resizeMode={FastImage.resizeMode.cover}
        //                     />
        //                         <View
        //                             style={{
        //                                 padding: 5,
        //                             }}>
        //                             <Text
        //                                 numberOfLines={3}
        //                                 style={{
        //                                     fontWeight: 700,
        //                                     color: '#000',
        //                                     width: 140,
        //                                 }}>
        //                                 Du thuyền ăn tối sang trọng Opulence
        //                                 trên sông Chao Phraya
        //                             </Text>
        //                             <Text style={{ marginTop: 6 }}>
        //                                 <IconAntDesign
        //                                     name="star"
        //                                     size={16}
        //                                     color="#FFCC33"
        //                                 />
        //                                 <Text
        //                                     style={{
        //                                         color: '#FFCC33',
        //                                     }}>
        //                                     4.8
        //                                 </Text>
        //                                 (362)
        //                             </Text>
        //                             <Text
        //                                 style={{
        //                                     fontWeight: '700',
        //                                     marginTop: 6,
        //                                     color: '#000',
        //                                 }}>
        //                                 đ 61,777
        //                             </Text>
        //                         </View>
        //                         <IconMaterialIcons
        //                             name="favorite"
        //                             size={24}
        //                             color="red"
        //                             onPress={() => setModalVisible(true)}
        //                             style={{
        //                                 position: 'absolute',
        //                                 top: 10,
        //                                 right: 10,
        //                             }}
        //                         />
        //                     </View>
        //                 </TouchableWithoutFeedback>
        //             </View>
        //         </ScrollView>
        //     </View>
        //     {/* Modal */}
        //     <Modal
        //         animationType="fade" // Loại animation: 'slide', 'fade', 'none'
        //         transparent={true} // Modal hiển thị trên nền trong suốt
        //         visible={modalVisible} // Kiểm soát trạng thái hiển thị của Modal
        //         onRequestClose={() => {
        //             // Được gọi khi nhấn nút back trên Android
        //             setModalVisible(false);
        //         }}>
        //         <View
        //             style={{
        //                 flex: 1,
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //             }}>
        //             <View
        //                 style={{
        //                     margin: 20,
        //                     backgroundColor: 'white',
        //                     borderRadius: 10,
        //                     padding: 30,
        //                     alignItems: 'center',
        //                     elevation: 5, // Đổ bóng
        //                 }}>
        //                 <Text
        //                     style={{
        //                         marginBottom: 15,
        //                         textAlign: 'center',
        //                         fontWeight: '600',
        //                         fontSize: 20,
        //                     }}>
        //                     Xóa khỏi danh sách yếu thích?
        //                 </Text>

        //                 <Text>
        //                     Hoạt động sẽ được xóa khỏi danh sách mà bạn đã lưu
        //                     vào
        //                 </Text>

        //                 {/* Nút đóng Modal */}
        //                 <View
        //                     style={{
        //                         flexDirection: 'row',
        //                         marginTop: 12,
        //                         justifyContent: 'space-between',
        //                         // backgroundColor: '#000',
        //                         width: '100%',
        //                     }}>
        //                     <TouchableWithoutFeedback
        //                         onPress={() => setModalVisible(false)}>
        //                         <Text
        //                             style={{
        //                                 borderWidth: 1,
        //                                 color: '#000',
        //                                 paddingHorizontal: 10,
        //                                 paddingVertical: 8,
        //                                 borderRadius: 8,
        //                                 width: 100,
        //                                 textAlign: 'center',
        //                             }}>
        //                             Quay lại
        //                         </Text>
        //                     </TouchableWithoutFeedback>
        //                     <TouchableWithoutFeedback onPress={() => {}}>
        //                         <Text
        //                             style={{
        //                                 color: '#fff',
        //                                 paddingHorizontal: 10,
        //                                 paddingVertical: 8,
        //                                 borderRadius: 8,
        //                                 width: 100,
        //                                 textAlign: 'center',
        //                                 backgroundColor: '#ff5b00',
        //                             }}>
        //                             Xóa
        //                         </Text>
        //                     </TouchableWithoutFeedback>
        //                 </View>
        //             </View>
        //         </View>
        //     </Modal>
        // </>

        // <View style={{ backgroundColor: '#fff', flex: 1 }}>
        //     <Text
        //         style={{
        //             fontSize: 24,
        //             fontWeight: '600',
        //             color: '#000',
        //             paddingHorizontal: 12,
        //             paddingTop: 32,
        //         }}>
        //         Yêu thích
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
        //                         style={{
        //                             height: 90,
        //                             width:90,
        //                             marginBottom: 32
        //                         }}
        //                         source={{
        //                             uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
        //                             priority: FastImage.priority.high,
        //                         }}
        //                         resizeMode={FastImage.resizeMode.cover}
        //                     />
        //         <Text style={{ textAlign: 'center' }}>
        //             Hãy đăng nhập để xem danh sách yêu thích của mình
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

        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#000',
                    paddingHorizontal: 12,
                    paddingTop: 32,
                }}
            >
                Yêu thích
            </Text>
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    paddingHorizontal: 24,
                }}
            >
                <FastImage
                    style={{
                        height: 90,
                        width: 90,
                        marginBottom: 32,
                    }}
                    source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#000',
                        fontSize: 16,
                    }}
                >
                    Chưa có hoạt động nào ở đây
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 12 }}>
                    Có hoạt động bạn muốn lưu để xem sau? Hãy nhấn vào biểu tượng trái tim và hoạt động này sẽ được lưu tại đây.
                </Text>
                <TouchableWithoutFeedback>
                    <Text
                        style={{
                            color: '#fff',
                            backgroundColor: '#ff5c19',
                            fontWeight: '600',
                            paddingVertical: 8,
                            paddingHorizontal: 14,
                            borderRadius: 8,
                            marginTop: 16,
                        }}
                    >
                        Khám phá
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

export default Like_page;
