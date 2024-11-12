import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecentHomePage = ({ handlePressProduct, navigation }, ref) => {
    const [listProduct2, setListProduct2] = useState([]);

    // Xác định các phương thức cần thiết cho ref
    useImperativeHandle(ref, () => ({
        setListProduct2(param) {
            setListProduct2(param);
        },
    }));

    // Set lại danh sách sản phẩm trong AsyncStorage khi focus lại trang
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // Code bạn muốn thực thi khi màn hình được focus
            // Lấy tất cả product lưu trong AsyncStorage
            if (await AsyncStorage.getItem('product')) {
                setListProduct2(JSON.parse(await AsyncStorage.getItem('product')));
            }
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <>
            {listProduct2.length !== 0 && (
                <View style={{ marginTop: 40, paddingLeft: 16 }}>
                    <Text
                        onPress={() => navigation.navigate('Recent_View')}
                        style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000',
                        }}
                    >
                        Xem gần đây
                        <IconEntypo name="chevron-thin-right" size={16} color="#000" />
                    </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* element */}
                            {listProduct2.map((product) => (
                                <TouchableWithoutFeedback
                                    key={product.id}
                                    onPress={() => handlePressProduct(product.id, product.image, product.name, product.category, product.cityId)}
                                >
                                    <View style={{ marginRight: 12 }}>
                                        <FastImage
                                            style={{
                                                height: 50,
                                                width: 75,
                                                borderRadius: 6,
                                            }}
                                            source={{ uri: product.image, priority: FastImage.priority.high }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                color: '#000',
                                                marginTop: 8,
                                                maxWidth: 75,
                                                fontWeight: '700',
                                            }}
                                        >
                                            {product.name}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            )}
        </>
    );
};

export default memo(forwardRef(RecentHomePage));
