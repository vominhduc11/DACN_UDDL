import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { memo, useRef } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalAddCart = ({
    modalVisible2,
    package_service,
    quantity,
    counts,
    setModalVisible2,
    setCounts,
    formatNumberWithCommas,
    countsInit,
    getCoordinatesBtnAddCart,
    getCoordinatesBtnCart,
    navigation,
}) => {
    // Xử lý khi đóng modal
    const handleCloseModal = () => {
        setModalVisible2(false);
        setCounts(countsInit);
    };
    // Thay đổi số lượng
    const handleChange = (index, newCount) => {
        const updatedCounts = [...counts];
        updatedCounts[index] = newCount;
        setCounts(updatedCounts);
    };

    // Xử lý thêm sản phẩm vào giỏ hàng
    const handleAddCart = async () => {
        console.log(await getCoordinatesBtnAddCart());
        console.log(await getCoordinatesBtnCart());
        // btnAddCartRef.current.measure((fx, fy, width, height, px, py) => {
        //     console.log('X:', px, 'Y:', py, 'Width:', width, 'Height:', height);
        // });
        setModalVisible2(false);
    };

    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none'
            transparent={true}
            visible={modalVisible2}
        >
            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    flex: 1,
                    position: 'relative',
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: '#fff',
                        width: '100%',
                        borderTopRightRadius: 12,
                        borderTopLeftRadius: 12,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#000',
                            fontSize: 16,
                            paddingVertical: 12,
                            borderBottomWidth: 0.5,
                        }}
                    >
                        Tùy chọn đơn hàng
                    </Text>
                    <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: '700',
                                fontSize: 18,
                            }}
                        >
                            {package_service.name}
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#dedede',
                                paddingHorizontal: 12,
                                borderRadius: 12,
                                marginTop: 12,
                            }}
                        >
                            {quantity.map((ele, index) => (
                                <View
                                    key={ele.id}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingVertical: 12,
                                    }}
                                >
                                    <Text style={{ maxWidth: 100, fontSize: 12, color: '#000' }}>{ele.age}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: '#000' }}>{formatNumberWithCommas(ele.price)}</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginLeft: 8,
                                            }}
                                        >
                                            {/* Nút trừ */}
                                            <TouchableOpacity onPress={() => handleChange(index, Math.max(countsInit[index], counts[index] - 1))}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#f5f5f5',
                                                        paddingHorizontal: 12,
                                                        paddingVertical: 10,
                                                        borderRadius: 8,
                                                    }}
                                                >
                                                    <Icon name="minus" size={12} color="#b4b4b4" />
                                                </View>
                                            </TouchableOpacity>

                                            {/* Hiển thị số ở giữa */}
                                            <Text style={{ marginHorizontal: 8, color: '#ccc' }}>{counts[index]}</Text>

                                            {/* Nút cộng */}
                                            <TouchableOpacity onPress={() => handleChange(index, counts[index] + 1)}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#f5f5f5',
                                                        paddingHorizontal: 12,
                                                        paddingVertical: 10,
                                                        borderRadius: 8,
                                                    }}
                                                >
                                                    <Icon name="plus" size={12} color="#b4b4b4" />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 12,
                            marginTop: 12,
                            borderTopWidth: 1,
                            borderTopColor: '#dedede',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '600',
                                color: '#000',
                                fontSize: 18,
                                marginVertical: 10,
                            }}
                        >
                            <Text style={{ textDecorationLine: 'underline' }}>đ</Text>{' '}
                            {formatNumberWithCommas(
                                counts.reduce((accumulator, currentValue, index) => {
                                    return accumulator + currentValue * quantity[index].price;
                                }, 0)
                            )}
                        </Text>
                        <TouchableOpacity onPress={handleAddCart} activeOpacity={0.6} style={{ marginBottom: 12 }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: '#FFCC00',
                                    color: '#fff',
                                    paddingVertical: 12,
                                    borderRadius: 12,
                                    fontWeight: '600',
                                }}
                            >
                                Thêm vào giỏ hàng
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <IconAntDesign
                        onPress={handleCloseModal}
                        name="close"
                        size={20}
                        color="#000"
                        style={{ position: 'absolute', top: 12, left: 12 }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ModalAddCart;
