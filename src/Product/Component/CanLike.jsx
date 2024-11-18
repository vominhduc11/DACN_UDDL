import { View, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

import { API_URL } from '@env';

const CanLike = ({ formatNumberWithCommas, minPricePackage, handlePressProduct, category, cityId }) => {
    const [listProduct, setListProduct] = useState([]);

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() => handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
        >
            <View style={{ marginRight: 12 }}>
                <FastImage
                    style={{
                        height: 100,
                        width: 130,
                        borderRadius: 12,
                    }}
                    source={{ uri: item.image, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text
                    numberOfLines={2}
                    style={{
                        color: '#000',
                        marginTop: 8,
                        maxWidth: 130,
                        fontWeight: '700',
                    }}
                >
                    {item.name}
                </Text>
                <Text style={{ marginTop: 0, color: '#000' }}>
                    <IconAntDesign name="star" color="#fe9428" />{' '}
                    <Text
                        style={{
                            color: '#fe9428',
                            fontWeight: '600',
                        }}
                    >
                        {item.star}
                    </Text>{' '}
                    ({item.booked})
                </Text>
                <Text
                    style={{
                        marginTop: 6,
                        flexDirection: 'row',
                    }}
                >
                    {item.package.length === 0 && <Text style={{ color: '#ccc', fontWeight: '700' }}>Đã hết hàng</Text>}
                    {item.package.length > 1 && (
                        <>
                            <Text style={{ fontWeight: '700', color: '#000', marginRight: 2 }}>Từ </Text>
                            <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                        </>
                    )}
                    {item.package.length === 1 && item.package[0].quantitys.length > 1 && (
                        <>
                            <Text
                                style={{
                                    fontWeight: '700',
                                    color: '#000',
                                    marginRight: 2,
                                }}
                            >
                                Từ{' '}
                            </Text>
                            <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                        </>
                    )}
                    {item.package.length === 1 && item.package[0].quantitys.length === 1 && (
                        <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                    )}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${API_URL}/api/getListProduct/${category}/${cityId}`);
            setListProduct(res.data);
        }
        fetchData();
    }, []);
    return (
        <View style={{ marginTop: 18, marginRight: -12 }}>
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
                    Có thể bạn sẽ thích
                </Text>
            </View>

            {/* Danh sách sản phẩm */}
            <FlatList
                style={{ marginTop: 12 }}
                data={listProduct}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                horizontal
                scrollEventThrottle={16}
            />
        </View>
    );
};

export default memo(CanLike);
