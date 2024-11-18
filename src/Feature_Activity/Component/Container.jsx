import { View, Text, Image } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Container = () => {
    return (
        <View
            style={{
                paddingHorizontal: scale(12),
                zIndex: 10,
                borderRadius: moderateScale(12),
                backgroundColor: '#fff',
                marginTop: verticalScale(-12),
            }}
        >
            {/* First item */}
            <View style={{ marginTop: verticalScale(12), position: 'relative' }}>
                <FastImage
                    style={{
                        height: verticalScale(160),
                        borderRadius: moderateScale(12),
                    }}
                    source={{
                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={{ marginTop: verticalScale(6) }}>
                    Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    Buffet Hải Sản La Vela Saigon
                </Text>
                <Text style={{ marginTop: verticalScale(6) }}>
                    <IconAntDesign name="star" color="#fe9428" />{' '}
                    <Text
                        style={{
                            color: '#fe9428',
                            fontWeight: '600',
                        }}
                    >
                        4.5
                    </Text>
                    (152)
                    <IconEntypo name="dot-single" />
                    2K+ Đã được đặt
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    đ 351,540
                </Text>
                <IconAntDesign
                    name="hearto"
                    size={moderateScale(25)}
                    color="#fff"
                    style={{ position: 'absolute', right: scale(12), top: verticalScale(20) }}
                />
            </View>

            {/* Second item */}
            <View style={{ marginTop: verticalScale(12), position: 'relative' }}>
                <FastImage
                    style={{
                        height: verticalScale(160),
                        borderRadius: moderateScale(12),
                    }}
                    source={{
                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={{ marginTop: verticalScale(6) }}>
                    Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    Buffet Hải Sản La Vela Saigon
                </Text>
                <Text style={{ marginTop: verticalScale(6) }}>
                    <IconAntDesign name="star" color="#fe9428" />{' '}
                    <Text
                        style={{
                            color: '#fe9428',
                            fontWeight: '600',
                        }}
                    >
                        4.5
                    </Text>
                    (152)
                    <IconEntypo name="dot-single" />
                    2K+ Đã được đặt
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    đ 351,540
                </Text>
                <IconAntDesign
                    name="hearto"
                    size={moderateScale(25)}
                    color="#fff"
                    style={{ position: 'absolute', right: scale(12), top: verticalScale(20) }}
                />
            </View>

            {/* Third item */}
            <View style={{ marginTop: verticalScale(12), position: 'relative' }}>
                <FastImage
                    style={{
                        height: verticalScale(160),
                        borderRadius: moderateScale(12),
                    }}
                    source={{
                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={{ marginTop: verticalScale(6) }}>
                    Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    Buffet Hải Sản La Vela Saigon
                </Text>
                <Text style={{ marginTop: verticalScale(6) }}>
                    <IconAntDesign name="star" color="#fe9428" />{' '}
                    <Text
                        style={{
                            color: '#fe9428',
                            fontWeight: '600',
                        }}
                    >
                        4.5
                    </Text>
                    (152)
                    <IconEntypo name="dot-single" />
                    2K+ Đã được đặt
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    đ 351,540
                </Text>
                <IconAntDesign
                    name="hearto"
                    size={moderateScale(25)}
                    color="#fff"
                    style={{ position: 'absolute', right: scale(12), top: verticalScale(20) }}
                />
            </View>

            {/* Fourth item */}
            <View style={{ marginTop: verticalScale(12), position: 'relative' }}>
                <FastImage
                    style={{
                        height: verticalScale(160),
                        borderRadius: moderateScale(12),
                    }}
                    source={{
                        uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={{ marginTop: verticalScale(6) }}>
                    Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    Buffet Hải Sản La Vela Saigon
                </Text>
                <Text style={{ marginTop: verticalScale(6) }}>
                    <IconAntDesign name="star" color="#fe9428" />{' '}
                    <Text
                        style={{
                            color: '#fe9428',
                            fontWeight: '600',
                        }}
                    >
                        4.5
                    </Text>
                    (152)
                    <IconEntypo name="dot-single" />
                    2K+ Đã được đặt
                </Text>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '700',
                        color: '#000',
                        marginTop: verticalScale(6),
                    }}
                >
                    đ 351,540
                </Text>
                <IconAntDesign
                    name="hearto"
                    size={moderateScale(25)}
                    color="#fff"
                    style={{ position: 'absolute', right: scale(12), top: verticalScale(20) }}
                />
            </View>
        </View>
    );
};

export default Container;
