import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Package = ({
    package_services,
    activeIndex,
    formatNumberWithCommas,
    minPrice,
    setActiveIndex,
    setPackage_service,
    setQuantity,
    setCounts,
    setCountsInit,
    setPrice,
}) => {
    //chọn gói dịch vụ
    function handleSelectServicePackage(index, id) {
        // Set active , Nếu active bằng -1 thì không thể hiện modal thanh toán
        setActiveIndex(index);
        // Set số lượng
        const temp = package_services.find((package_service) => package_service.id === id);
        setPackage_service(temp);
        setQuantity(temp.quantitys);
        // Set mảng Chứa số 0 , số lượng tùy thuộc vào độ dài của quantity
        let arr = Array(temp.quantitys.length).fill(0);
        let position = temp.quantitys.findIndex((ele) => ele.price === minPrice(temp.quantitys));
        arr[position] = 1;
        setCounts(arr);
        setCountsInit(arr);
        // Set giá tiền
        setPrice(minPrice(temp.quantitys));
    }
    return (
        <>
            {package_services === undefined && (
                <SkeletonPlaceholder>
                    <View
                        style={{
                            marginTop: 24,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: 120,
                            height: 18,
                            borderRadius: 12,
                        }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <View style={{ width: 240, height: 100, marginRight: 10, borderRadius: 12 }} />
                        <View style={{ width: 240, height: 100, marginRight: 10, borderRadius: 12 }} />
                    </View>
                </SkeletonPlaceholder>
            )}
            {package_services === undefined || (
                <View style={{ marginTop: 24 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    backgroundColor: '#FF5B00',
                                    width: 7,
                                    borderRadius: 12,
                                    height: 24,
                                    marginRight: 10,
                                }}
                            />
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 18,
                                    fontWeight: '700',
                                }}
                            >
                                Các gói dịch vụ
                            </Text>
                        </View>
                        <Text
                            onPress={() => {
                                setActiveIndex(-1), setPrice(undefined);
                            }}
                            style={{ textDecorationLine: 'underline', color: '#ccc' }}
                        >
                            Xóa
                        </Text>
                    </View>
                    <ScrollView horizontal style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
                        {package_services !== undefined &&
                            package_services.map((text, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.item, index === activeIndex && styles.activeItem]}
                                    onPress={() => handleSelectServicePackage(index, text.id)}
                                >
                                    <Text style={styles.itemText}>{text.name}</Text>

                                    <Text style={styles.priceText}>{formatNumberWithCommas(minPrice(text.quantitys))}</Text>
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        overflow: 'scroll',
        marginTop: 12,
    },
    item: {
        width: 250,
        minHeight: 100,
        paddingHorizontal: 12,
        marginRight: 12,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 16,
        backgroundColor: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        justifyContent: 'space-between',
    },
    activeItem: {
        borderColor: '#FF5B00',
        backgroundColor: '#FCF6F2',
    },
    itemText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
        color: '#000',
    },
});

export default memo(Package);
