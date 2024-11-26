import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const RecentHomePage = ({ handlePressProduct, navigation }, ref) => {
    const [listProduct, setListProduct] = useState([]);

    // Xác định các phương thức cần thiết cho ref
    useImperativeHandle(ref, () => ({
        setListProduct(param) {
            setListProduct(param);
        },
    }));

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
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={5}
                removeClippedSubviews={true}
                horizontal
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default memo(forwardRef(RecentHomePage));
