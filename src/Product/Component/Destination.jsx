import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { Fragment, memo, useEffect, useState } from 'react';

import FastImage from 'react-native-fast-image';
import axios from 'axios';

import Config from '../../.env/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

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
    // Hàm loading skeleton
    const SkeletonItem = () => {
        return (
            <View style={{ marginTop: 18, paddingLeft: 16 }}>
                <SkeletonPlaceholder>
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
                </SkeletonPlaceholder>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <View>
                        <SkeletonPlaceholder>
                            <View
                                style={{
                                    marginRight: scale(12),
                                }}
                            >
                                {/* Placeholder cho hình ảnh */}
                                <SkeletonPlaceholder.Item height={verticalScale(100)} width={scale(140)} borderRadius={12} />

                                {/* Placeholder cho tiêu đề sản phẩm */}
                                <SkeletonPlaceholder.Item
                                    marginTop={moderateScale(8)}
                                    width={scale(120)}
                                    height={moderateScale(14)}
                                    borderRadius={4}
                                />

                                {/* Placeholder cho giá sản phẩm */}
                                <View
                                    style={{
                                        marginTop: moderateScale(12),
                                        flexDirection: 'row',
                                    }}
                                >
                                    <SkeletonPlaceholder.Item width={scale(60)} height={moderateScale(14)} borderRadius={4} />
                                    <SkeletonPlaceholder.Item
                                        width={scale(40)}
                                        height={moderateScale(14)}
                                        borderRadius={4}
                                        marginLeft={moderateScale(8)}
                                    />
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    </View>

                    <View>
                        <SkeletonPlaceholder>
                            <View
                                style={{
                                    marginRight: scale(12),
                                }}
                            >
                                {/* Placeholder cho hình ảnh */}
                                <SkeletonPlaceholder.Item height={verticalScale(100)} width={scale(140)} borderRadius={12} />

                                {/* Placeholder cho tiêu đề sản phẩm */}
                                <SkeletonPlaceholder.Item
                                    marginTop={moderateScale(8)}
                                    width={scale(120)}
                                    height={moderateScale(14)}
                                    borderRadius={4}
                                />

                                {/* Placeholder cho giá sản phẩm */}
                                <View
                                    style={{
                                        marginTop: moderateScale(12),
                                        flexDirection: 'row',
                                    }}
                                >
                                    <SkeletonPlaceholder.Item width={scale(60)} height={moderateScale(14)} borderRadius={4} />
                                    <SkeletonPlaceholder.Item
                                        width={scale(40)}
                                        height={moderateScale(14)}
                                        borderRadius={4}
                                        marginLeft={moderateScale(8)}
                                    />
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    </View>

                    <View>
                        <SkeletonPlaceholder>
                            <View
                                style={{
                                    marginRight: scale(12),
                                }}
                            >
                                {/* Placeholder cho hình ảnh */}
                                <SkeletonPlaceholder.Item height={verticalScale(100)} width={scale(140)} borderRadius={12} />

                                {/* Placeholder cho tiêu đề sản phẩm */}
                                <SkeletonPlaceholder.Item
                                    marginTop={moderateScale(8)}
                                    width={scale(120)}
                                    height={moderateScale(14)}
                                    borderRadius={4}
                                />

                                {/* Placeholder cho giá sản phẩm */}
                                <View
                                    style={{
                                        marginTop: moderateScale(12),
                                        flexDirection: 'row',
                                    }}
                                >
                                    <SkeletonPlaceholder.Item width={scale(60)} height={moderateScale(14)} borderRadius={4} />
                                    <SkeletonPlaceholder.Item
                                        width={scale(40)}
                                        height={moderateScale(14)}
                                        borderRadius={4}
                                        marginLeft={moderateScale(8)}
                                    />
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    </View>
                </View>
            </View>
        );
    };
    useEffect(() => {
        async function fetchData() {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            const res = await axios.get(`${Config.API_URL}/api/getProductOfCity/${cityId}/10/${idUser}`);
            setListProduct(res.data);
        }
        fetchData();
    }, []);
    return (
        <Fragment>
            {listProduct.length === 0 && SkeletonItem()}
            {listProduct.length !== 0 && (
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
            )}
        </Fragment>
    );
};

export default memo(Destination);
