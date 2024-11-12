import { View, Text, Modal } from 'react-native';
import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';

const ModalCategory = ({ modalVisible2, active, setModalVisible2, setNameCategory, setActive }) => {
    const handlePressCategory = (param1, param2) => {
        setNameCategory(param2);
        setActive(param1);
    };
    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none', 'slide'
            transparent={true} // modal trong suốt hay không
            visible={modalVisible2} // điều kiện để hiện modal
        >
            <View
                style={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 400,
                    borderTopLeftRadius: 12,
                    borderTopEndRadius: 12,
                }}
            >
                <IconAntDesign
                    style={{
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        zIndex: 1,
                    }}
                    name="close"
                    size={22}
                    onPress={() => setModalVisible2(false)}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000',
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        paddingVertical: 14,
                    }}
                >
                    Chọn danh mục
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 12,
                    }}
                >
                    <Text
                        onPress={() => handlePressCategory(1, 'Tour')}
                        style={{
                            color: active === 1 ? '#33FF00' : '#000',
                            borderWidth: 1,
                            borderColor: active === 1 ? '#33FF00' : '#000',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 18,
                            marginRight: 12,
                            marginTop: 12,
                        }}
                    >
                        Tour
                    </Text>
                    <Text
                        onPress={() => handlePressCategory(2, 'Du thuyền')}
                        style={{
                            color: active === 2 ? '#33FF00' : '#000',
                            borderWidth: 1,
                            borderColor: active === 2 ? '#33FF00' : '#000',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 18,
                            marginRight: 12,
                            marginTop: 12,
                        }}
                    >
                        Du thuyền
                    </Text>
                    <Text
                        onPress={() => handlePressCategory(3, 'Massage & Suối nước nóng')}
                        style={{
                            color: active === 3 ? '#33FF00' : '#000',
                            borderWidth: 1,
                            borderColor: active === 3 ? '#33FF00' : '#000',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 18,
                            marginRight: 12,
                            marginTop: 12,
                        }}
                    >
                        Massage & Suối nước nóng
                    </Text>
                    <Text
                        onPress={() => handlePressCategory(4, 'Phiêu lưu & Khám phá thiên nhiên')}
                        style={{
                            color: active === 4 ? '#33FF00' : '#000',
                            borderWidth: 1,
                            borderColor: active === 4 ? '#33FF00' : '#000',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 18,
                            marginRight: 12,
                            marginTop: 12,
                        }}
                    >
                        Phiêu lưu & Khám phá thiên nhiên
                    </Text>
                    <Text
                        onPress={() => handlePressCategory(5, 'Khách sạn')}
                        style={{
                            color: active === 5 ? '#33FF00' : '#000',
                            borderWidth: 1,
                            borderColor: active === 5 ? '#33FF00' : '#000',
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 18,
                            marginRight: 12,
                            marginTop: 12,
                        }}
                    >
                        Khách sạn
                    </Text>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        bottom: 0,
                        width: '100%',
                        paddingHorizontal: 12,
                        paddingVertical: 15,
                        borderTopWidth: 1,
                        borderTopColor: '#ccc',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        onPress={() => {
                            setActive(undefined);
                            setNameCategory(undefined);
                        }}
                        style={{
                            textDecorationLine: 'underline',
                        }}
                    >
                        Xóa
                    </Text>
                    <Text
                        onPress={() => setModalVisible2(false)}
                        style={{
                            backgroundColor: '#ff5b00',
                            color: '#fff',
                            fontWeight: '500',
                            paddingHorizontal: 18,
                            paddingVertical: 8,
                            borderRadius: 8,
                        }}
                    >
                        Chọn
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default ModalCategory;
