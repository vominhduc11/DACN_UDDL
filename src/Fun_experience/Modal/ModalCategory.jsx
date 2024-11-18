import { View, Text, Modal } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const ModalCategory = ({ setNameCategory }, ref) => {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(undefined);
    const [name, setName] = useState('');

    // Cung cấp hàm openModal cho component cha
    useImperativeHandle(ref, () => ({
        openModal() {
            setVisible(true);
        },
        closeModal() {
            setVisible(false);
        },
    }));

    // Sử lý khi nhấn vào tên thể loại trong modal
    const handlePressCategory = (id, name) => {
        setName(name);
        setActive(id);
    };
    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none', 'slide'
            transparent={true} // modal trong suốt
            visible={visible} // điều kiện để hiện modal
        >
            <View
                style={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: verticalScale(400), // Responsive chiều cao modal
                    borderTopLeftRadius: moderateScale(12),
                    borderTopEndRadius: moderateScale(12),
                }}
            >
                {/* Icon đóng modal */}
                <IconAntDesign
                    style={{
                        position: 'absolute',
                        top: verticalScale(15), // Responsive top
                        left: scale(15), // Responsive left
                        zIndex: 1,
                    }}
                    name="close"
                    color="#000"
                    size={moderateScale(22)} // Responsive icon size
                    onPress={() => setVisible(false)}
                />

                {/* Tiêu đề */}
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: moderateScale(16), // Responsive font size
                        fontWeight: '600',
                        color: '#000',
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        paddingVertical: verticalScale(14), // Responsive padding
                    }}
                >
                    Chọn danh mục
                </Text>

                {/* Các lựa chọn danh mục */}
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: scale(12), // Responsive padding
                    }}
                >
                    {[
                        { id: 1, name: 'Tour' },
                        { id: 2, name: 'Du thuyền' },
                        { id: 3, name: 'Massage & Suối nước nóng' },
                        { id: 4, name: 'Phiêu lưu & Khám phá thiên nhiên' },
                    ].map((category) => (
                        <Text
                            key={category.id}
                            onPress={() => handlePressCategory(category.id, category.name)}
                            style={{
                                color: active === category.id ? '#33FF00' : '#000',
                                borderWidth: 1,
                                borderColor: active === category.id ? '#33FF00' : '#000',
                                paddingVertical: verticalScale(8), // Responsive padding
                                paddingHorizontal: scale(16), // Responsive padding
                                borderRadius: moderateScale(18), // Responsive border radius
                                marginRight: scale(12), // Responsive margin
                                marginTop: verticalScale(12), // Responsive margin
                            }}
                        >
                            {category.name}
                        </Text>
                    ))}
                </View>

                {/* Footer */}
                <View
                    style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        bottom: 0,
                        width: '100%',
                        paddingHorizontal: scale(12), // Responsive padding
                        paddingVertical: verticalScale(15), // Responsive padding
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
                            color: '#000',
                        }}
                    >
                        Xóa
                    </Text>
                    <Text
                        onPress={() => {
                            setVisible(false);
                            setNameCategory(name);
                        }}
                        style={{
                            backgroundColor: '#ff5b00',
                            color: '#fff',
                            fontWeight: '500',
                            paddingHorizontal: scale(18), // Responsive padding
                            paddingVertical: verticalScale(8), // Responsive padding
                            borderRadius: moderateScale(8), // Responsive border radius
                        }}
                    >
                        Chọn
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default forwardRef(ModalCategory);
