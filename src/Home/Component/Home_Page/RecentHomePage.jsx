import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RecentHomePage = ({ handlePressProduct, navigation }, ref) => {
    const [listProduct, setListProduct] = useState([]);

    // Xác định các phương thức cần thiết cho ref
    useImperativeHandle(ref, () => ({
        setListProduct(param) {
            setListProduct(param);
        },
    }));

    const SkeletonItem = () => {
        return (
            <View style={{ marginTop: 40, paddingLeft: 16 }}>
                <SkeletonPlaceholder>
                    <View>
                        <View style={{ paddingRight: 16 }}>
                            <Text
                                style={{
                                    fontSize: moderateScale(17),
                                    fontWeight: '700',
                                    color: '#000',
                                }}
                            >
                                Tiếp tục lên lịch
                            </Text>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: scale(12), width: '25%' }}>
                                    {/* Placeholder cho hình ảnh */}
                                    <SkeletonPlaceholder.Item height={verticalScale(50)} width={scale(75)} borderRadius={6} />
                                    {/* Placeholder cho tên sản phẩm */}
                                    <SkeletonPlaceholder.Item marginTop={8} width={scale(75)} height={moderateScale(14)} borderRadius={4} />
                                </View>
                                <View style={{ marginRight: scale(12), width: '25%' }}>
                                    {/* Placeholder cho hình ảnh */}
                                    <SkeletonPlaceholder.Item height={verticalScale(50)} width={scale(75)} borderRadius={6} />
                                    {/* Placeholder cho tên sản phẩm */}
                                    <SkeletonPlaceholder.Item marginTop={8} width={scale(75)} height={moderateScale(14)} borderRadius={4} />
                                </View>
                                <View style={{ marginRight: scale(12), width: '25%' }}>
                                    {/* Placeholder cho hình ảnh */}
                                    <SkeletonPlaceholder.Item height={verticalScale(50)} width={scale(75)} borderRadius={6} />
                                    {/* Placeholder cho tên sản phẩm */}
                                    <SkeletonPlaceholder.Item marginTop={8} width={scale(75)} height={moderateScale(14)} borderRadius={4} />
                                </View>
                                <View style={{ marginRight: scale(12), width: '25%' }}>
                                    {/* Placeholder cho hình ảnh */}
                                    <SkeletonPlaceholder.Item height={verticalScale(50)} width={scale(75)} borderRadius={6} />
                                    {/* Placeholder cho tên sản phẩm */}
                                    <SkeletonPlaceholder.Item marginTop={8} width={scale(75)} height={moderateScale(14)} borderRadius={4} />
                                </View>
                            </View>
                        </View>
                    </View>
                </SkeletonPlaceholder>
            </View>
        );
    };

    // Các element sản phẩm FlaList
    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() => handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
        >
            <View style={{ marginRight: 12 }}>
                <FastImage
                    style={{
                        height: verticalScale(50),
                        width: scale(75),
                        borderRadius: 6,
                    }}
                    source={{ uri: item.image, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text
                    numberOfLines={2}
                    style={{
                        color: '#000',
                        marginTop: 8,
                        maxWidth: scale(75),
                        fontWeight: '700',
                        fontSize: moderateScale(14),
                    }}
                >
                    {item.name}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );

    // Set lại danh sách sản phẩm trong AsyncStorage khi focus lại trang
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // Code bạn muốn thực thi khi màn hình được focus
            // Lấy tất cả product lưu trong AsyncStorage
            if (await AsyncStorage.getItem('product')) {
                setListProduct(JSON.parse(await AsyncStorage.getItem('product')));
            }
            // Set giá trị sản phẩm giỏ hàng chưa xem
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <>
            {listProduct.length === 0 && SkeletonItem()}
            {listProduct.length !== 0 && (
                <View style={{ marginTop: 40, paddingLeft: 16 }}>
                    <Text
                        onPress={() => navigation.navigate('Recent_View')}
                        style={{
                            fontSize: moderateScale(17),
                            fontWeight: '700',
                            color: '#000',
                        }}
                    >
                        Xem gần đây
                        <IconEntypo name="chevron-thin-right" size={moderateScale(16)} color="#000" />
                    </Text>
                    {/* Danh sách sản phẩm */}
                    <FlatList
                        style={{ marginTop: moderateScale(12) }}
                        data={listProduct}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={4}
                        maxToRenderPerBatch={1}
                        windowSize={5}
                        removeClippedSubviews={true}
                        horizontal
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
        </>
    );
};

export default memo(forwardRef(RecentHomePage));
