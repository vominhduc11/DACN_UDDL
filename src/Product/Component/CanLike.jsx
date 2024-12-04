import { View, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { Fragment, memo, useEffect, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

import Config from '../../.env/Config';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

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
                            Tiếp tục lên lịch {city_name}
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
            const res = await axios.get(`${Config.API_URL}/api/getListProduct/${category}/${cityId}`);
            setListProduct(res.data);
        }
        fetchData();
    }, []);
    return (
        <Fragment>
            {listProduct === 0 && SkeletonItem()}
            {listProduct !== 0 && (
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
            )}
        </Fragment>
    );
};

export default memo(CanLike);
