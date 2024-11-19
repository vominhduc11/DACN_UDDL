import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import FastImage from 'react-native-fast-image';
import axios from 'axios';

import Config from '../../.env/Config';

const Destination = ({ handlePressProduct, cityId }) => {
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
                <Text
                    style={{
                        fontSize: 11,
                        marginTop: 0,
                        color: '#ccc',
                    }}
                >
                    {item.city}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${Config.API_URL}/api/getProductOfCity/${cityId}/10`);
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
                    Điểm đến theo xu hướng
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

export default memo(Destination);
